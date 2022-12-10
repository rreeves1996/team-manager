import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeTab from './HomeTab';
import ManageTab from './ManageTab';
import Header from './Header';

export const DataContext = createContext();

export default function Home(props) {
	const navigate = useNavigate();

	const [loading, setLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('Home');
	const [teamData, setTeamData] = useState({});

	const renderTab = () => {
		if (currentTab === 'Home') {
			return <HomeTab />;
		} else if (currentTab === 'Manage') {
			return <ManageTab />;
		}
	};

	// const handleTabChange = (tab) => setCurrentTab(tab);

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
					<DataContext.Provider value={teamData}>
						<Header />
						{/* <div className='tab-container'>
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
						</div> */}
						<div className='home-container'>{renderTab()}</div>
					</DataContext.Provider>
				</>
			)}
		</>
	);
}
