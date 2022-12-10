import React, { useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../../../Home';
import { EmpCard, MngrCard } from '../../../../components/cards/EmpCard';

export default function YourTeam() {
	const teamData = useContext(DataContext);
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
						{managers.map((manager) => {
							const managerNameSplit = manager.name.split(' ');
							const managerFirst = managerNameSplit[0].split('');
							const managerNameAbbreviated = [];
							if (managerNameSplit[1]) {
								managerNameAbbreviated.push(
									`${managerFirst[0]}. ${managerNameSplit[1]}`
								);
							} else {
								managerNameAbbreviated.push(managerNameSplit[0]);
							}

							return (
								<MngrCard
									key={uuidv4()}
									manager={{
										...manager,
										abbreviatedname: managerNameAbbreviated,
									}}
								/>
							);
						})}
					</div>
				</div>
				<div className='employees'>
					<h5>
						<strong>Employees</strong>
					</h5>
					<div className='card-container'>
						{employees.map((employee) => {
							const employeeNameSplit = employee.name.split(' ');
							const employeeFirst = employeeNameSplit[0].split('');
							const employeeNameAbbreviated = `${employeeFirst[0]}. ${employeeNameSplit[1]}`;

							console.log(employee);
							return (
								<EmpCard
									key={uuidv4()}
									employee={{
										...employee,
										abbreviatedname: employeeNameAbbreviated,
									}}
									roles={roles}
									managers={managers}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
