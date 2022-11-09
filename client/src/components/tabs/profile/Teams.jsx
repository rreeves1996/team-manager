import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../Profile';
import { FaGlobeAmericas } from 'react-icons/fa';
import TeamCard from '../../cards/TeamCard';

export default function Teams() {
	const [loading, setLoading] = useState(true);
	const teams = [];
	const userData = useContext(UserContext);

	useEffect(() => {
		Promise.all(
			userData.teams.map((team) =>
				axios
					.get(`/api/teams/${team.id}`)
					.then((res) => {
						teams.push(res.data);
						console.log(teams);
					})
					.catch((err) => console.log(`GET failed: ${err}`))
			)
		).then((data) => {
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
							{teams.map((team) => (
								<>
									<h1>heelods</h1>
								</>
							))}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
