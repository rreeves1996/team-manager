import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { UserContext } from '../../../../context/UserContext';
import { FaGlobeAmericas } from 'react-icons/fa';
import TeamCard from '../../../../components/cards/TeamCard';

export default function Teams() {
	const [loading, setLoading] = useState(true);
	const [teamData, setTeamData] = useState([]);
	const userData = useContext(UserContext);
	console.log(teamData);
	useEffect(() => {
		const teams = [];

		Promise.all(
			userData.teams.map((team) =>
				axios
					.get(`/api/teams/${team.id}`)
					.then((res) => {
						teams.push(res.data);
					})
					.catch((err) => console.log(`GET failed: ${err}`))
			)
		)
			.then((data) => setTeamData(teams))
			.finally(() => {
				setLoading(!loading);
			});
	}, []);

	return (
		<div className='profile-teams'>
			<h2>
				<FaGlobeAmericas className='globe-icon card-icon' />
				Your Teams
			</h2>
			<div className='card-body'>
				<div className='profile-teams-key'>
					<h6 id='profile-name'>Team Name & Lead</h6>
					<h6 id='profile-managers'>Mngr. #</h6>
					<h6 id='profile-employees'>Emp. #</h6>
					<h6 id='profile-delete'>Delete</h6>
				</div>
				<div className='profile-teams-container'>
					{loading ? (
						<></>
					) : (
						<>
							{teamData.map((team) => (
								<>
									<TeamCard key={uuidv4()} team={team} />
								</>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
