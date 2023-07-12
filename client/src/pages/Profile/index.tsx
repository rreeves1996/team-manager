import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthService from '../../utils/auth';
import useQuery from '../../hooks/useQuery';
import useAuth from '../../hooks/useAuth';
import { AiOutlineCaretDown } from 'react-icons/ai';
// import GeneralTab from './GeneralTab';
// import SettingsTab from './SettingsTab';
import Teams from './tabs/general/Teams';
import Info from './tabs/general/Info';

interface Data {
	userData?: UserData | null;
	teamData?: Array<TeamData> | null;
}

export default function Profile() {
	const navigate = useNavigate();
	const userData = useSelector((state: any) => state.user.data);
	const { logoutUser } = useAuth();
	const { queryUser, queryTeamsByUser } = useQuery();
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<Data>({ userData: null, teamData: null });

	const handleUserLogout = () => {
		try {
			logoutUser();

			AuthService.logout();
			window.alert('Logout successful!');
		} catch (err) {
			window.alert(`Logout failed! Error: ${err}`);
		}

		navigate(0);
	};

	useEffect(() => {
		const fetchTeamData = () => {
			queryUser(userData.id)
				.then((res) =>
					setData((prevState) => ({ ...prevState, userData: res!.data }))
				)
				.finally(() =>
					queryTeamsByUser(userData.id)
						.then((res) =>
							setData((prevState) => ({ ...prevState, teamData: res!.data }))
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
					<button className='tab-button' onClick={() => handleUserLogout()}>
						Logout
					</button>
					<div className='help-button'>
						<button className='tab-button'>
							Help <AiOutlineCaretDown />
						</button>
						<div className='help-container'>
							<button>Submit Ticket</button>
							<button>Delete Account</button>
						</div>
					</div>
				</div>
				<div className='profile-container'>
					<div className='col-profile-sm'>
						<Info userData={data!.userData} />
					</div>
					<div className='col-profile-lg'>
						<Teams teamData={data!.teamData} />
					</div>
				</div>
			</>
		);
}
