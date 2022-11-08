import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAppContext } from '../utils/GlobalState';
import Teams from './tabs/PTeams';
import Settings from './tabs/PSettings';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('Teams');
	const [state, dispatch] = useAppContext();

	const renderTab = () => {
		if (currentTab === 'Teams') {
			return <Teams />;
		} else if (currentTab === 'Settings') {
			return <Settings />;
		}
	};

	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get('/api/users')
				.then((res) => {
					console.log(`Success! Payload: ${JSON.stringify(res)}`);
				})
				.catch((err) => console.log(`Failed to login: ${err}`));

			console.log(state.isLoggedIn);
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
								<h4>
									<i className='fa-solid fa-user'></i>
									Username
								</h4>
							</div>
						</div>
					</header>
					<div className='tab-container'>
						<button
							className='tab-button'
							onClick={() => {
								handleTabChange('Teams');
							}}>
							My Teams
						</button>
						<button
							className='tab-button'
							onClick={() => {
								handleTabChange('Settings');
							}}>
							Settings
						</button>
					</div>
					<div className='profile-container'>{renderTab()}</div>
				</>
			)}
		</>
	);
}
