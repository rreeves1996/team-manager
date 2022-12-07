import React, { useState, useEffect, createContext } from 'react';
import { useSelector } from 'react-redux';
import GeneralTab from './GeneralTab';
import SettingsTab from './SettingsTab';

const UserContext = createContext();

export default function Profile() {
	const [currentTab, setCurrentTab] = useState('General');
	const userData = useSelector((state) => state.user.data);

	const renderTab = () => {
		if (currentTab === 'General') {
			return <GeneralTab />;
		} else if (currentTab === 'Settings') {
			return <SettingsTab />;
		}
	};
	console.log(userData);
	const handleTabChange = (tab) => setCurrentTab(tab);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const user = Auth.getProfile();

	// 		await axios
	// 			.get(`/api/users/${user.data.id}`)
	// 			.then((res) => {
	// 				setUserData(res.data);
	// 			})
	// 			.catch((err) => console.log(`Failed to login: ${err}`));

	// 		setLoading(!loading);
	// 	};

	// 	fetchData();
	// }, []);

	return (
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
	);
}
