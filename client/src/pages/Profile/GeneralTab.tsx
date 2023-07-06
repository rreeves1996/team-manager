import React from 'react';
import Info from './tabs/general/Info';
import Teams from './tabs/general/Teams';

interface GeneralTabProps {
	userdata: {
		email: string;
		picture: any;
		username: string;
		name: string;
		teams: Team[];
	};
	teamdata: Array<any>;
}

export default function GeneralTab({ userdata, teamdata }: GeneralTabProps) {
	return (
		<>
			<div className='col-profile-sm'>
				<Info userData={userdata} />
			</div>

			<div className='col-profile-lg'>
				<Teams teamData={teamdata} />
			</div>
		</>
	);
}
