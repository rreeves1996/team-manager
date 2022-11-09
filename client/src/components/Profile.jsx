import React, { useState, useEffect, createContext } from 'react';
import { useAppContext } from '../utils/GlobalState';
import axios from 'axios';
import Auth from '../utils/auth';
import General from './tabs/PGeneral';
import Settings from './tabs/PSettings';

export const UserContext = createContext();

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('General');
	const [userData, setUserData] = useState({});
	const [state, dispatch] = useAppContext();

	const renderTab = () => {
		if (currentTab === 'General') {
			return <General />;
		} else if (currentTab === 'Settings') {
			return <Settings />;
		}
	};

	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchData = async () => {
			const user = Auth.getProfile();

			await axios
				.get(`/api/users/${user.data.id}`)
				.then((res) => {
					setUserData(res.data);
				})
				.catch((err) => console.log(`Failed to login: ${err}`));

			setLoading(!loading);
		};

		fetchData();
	}, []);

	return (
		<>
			{loading ? (
				<>
					<h1>Loading...</h1>
				</>
			) : (
				<>
					<header>
						<div className='row'>
							<div className='header-text'>
								<h1>My Profile</h1>
							</div>
						</div>
					</header>
					<div className='tab-container'>
						<button
							className='tab-button'
							onClick={() => {
								handleTabChange('General');
							}}>
							General
						</button>
						<button
							className='tab-button'
							onClick={() => {
								handleTabChange('Settings');
							}}>
							Settings
						</button>
					</div>
					<UserContext.Provider value={userData}>
						<div className='profile-container'>{renderTab()}</div>
					</UserContext.Provider>
				</>
			)}
		</>
	);
}
