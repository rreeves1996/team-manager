import React, { useEffect } from 'react';
import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import useFormat from '../../../hooks/useFormat';

type TeamNameProps = {
	handleSetName: (arg: string) => void;
	handleAddRole: (arg: Role) => void;
};

export default function TeamName({
	handleSetName,
	handleAddRole,
}: TeamNameProps) {
	const { uppercaseFirstChars } = useFormat();
	const [formState, setFormState] = useState({
		teamname: '',
	});
	const [roleFormState, setRoleFormState] = useState({
		rolename: '',
		rolesalary: 0,
	});

	const handleChange = (event: any) => {
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

	useEffect(() => {
		handleSetName(formState.teamname);
	}, [formState]);

	const handleRoleSubmit = (event: any) => {
		event.preventDefault();

		const newRoleName = uppercaseFirstChars(roleFormState.rolename.trim());
		const newRoleSalary = roleFormState.rolesalary;

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
		<div className='team-name-container'>
			<h2>
				<HiPencilAlt className='card-icon' /> Team Name
			</h2>
			<h6>
				<strong>Enter your new team's name</strong>
			</h6>

			<div className='container-body'>
				<p>(Can be changed later):</p>
				<form className='form-container'>
					<div className='field'>
						<label className='label'>Team Name:</label>
						<div className='control'>
							<input
								className='input'
								type='text'
								name='teamname'
								placeholder='17 char. maximum'
								maxLength={17}
								value={formState.teamname}
								onChange={handleChange}
							/>
						</div>
					</div>
				</form>

				<span>
					Fill in the forms below to add roles, managers, and employees to your
					team.
				</span>

				<span>
					Each team is only allotted one lead. Make sure to create roles before
					trying to add employees!
				</span>

				<div className='divider' />

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
			</div>
		</div>
	);
}
