import React, { useState } from 'react';
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

	const handleSetName = (name) => {
		setName((prevState) => name);
	};

	const handleAddEmployee = (employee) => {
		setEmployees((prevState) => [...prevState, employee]);
	};

	const handleAddManager = (manager) => {
		setManagers((prevState) => [...prevState, manager]);
	};

	const handleAddRole = (role) => {
		setRoles((prevState) => [...prevState, role]);
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
			<div className='home-container'>
				<div className='col-home'>
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
				<Preview />
			</div>
		</>
	);
}
