import React from 'react';
import Summary from './tabs/home/Summary';
import RoleAdd from './tabs/home/RoleAdd';
import QuickAdd from './tabs/home/QuickAdd';
import YourTeam from './tabs/home/YourTeam';

interface HomeTabProps {
	handleChangeData: (arg?: any) => void;
}

export default function HomeTab({ handleChangeData }: HomeTabProps) {
	return (
		<>
			<div className='col-home'>
				<Summary />
				<RoleAdd handleChangeData={handleChangeData} />
				<QuickAdd handleChangeData={handleChangeData} />
			</div>
			<YourTeam />
		</>
	);
}
