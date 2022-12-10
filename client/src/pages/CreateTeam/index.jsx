import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Preview from './modules/Preview';
import TeamAdd from './modules/TeamAdd';
import TeamName from './modules/TeamName';

export default function CreateTeam() {
	const navigate = useNavigate();
	const [name, setName] = useState('');
	const [employees, setEmployees] = useState([]);
	const [managers, setManagers] = useState([]);
	const [roles, setRoles] = useState([]);

	const handleSetName = (teamName) => {
		setName((prevState) => teamName);
		console.log(name);
	};

	const handleAddEmployee = (employee) => {
		setEmployees((prevState) => [...prevState, employee]);
		console.log(employees);
	};

	const handleAddManager = (manager) => {
		setManagers((prevState) => [...prevState, manager]);
		console.log(managers);
	};

	const handleAddRole = (role) => {
		setRoles((prevState) => [...prevState, role]);
		console.log(roles);
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
				<button className='tab-button' onClick={() => {}}>
					Submit
				</button>
			</div>
			<div className='create-team-container'>
				<div className='col-team'>
					<TeamName handleSetName={handleSetName} />
					<TeamAdd
						employees={employees}
						managers={managers}
						roles={roles}
						handleAddEmployee={handleAddEmployee}
						handleAddManager={handleAddManager}
						handleAddRole={handleAddRole}
					/>
				</div>
				<Preview employees={employees} managers={managers} roles={roles} />
			</div>
		</>
	);
}
