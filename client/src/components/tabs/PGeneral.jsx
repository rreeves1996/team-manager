import React, { useContext } from 'react';
import { UserContext } from '../Profile';
import Info from './profile/Info';
import Teams from './profile/Teams';

export default function General() {
	const userData = useContext(UserContext);

	return (
		<>
			<div className='col-profile-sm'>
				<Info />
			</div>

			<div className='col-profile-lg'>
				<Teams teams={userData.teams} />
			</div>
		</>
	);
}
