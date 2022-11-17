import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../Profile';
import { FaUserAlt } from 'react-icons/fa';

export default function Info() {
	const [loading, setLoading] = useState(true);
	const userData = useContext(UserContext);
	const allowedTeams = 5;

	return (
		<>
			<div className='profile-info'>
				<h2>
					<FaUserAlt className='user-icon card-icon' /> Your Account
				</h2>
				<div className='card-body account-info'>
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

					<div className='divider'></div>

					<p>
						You can currently create{' '}
						<strong>{allowedTeams - userData.teams.length}</strong> more teams.
					</p>
				</div>
			</div>
		</>
	);
}
