import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Profile';
import { FaUser } from 'react-icons/fa';

export default function Info() {
	const [loading, setLoading] = useState(true);
	const userData = useContext(UserContext);
	const allowedTeams = 5;

	return (
		<>
			<div className='profile-info'>
				<h2>
					<FaUser className='user-icon card-icon' /> Your Account
				</h2>

				<div className='card-body account-info'>
					<div className='col'>
						<p>
							<strong>Username:</strong> {userData.username}
						</p>

						<p>
							<strong>Name:</strong> {userData.name}
						</p>

						<p>
							<strong>Email:</strong> {userData.email}
						</p>

						<p>
							<strong>Total Teams:</strong> {userData.teams.length}
						</p>
					</div>
					<div className='account-picture'>
						{userData.picture ? (
							<img src={userData.picture} alt='profile' />
						) : (
							<FaUser className='account-picture-icon' />
						)}
					</div>
				</div>
				<div className='divider'></div>

				<p className='allowed-teams'>
					You can currently create up to{' '}
					<strong>{allowedTeams - userData.teams.length}</strong> more teams.
					(Limit: 5)
				</p>
			</div>
		</>
	);
}
