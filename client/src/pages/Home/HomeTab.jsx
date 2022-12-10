import React from 'react';
import Summary from './tabs/home/Summary';
import QuickAdd from './tabs/home/QuickAdd';
import YourTeam from './tabs/home/YourTeam';

export default function HomeTab({ handleChangeData }) {
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
