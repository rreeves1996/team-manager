import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import GeneralTab from './GeneralTab';
import SettingsTab from './SettingsTab';
import useQuery from '../../hooks/useQuery';

export default function Profile() {
	const userData = useSelector((state) => state.user.data);
	const { queryUser } = useQuery();
	const [currentTab, setCurrentTab] = useState('General');
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState([]);

	const renderTab = () => {
		if (currentTab === 'General') {
			return <GeneralTab userdata={data[0]} teamdata={data[0].teams} />;
		} else if (currentTab === 'Settings') {
			return <SettingsTab />;
		}
	};
	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchTeamData = () => {
			queryUser(userData.id)
				.then((res) => setData((prevState) => [...prevState, res.data]))
				.finally(() => setLoading(false));
		};

		fetchTeamData();
	}, []);

	if (loading)
		return (
			<>
				<h1>Loading</h1>
			</>
		);
	else
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
				<div className='profile-container'>{renderTab()}</div>
			</>
		);
}
