import React, { useState } from 'react';
import MyTeams from './profile/MyTeams';
// import TeamCard from '../cards/TeamCard';

export default function PTeams() {
	return (
		<div className='pteams'>
			<MyTeams />
			<div className='col-profile'></div>
		</div>
	);
}
