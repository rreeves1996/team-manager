import React, { useState, useEffect } from 'react';
import Teams from './tabs/PTeams';
import Settings from './tabs/PSettings';

export default function Profile() {
	const [loading, setLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('Teams');

	const renderTab = () => {
		if (currentTab === 'Teams') {
			return <Teams />;
		} else if (currentTab === 'Settings') {
			return <Settings />;
		}
	};

	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchData = () => {
			console.log('hello');

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
