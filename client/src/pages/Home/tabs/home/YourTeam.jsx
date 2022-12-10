import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../../../Home';
import { EmpCard, MngrCard } from '../../../../components/cards/EmpCard';
import useFormat from '../../../../hooks/useFormat';

export default function YourTeam() {
	const teamData = useContext(DataContext);
	const { abbreviateName } = useFormat();
	const { employees, managers, roles } = teamData;

	return (
		<div className='your-team'>
			<h2>Your Team</h2>
			<div className='container-body'>
				<div className='managers mb-4'>
					<h5>
						<strong>Managers</strong>
					</h5>
					<div className='card-container'>
						{managers.map((manager) => (
							<MngrCard
								key={uuidv4()}
								manager={{
									...manager,
									abbreviatedname: abbreviateName(manager.name),
								}}
							/>
						))}
					</div>
				</div>
				<div className='employees'>
					<h5>
						<strong>Employees</strong>
					</h5>
					<div className='card-container'>
						{employees.map((employee) => (
							<EmpCard
								key={uuidv4()}
								employee={{
									...employee,
									abbreviatedname: abbreviateName(employee.name),
								}}
								roles={roles}
								managers={managers}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
