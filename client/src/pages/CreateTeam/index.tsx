import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Preview from './modules/Preview';
import TeamAdd from './modules/TeamAdd';
import TeamName from './modules/TeamName';
import useQuery from '../../hooks/useQuery';

export default function CreateTeam() {
	const navigate = useNavigate();
	const { createTeam, addRole, addManager, addEmployee } = useQuery();
	const user_id = useSelector((state: any) => state.user.data!.id);

	const [name, setName] = useState('');
	const [employees, setEmployees] = useState<Employee[]>([]);
	const [managers, setManagers] = useState<Manager[]>([]);
	const [roles, setRoles] = useState<Role[]>([]);

	const handleSetName = (teamName: string) => {
		setName((prevState) => teamName);
	};

	const handleAddEmployee = (employee: Employee) => {
		setEmployees((prevState) => [employee, ...prevState]);
	};

	const handleAddManager = (manager: Manager) => {
		setManagers((prevState) => [manager, ...prevState]);
	};

	const handleAddRole = (role: Role) => {
		setRoles((prevState) => [role, ...prevState]);
	};

	const handleDeleteEmployee = (employee: Employee) => {
		const newArray = employees.filter(
			(element: any) => element.name !== employee.name
		);

		setEmployees((prevState) => newArray);
	};

	const handleDeleteManager = (manager: Manager) => {
		const newArray = managers.filter(
			(element: any) => element.name !== manager.name
		);

		setManagers((prevState) => newArray);
	};

	const handleDeleteRole = (role: Role) => {
		const newArray = roles.filter(
			(element: any) => element.title !== role.title
		);
		const newEmployeeArray = employees.filter(
			(element: any) => element.role !== role.title
		);

		setRoles((prevState) => newArray);
		setEmployees((prevState) => newEmployeeArray);
	};

	const handleSubmitTeam = () => {
		const payload: CreateTeamPayload = {
			name,
			user_id,
			employees,
			managers,
			roles,
		};

		if (payload && employees[0] && managers[0] && roles[0]) {
			try {
				createTeam(payload);

				navigate('/profile');
			} catch (err) {
				window.alert(`Failed to create team! Error: ${err}`);
			}
		}
	};

	return (
		<>
			<header>
				<div className='row'>
					<div className='header-text'>
						<h1>New Team</h1>
					</div>
				</div>
			</header>
			<div className='tab-container'>
				<button className='tab-button' onClick={() => navigate('/profile')}>
					Cancel
				</button>
				<button className='tab-button' onClick={() => handleSubmitTeam()}>
					Submit
				</button>
			</div>
			<div className='create-team-container'>
				<div className='col-team'>
					<TeamName
						handleSetName={handleSetName}
						handleAddRole={handleAddRole}
					/>
					<TeamAdd
						employees={employees}
						managers={managers}
						roles={roles}
						handleAddEmployee={handleAddEmployee}
						handleAddManager={handleAddManager}
					/>
				</div>
				<Preview
					teamName={name}
					employees={employees}
					managers={managers}
					roles={roles}
					handleDeleteEmployee={handleDeleteEmployee}
					handleDeleteManager={handleDeleteManager}
					handleDeleteRole={handleDeleteRole}
				/>
			</div>
		</>
	);
}
