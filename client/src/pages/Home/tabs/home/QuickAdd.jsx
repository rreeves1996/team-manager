import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../../../Home';
import useQuery from '../../../../hooks/useQuery';

export default function QuickAdd({ handleChangeData }) {
	const teamData = useContext(DataContext);
	const { id, lead, roles } = teamData;
	const { addEmployee, addManager } = useQuery();
	const [addType, setAddType] = useState('employee');
	const [formState, setFormState] = useState({
		empname: '',
		emprole: 'default',
		manname: '',
		manlead: 'default',
	});
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
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		if (addType === 'employee') {
			const newEmpName = formState.empname.trim();
			const newEmpRole = formState.emprole.trim();

			if (newEmpName && newEmpRole) {
				const payload = {
					name: newEmpName,
					role_id: newEmpRole,
					manager_id: lead.id,
					team_id: id,
				};

				try {
					addEmployee(payload).then((res) => handleChangeData(res.data));

					window.alert('Successfully created employee!');
				} catch (err) {
					window.alert(`Failed to create new employee! Error: ${err}`);
				}
			} else {
				window.alert('Invalid employee name or role!');
			}
		} else if (addType === 'manager') {
			const newManName = formState.manname.trim();
			const newManLead = formState.manlead.trim();

			if (newManName && newManLead) {
				const payload = {
					name: newManName,
					is_lead: newManLead === 'Team Lead' ? true : false,
					team_id: id,
				};

				try {
					addManager(payload).then((res) => handleChangeData(res.data));

					window.alert('Successfully created manager!');
				} catch (err) {
					window.alert(`Failed to create new manager! Error: ${err}`);
				}
			} else {
				window.alert('Invalid manager name or role!');
			}
		}

		setFormState({
			teamname: '',
			leadname: '',
		});
	};

	return (
		<div className='quick-add'>
			<h2>Quick-Add</h2>
			<div className='container-body'>
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
										<option key={uuidv4()} value={role.id}>
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
					<div className='divider'></div>
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
									defaultValue={'default'}
									value={formState.manlead}
									onChange={handleChange}>
									<option value='default' disabled>
										Select role...
									</option>

									<option key={uuidv4()} value={'Manager'}>
										Manager
									</option>
									<option key={uuidv4()} value={'Team Lead'}>
										Team Lead
									</option>
								</select>
							</div>
						</div>

						<div className='button-container'>
							<button className='form-button' type='submit'>
								Add Manager
							</button>
						</div>
					</form>

					<div className='divider'></div>

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
