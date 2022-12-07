import React from 'react';
import { UserContext } from '.';
import Info from './tabs/general/Info';
import Teams from './tabs/general/Teams';

export default function GeneralTab(props) {
	return (
		<>
			<div className='col-profile-sm'>
				<Info userData={props.userdata} />
			</div>

			<div className='col-profile-lg'>
				<Teams teamData={props.teamData} />
			</div>
		</>
	);
}
