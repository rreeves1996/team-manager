import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import HomeTab from './HomeTab';
import ManageTab from './ManageTab';
import Header from './Header';
import useQuery from '../../hooks/useQuery';

export const DataContext = createContext();

export default function Home(props) {
	const navigate = useNavigate();
	const { queryTeam } = useQuery();
	const [loading, setLoading] = useState(true);
	const [currentTab, setCurrentTab] = useState('Home');
	const [teamData, setTeamData] = useState({});

	const renderTab = () => {
		if (currentTab === 'Home') {
			return <HomeTab handleChangeData={handleChangeData} />;
		} else if (currentTab === 'Manage') {
			return <ManageTab />;
		}
	};

	// const handleTabChange = (tab) => setCurrentTab(tab);
	const handleChangeData = (data) =>
		setTeamData((prevState) => ({ ...prevState, data }));

	useEffect(() => {
		const fetchData = async () => {
			const reqTeam = localStorage.getItem('teamID');

			if (reqTeam) {
				try {
					const res = await queryTeam(reqTeam);
					// Find team lead and add in isolation to the 'teamData' object for easier access/referencing later
					const lead = res.data.managers.filter((manager) => manager.is_lead);
					const newTeam = { ...res.data, lead: lead[0] };
					setTeamData(newTeam);
				} catch (err) {
					window.alert(`Failed to get team! Error: ${err}`);
				} finally {
					setLoading(false);
				}
			} else {
				navigate('/profile');
			}
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
