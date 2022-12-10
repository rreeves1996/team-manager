import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AiOutlineRight } from 'react-icons/ai';
import { FaUsers, FaTimes } from 'react-icons/fa';
import { PreviewCard } from '../../../components/cards/EmpCard';

export default function Preview(props) {
	const { teamName, roles, managers, employees } = props;
	const { handleDeleteEmployee, handleDeleteManager, handleDeleteRole } = props;
	const teamLead = managers.filter((manager) => manager.is_lead);
	const teamManagers = managers.filter((manager) => manager.is_lead === false);

	const getEmpCount = (role) => {
		const employeesInRole = employees.filter(
			(employee) => employee.role === role.title
		);

		return employeesInRole.length;
	};

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
					<h3>{teamName ? teamName : 'Team Name'}</h3>
				</div>
				<div className='team-preview-body'>
					<div className='team-summary'>
						<div className='team-summary-header'>
							<h6>
								Once you're happy with your team, click the "Submit" button to
								create your new team.
							</h6>
							<h6>
								Team name, managers, employees, and roles can all be edited
								later, so don't worry about finalizing your team here.
							</h6>
							<h6>
								Warning: Deleting a role will delete all of the employees
								currently in the role!
							</h6>
						</div>
						<div className='divider'></div>
						<div className='ts-roles'>
							<h4 className='ts-header-text'>
								<strong>Roles:</strong>
							</h4>
							<div className='ts-roles-container'>
								{roles.map((role) => (
									<div className='ts-role' key={uuidv4()}>
										<div className='ts-role-body'>
											<h6>
												<strong>{role.title}</strong>
											</h6>
											<p>
												<AiOutlineRight className='right-caret' /> Salary: $
												{role.salary}
											</p>
											<p>
												<AiOutlineRight className='right-caret' /> Total
												employees: {getEmpCount(role)}
											</p>
										</div>
										<button
											className='preview-delete-button'
											onClick={() => handleDeleteRole(role)}>
											<FaTimes className='preview-delete-icon' />
										</button>
									</div>
								))}
							</div>
						</div>
					</div>
					<div className='preview-row'>
						<div className='managers-preview'>
							<h4 className='ts-header-text'>
								<strong>Team Lead:</strong>
							</h4>

							<div className='ts-lead-container'>
								{teamLead[0] && (
									<div className='preview-card-container' key={uuidv4()}>
										<PreviewCard employee={teamLead[0]} />{' '}
										<button
											className='preview-delete-button'
											onClick={() => handleDeleteManager(teamLead[0])}>
											<FaTimes className='preview-delete-icon' />
										</button>
									</div>
								)}
							</div>

							<h4 className='ts-header-text'>
								<strong>Managers:</strong>
							</h4>

							<div className='ts-managers-container'>
								{teamManagers[0] &&
									teamManagers.map((manager) => (
										<div className='preview-card-container' key={uuidv4()}>
											<PreviewCard employee={manager} />
											<button
												className='preview-delete-button'
												onClick={() => handleDeleteManager(manager)}>
												<FaTimes className='preview-delete-icon' />
											</button>
										</div>
									))}
							</div>
						</div>

						<div className='employees-preview'>
							<h4 className='ts-header-text'>
								<strong>Employees:</strong>
							</h4>
							<div className='ts-managers-container'>
								{employees[0] &&
									employees.map((employee) => (
										<div className='preview-card-container' key={uuidv4()}>
											<PreviewCard employee={employee} />
											<button
												className='preview-delete-button'
												onClick={() => handleDeleteEmployee(employee)}>
												<FaTimes className='preview-delete-icon' />
											</button>
										</div>
									))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
