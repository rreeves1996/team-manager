import React from 'react';
import { FaUsers } from 'react-icons/fa';

export default function Preview() {
	return (
		<div className='team-preview'>
			<h2>
				<FaUsers className='team-icon card-icon' /> Team Preview
			</h2>
			<div className='container-body'>
				<div className='team-preview-header'>
					<h6>
						<strong>Your new team:</strong>
					</h6>
					<h3>Teamname</h3>
				</div>
				<div className='team-preview-body'>
					<div className='team-summary'>
						<div className='team-summary-header'>
							<h6>
								Once you're happy with your team, click the "Submit" button to
								create your new team. Team name, managers, employees, and roles
								can all be edited later, so don't worry about finalizing your
								team here.
							</h6>
						</div>
						<div className='divider'></div>
						<div className='ts-roles'>
							<h4 className='ts-header-text'>
								<strong>Roles:</strong>
							</h4>
							<div className='ts-roles-container'></div>
						</div>
					</div>

					<div className='managers-preview'>
						<h4 className='ts-header-text'>
							<strong>Lead:</strong>
						</h4>
						<div className='ts-lead-container'></div>
						<h4 className='ts-header-text'>
							<strong>Managers:</strong>
						</h4>
						<div className='ts-managers-container'></div>
					</div>
					<div className='employees-preview'>
						<h4 className='ts-header-text'>
							<strong>Employees:</strong>
						</h4>
						<div className='ts-managers-container'></div>
					</div>
				</div>
			</div>
		</div>
	);
}
