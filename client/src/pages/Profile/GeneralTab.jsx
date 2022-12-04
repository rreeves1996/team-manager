import React, { useContext } from 'react';
import { UserContext } from '.';
import Info from './tabs/general/Info';
import Teams from './tabs/general/Teams';

export default function GeneralTab() {
	const userData = useContext(UserContext);

	return (
		<>
			<div className='col-profile-sm'>
				<Info />
			</div>

			<div className='col-profile-lg'>
				<Teams />
			</div>
		</>
	);
}
