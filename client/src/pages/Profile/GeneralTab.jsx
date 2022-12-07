import React from 'react';
import Info from './tabs/general/Info';
import Teams from './tabs/general/Teams';

export default function GeneralTab() {
	return (
		<>
			<div className='col-profile-sm'>{/* <Info /> */}</div>

			<div className='col-profile-lg'>{/* <Teams /> */}</div>
		</>
	);
}
