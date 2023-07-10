import React, { useState, useContext } from 'react';
import { HiPencilSquare, HiExclamationCircle } from 'react-icons/hi2';
import { DataContext } from '../..';

export default function Summary() {
	const teamData = useContext(DataContext);
	const { managers, employees } = teamData;

	return (
		<div className='summary'>
			<h2>Summary</h2>

			<div className='summary-header'>
				<h5>
					<strong>Welcome to TeamEZ!</strong>
				</h5>
			</div>

			<div className='divider' />

			<div className='card-body'>
				<p>
					Your team has <strong>{managers!.length}</strong> managers and{' '}
					<strong>{employees!.length}</strong> employees{' '}
				</p>

				<div className='info'>
					<HiExclamationCircle className='alert-icon' />
					<p>
						To edit your team name, manager, or delete your team, click the{' '}
						<HiPencilSquare className='pencil-icon' /> icon
					</p>
				</div>
			</div>
		</div>
	);
}
