import React, { useState, useEffect } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import GeneralTab from './GeneralTab';
import SettingsTab from './SettingsTab';
import useQuery from '../../hooks/useQuery';

export default function Profile() {
	const userData = useSelector((state) => state.user.data);
	const { queryUser, queryTeamsByUser } = useQuery();
	const [currentTab, setCurrentTab] = useState('General');
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState({});

	const renderTab = () => {
		if (currentTab === 'General') {
			return <GeneralTab userdata={data.userData} teamdata={data.teamData} />;
		} else if (currentTab === 'Settings') {
			return <SettingsTab />;
		}
	};
	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchTeamData = () => {
			queryUser(userData.id)
				.then((res) =>
					setData((prevState) => ({ ...prevState, userData: res.data }))
				)
				.finally(() =>
					queryTeamsByUser(userData.id)
						.then((res) =>
							setData((prevState) => ({ ...prevState, teamData: res.data }))
						)
						.finally(() => setLoading(false))
				);
		};

		fetchTeamData();
	}, []);

	if (loading) return <></>;
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
						Logout
					</button>
					<div className='help-button'>
						<button
							className='tab-button'
							onClick={() => {
								handleTabChange('Settings');
							}}>
							Help <AiOutlineCaretDown />
						</button>
						<div className='help-container'>
							<button>Submit Ticket</button>
							<button>Delete Account</button>
						</div>
					</div>
				</div>
				<div className='profile-container'>{renderTab()}</div>
			</>
		);
}
