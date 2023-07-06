import React from 'react';
import Summary from './tabs/home/Summary';
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
				<QuickAdd handleChangeData={handleChangeData} />
			</div>
			<YourTeam />
		</>
	);
}
