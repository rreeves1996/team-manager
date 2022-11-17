import React, { useState } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { HiPencilSquare, HiExclamationCircle } from 'react-icons/hi2';
import dayjs from 'dayjs';

export default function Summary(props) {
	const [collapsed, collapseStats] = useState(true);

	return (
		<div className='summary'>
			<h2>Summary</h2>
			<div className='summary-header'>
				<h6>Welcome to TeamEZ! Today is</h6>
				<h5>
					<strong>{dayjs().format('dddd, MMM D, YYYY')}</strong>
				</h5>
			</div>
			<div className='divider'></div>
			<div className='card-body'>
				<p>
					Your team has <strong>{props.employees.length}</strong> employees{' '}
				</p>
				<span
					className='more-stats-toggler'
					onClick={() => collapseStats((prevState) => !prevState)}>
					More stats{' '}
					<AiOutlineCaretDown
						className={collapsed ? 'stats-toggler' : 'stats-toggler rotated'}
					/>
				</span>

				<div className={collapsed ? 'more-stats collapsed' : 'more-stats'}>
					<p>
						<strong>Payroll Total: </strong>{' '}
					</p>
					<p>
						<strong>Avg. Salary:</strong>{' '}
					</p>
					{/* {props.roles.map((role) => {
            console.log(role);
            return (
              <p>
                <strong>Total {role.roleName}s:</strong> {role.empCount}
              </p>
            );
          })} */}
				</div>
				<div className='info'>
					<HiExclamationCircle />
					<p>
						To edit your team name, manager, or delete your team, click the{' '}
						<HiPencilSquare /> icon
					</p>
				</div>
				<div className='info'>
					<HiExclamationCircle />
					<p>
						To add/edit roles or salaries, select the <strong>Manage</strong>{' '}
						tab
					</p>
				</div>
			</div>
		</div>
	);
}
