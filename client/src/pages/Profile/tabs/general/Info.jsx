import React from 'react';
import { FaUser } from 'react-icons/fa';

export default function Info({ userData }) {
	const allowedTeams = 5;

	return (
		<>
			<div className='profile-info'>
				<h2>
					<FaUser className='user-icon card-icon' /> Your Account
				</h2>

				<div className='card-body account-info'>
					{' '}
					<div className='account-picture'>
						{userData.picture ? (
							<img src={userData.picture} alt='profile' />
						) : (
							<FaUser className='account-picture-icon' />
						)}
					</div>
					<div className='col'>
						<div>
							<strong>Username:</strong> <span>{userData.username}</span>
						</div>

						<div>
							<strong>Name:</strong> <span>{userData.name}</span>
						</div>

						<div>
							<strong>Email:</strong> <span>{userData.email}</span>
						</div>

						<div>
							<strong>Total Teams:</strong> <span>{userData.teams.length}</span>
						</div>
					</div>{' '}
				</div>

				<div className='divider'></div>

				<p className='allowed-teams'>
					You can currently create up to{' '}
					<strong>{allowedTeams - userData.teams.length}</strong> more teams.
					(Limit: {allowedTeams})
				</p>
			</div>
		</>
	);
}
