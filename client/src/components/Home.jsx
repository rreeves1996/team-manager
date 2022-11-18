import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import axios from 'axios';
import HomeTab from './tabs/HomeTab';
import ManageTab from './tabs/ManageTab';

export const DataContext = createContext();

export default function Home(props) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [collapsedMenu, toggleCollapseMenu] = useState(true);
	const [currentTab, setCurrentTab] = useState('Home');
	const [teamData, setTeamData] = useState({});

	const renderTab = () => {
		if (currentTab === 'Home') {
			return <HomeTab />;
		} else if (currentTab === 'Manage') {
			return <ManageTab />;
		}
	};

	const deleteTeam = () => {
		localStorage.clear();
		navigate(0);
	};

	const handleTabChange = (tab) => setCurrentTab(tab);

	useEffect(() => {
		const fetchData = async () => {
			const reqTeam = localStorage.getItem('teamID');

			await axios
				.get(`/api/teams/${reqTeam}`)
				.then((res) => {
					// Find team lead and add in isolation to the 'teamData' object for easier access/referencing later
					const lead = res.data.managers.filter((manager) => manager.is_lead);
					const newTeam = { ...res.data, lead: lead[0] };

					setTeamData(newTeam);
				})
				.catch((err) => console.error(`Failed to get teams: ${err}`));
		};

		fetchData().then(() => {
			setLoading(!loading);
		});
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
								<h1>{teamData.name}</h1>
								<h4>
									<FaUser className='manager-icon' /> Manager:{' '}
									<strong>{teamData.lead.name}</strong>
								</h4>
							</div>
							<div
								className={collapsedMenu ? 'menu-button' : 'menu-button open'}>
								<HiPencilSquare
									className='pencil-icon'
									onClick={() => toggleCollapseMenu(!collapsedMenu)}
								/>
								<ul
									className={
										!collapsedMenu ? 'team-menu' : 'team-menu collapse'
									}>
									<li id='edit-name'>Edit team name</li>
									<li id='edit-manager'>Edit manager</li>
									<li onClick={() => deleteTeam()} id='delete-team'>
										Delete team
									</li>
								</ul>
							</div>
						</div>
					</header>
					<DataContext.Provider value={teamData}>
						<div className='tab-container'>
							<button
								className='tab-button'
								onClick={() => {
									handleTabChange('Home');
								}}>
								Home
							</button>
							<button
								className='tab-button'
								onClick={() => {
									handleTabChange('Manage');
								}}>
								Manage
							</button>
						</div>
						<div className='home-container'>{renderTab()}</div>
					</DataContext.Provider>
				</>
			)}
		</>
	);
}
