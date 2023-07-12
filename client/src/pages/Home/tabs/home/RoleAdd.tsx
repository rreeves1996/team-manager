import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../..';
import useQuery from '../../../../hooks/useQuery';
import useFormat from '../../../../hooks/useFormat';

type RoleAddProps = {
	handleChangeData: (arg?: any) => void;
};

export default function RoleAdd({ handleChangeData }: RoleAddProps) {
	const teamData = useContext(DataContext);
	const { id } = teamData;
	const { addRole } = useQuery();
	const { uppercaseFirstChars } = useFormat();

	const [addType, setAddType] = useState('employee');
	const [formState, setFormState] = useState({
		rolename: '',
		rolesalary: 0,
	});

	const handleChange = (event: any) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleFormSubmit = (event: any) => {
		event.preventDefault();

		const newRoleName = uppercaseFirstChars(formState.rolename.trim());
		const newRoleSalary = formState.rolesalary;

		if (newRoleName && newRoleSalary) {
			if (newRoleSalary >= 0) {
				const payload = {
					title: newRoleName,
					salary: newRoleSalary,
					team_id: id?.toString(),
				};

				addRole(payload).then((res) => handleChangeData(res!.data));

				window.alert('Successfully created role!');
			} else {
				window.alert('Salary must be a positive number!');
			}
		} else {
			window.alert('Invalid role name or salary!');
		}

		setFormState({
			rolename: '',
			rolesalary: 0,
		});
	};

	return (
		<div className='role-add'>
			<h2>Roles</h2>

			<div className='container-body'>
				<div className='add-role-container'>
					<form className='form-container' onSubmit={handleFormSubmit}>
						<div className='employee-input'>
							<div className='field name-field'>
								<label className='label role-name-label'>Role Name:</label>
								<div className='control'>
									<input
										className='input'
										type='text'
										name='rolename'
										placeholder='New role name'
										value={formState.rolename}
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
										value={formState.rolesalary}
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
			</div>
		</div>
	);
}
