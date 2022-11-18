import React from 'react';
import Summary from './home/Summary';
import QuickAdd from './home/QuickAdd';
import YourTeam from './home/YourTeam';

export default function HomeTab() {
	return (
		<>
			<div className='col-home'>
				<Summary />
				<QuickAdd />
			</div>
			<YourTeam />
		</>
	);
}
