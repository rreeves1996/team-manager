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
	const user_id = useSelector((state) => state.user.data.id);

	const [name, setName] = useState('');
	const [employees, setEmployees] = useState([]);
	const [managers, setManagers] = useState([]);
	const [roles, setRoles] = useState([]);

	const handleSetName = (teamName) => {
		setName((prevState) => teamName);
	};

	const handleAddEmployee = (employee) => {
		setEmployees((prevState) => [employee, ...prevState]);
	};

	const handleAddManager = (manager) => {
		setManagers((prevState) => [manager, ...prevState]);
	};

	const handleAddRole = (role) => {
		setRoles((prevState) => [role, ...prevState]);
	};

	const handleDeleteEmployee = (employee) => {
		const newArray = employees.filter(
			(element) => element.name !== employee.name
		);

		setEmployees((prevState) => newArray);
	};

	const handleDeleteManager = (manager) => {
		const newArray = managers.filter(
			(element) => element.name !== manager.name
		);

		setManagers((prevState) => newArray);
	};

	const handleDeleteRole = (role) => {
		const newArray = roles.filter((element) => element.title !== role.title);
		const newEmployeeArray = employees.filter(
			(element) => element.role !== role.title
		);

		setRoles((prevState) => newArray);
		setEmployees((prevState) => newEmployeeArray);
	};

	const handleSubmitTeam = (team) => {
		const teamPayload = {
			name,
			user_id,
			employees,
			managers,
			roles,
		};

		if (teamPayload) {
			try {
				createTeam(teamPayload);

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
