import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaUserPlus } from 'react-icons/fa';
import useFormat from '../../../hooks/useFormat';

type TeamAddProps = {
	managers: Manager[];
	employees: Employee[];
	roles: Role[];
	handleAddEmployee: (arg: Employee) => void;
	handleAddManager: (arg: Manager) => void;
};

export default function TeamAdd({
	managers,
	employees,
	roles,
	handleAddEmployee,
	handleAddManager,
}: TeamAddProps) {
	const { uppercaseFirstChars } = useFormat();
	const [addType, setAddType] = useState('employee');
	const [formState, setFormState] = useState({
		empname: '',
		emprole: 'default',
		manname: '',
		manlead: 'default',
	});
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

	console.log(roles);

	const handleChange = (event: any) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = (event: any) => {
		event.preventDefault();

		if (addType === 'employee') {
			const newEmpName = uppercaseFirstChars(formState.empname.trim());
			const newEmpRole = formState.emprole.trim();

			if (newEmpName && newEmpRole) {
				const payload = {
					name: newEmpName,
					role_title: newEmpRole,
				};

				handleAddEmployee(payload);

				console.log(payload);
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

	return (
		<div className='team-add'>
			<h2>
				<FaUserPlus className='card-icon' /> Add To Team
			</h2>

			<div className='container-body'>
				<div
					className='add-employee-container'
					style={addType === 'employee' ? styles.style2 : styles.style1}>
					<h6>
						<strong>Enter employee information</strong>
					</h6>

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
					<h6>
						<strong>Enter manager information</strong>
					</h6>

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
