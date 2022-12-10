import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaUserPlus } from 'react-icons/fa';
import useFormat from '../../../hooks/useFormat';

export default function TeamAdd(props) {
	const { uppercaseFirstChars } = useFormat();
	const [addType, setAddType] = useState('employee');
	const [formState, setFormState] = useState({
		empname: '',
		emprole: 'default',
		manname: '',
		manlead: 'default',
	});
	const [roleFormState, setRoleFormState] = useState({
		rolename: '',
		rolesalary: 0,
	});
	const { handleAddEmployee, handleAddManager, handleAddRole } = props;
	const { managers, employees, roles } = props;
	const teamLead = managers.filter((manager) => manager.is_lead);
	const styles = {
		style1: {
			transform: 'translateX(-150%)',
		},
		style2: {
			transform: 'translateX(0%)',
		},
		style3: {
			transform: 'translateX(150%)',
		},
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});

		setRoleFormState({
			...roleFormState,
			[name]: value,
		});
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (addType === 'employee') {
			const newEmpName = uppercaseFirstChars(formState.empname.trim());
			const newEmpRole = formState.emprole.trim();

			if (newEmpName && newEmpRole) {
				const payload = {
					name: newEmpName,
					role: newEmpRole,
				};

				handleAddEmployee(payload);
			} else {
				window.alert('Invalid employee name or role!');
			}
		} else if (addType === 'manager') {
			const newManName = uppercaseFirstChars(formState.manname.trim());
			const newManLead = formState.manlead.trim();

			if (newManName && newManLead) {
				const payload = {
					name: newManName,
					is_lead: newManLead === 'Team Lead' ? true : false,
				};

				handleAddManager(payload);
			} else {
				window.alert('Invalid manager name or role!');
			}
		}

		setFormState({
			empname: '',
			emprole: 'default',
			manname: '',
			manlead: 'default',
		});
	};

	const handleRoleSubmit = (event) => {
		event.preventDefault();

		const newRoleName = uppercaseFirstChars(roleFormState.rolename.trim());
		const newRoleSalary = roleFormState.rolesalary.trim();

		if (newRoleName && newRoleSalary) {
			if (newRoleSalary >= 0) {
				const payload = {
					title: newRoleName,
					salary: newRoleSalary,
				};

				handleAddRole(payload);
			} else {
				window.alert('Salary must be a positive number!');
			}
		} else {
			window.alert('Invalid role name or salary!');
		}

		setRoleFormState({
			rolename: '',
			rolesalary: 0,
		});
	};

	return (
		<div className='team-add'>
			<h2>
				<FaUserPlus className='card-icon' /> Add To Team
			</h2>
			<h6>
				<span>
					Fill in the form below to add roles, managers, and employees to your
					team.
				</span>
				<span>
					Each team is only allotted one lead. Make sure to create roles before
					trying to add employees!
				</span>
			</h6>

			<div className='container-body'>
				<div className='add-role-container'>
					<form className='form-container' onSubmit={handleRoleSubmit}>
						<div className='employee-input'>
							<div className='field name-field'>
								<label className='label role-name-label'>Role Name:</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										name='rolename'
										placeholder='New role name'
										value={roleFormState.rolename}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='field name-field'>
								<label className='label role-salary-label'>Salary: $</label>
								<div className='control'>
									<input
										className='input role-salary-input'
										type='number'
										name='rolesalary'
										placeholder='New role salary'
										value={roleFormState.rolesalary}
										onChange={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className='button-container'>
							<button className='form-button' type='submit'>
								Add Role
							</button>
						</div>
					</form>
				</div>

				<div className='divider'></div>

				<div
					className='add-employee-container'
					style={addType === 'employee' ? styles.style2 : styles.style1}>
					<form className='form-container' onSubmit={handleFormSubmit}>
						<div className='employee-input'>
							<div className='field name-field'>
								<label className='label'>Name:</label>
								<div className='control'>
									<input
										className='input'
										type='empname'
										name='empname'
										placeholder='New employee name'
										value={formState.empname}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='field role-field'>
								<label className='label'>Role:</label>
								<select
									className='role-select'
									name='emprole'
									value={formState.emprole}
									onChange={handleChange}>
									<option value='default' disabled>
										Select role...
									</option>
									{roles.map((role) => (
										<option key={uuidv4()} value={role.title}>
											{role.title}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className='button-container'>
							<button className='form-button' type='submit'>
								Add Employee
							</button>
						</div>
					</form>

					<div className='sub-container d-flex flex-column align-items-center mb-4'>
						<p className='mt-1 mb-1'>Create a manager instead?</p>
						<span
							className='quickadd-toggler'
							onClick={() => setAddType('manager')}>
							New Manager
						</span>
					</div>
				</div>

				<div
					className='add-manager-container'
					style={addType === 'employee' ? styles.style3 : styles.style2}>
					<form className='form-container' onSubmit={handleFormSubmit}>
						<div className='employee-input'>
							<div className='field name-field'>
								<label className='label'>Name:</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										name='manname'
										placeholder='New manager name'
										value={formState.manname}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div className='field role-field'>
								<label className='label'>Role:</label>
								<select
									className='role-select'
									name='manlead'
									value={formState.manlead}
									onChange={handleChange}>
									<option value='default' disabled>
										Select role...
									</option>

									<option key={uuidv4()} value={'Manager'}>
										Manager
									</option>
									{!teamLead[0] && (
										<option key={uuidv4()} value={'Team Lead'}>
											Team Lead
										</option>
									)}
								</select>
							</div>
						</div>

						<div className='button-container'>
							<button className='form-button' type='submit'>
								Add Manager
							</button>
						</div>
					</form>

					<div className='sub-container d-flex flex-column align-items-center mb-4'>
						<p className='mt-1 mb-1'>Create an employee instead?</p>
						<span
							className='quickadd-toggler'
							onClick={() => setAddType('employee')}>
							New Employee
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
