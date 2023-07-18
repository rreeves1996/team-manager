import React, { useState, useEffect } from 'react';
import { BsExclamationLg } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import useFormat from '../../hooks/useFormat';
import { useNavigate } from 'react-router-dom';

function EmpPhoneNumber({
	header,
	phone,
}: {
	header?: boolean;
	phone?: string | null;
}) {
	const phoneSplit = [
		phone ? phone!.slice(0, 3) : '',
		phone ? phone!.slice(3, 6) : '',
		phone ? phone!.slice(6, 10) : '',
	];
	return (
		<p>
			{header ? <></> : <strong>Phone:</strong>}
			{phoneSplit[0] === '' ? (
				<>
					{header ? (
						<span className='phone-missing'>
							<BsExclamationLg className='alert-icon' /> Phone # missing
						</span>
					) : (
						<>No # found</>
					)}
				</>
			) : (
				<>{`(${phoneSplit[0]}) ${phoneSplit[1]}-${phoneSplit[2]}`}</>
			)}
		</p>
	);
}

function EmpEmail(props: { email?: string | null }) {
	return (
		<p>
			<strong>Email:</strong> {props.email ? props.email : 'No email found'}
		</p>
	);
}

function EmpTimeZone(props: { timezone?: string }) {
	return (
		<p>
			<strong>Time:</strong> UTC -{props.timezone ? props.timezone : '0'}:00
		</p>
	);
}

function EmpRole(props: { role?: string | null }) {
	return (
		<p>
			<strong>Role:</strong> {props.role ? props.role : 'No role found'}
		</p>
	);
}

function EmpMngr(props: { manager?: string | null }) {
	return (
		<p>
			<strong>Manager:</strong>{' '}
			{props.manager ? props.manager : 'No manager found'}
		</p>
	);
}

function EmpSalary(props: { salary?: number | null }) {
	return (
		<p>
			<strong>Salary:</strong> $
			{props.salary ? props.salary : 'No salary found'}
		</p>
	);
}

export function MngrCard({ manager }: { manager: Manager }) {
	const navigate = useNavigate();
	const { abbreviateName } = useFormat();
	const abbreviatedname = abbreviateName(manager.name);
	const [show, setShow] = useState(false);
	const [deleteConfirm, showDeleteConfirm] = useState(false);
	const [editing, setEditing] = useState(false);
	const [formState, setFormState] = useState({
		mngrSalary: manager.salary,
		phone1: manager.phone ? manager.phone.slice(0, 3) : '',
		phone2: manager.phone ? manager.phone.slice(3, 6) : '',
		phone3: manager.phone ? manager.phone.slice(6, 10) : '',
		mngrEmail: manager.email ? manager.email : '',
		mngrTimezone: manager.timezone ? manager.timezone : '',
	});

	// Create an Array.range fucntion which takes in a custom start and end point and returns an array of numbers from start to end
	Array.range = (start: any, end: any) =>
		Array.from({ length: end - start }, (v, k) => k + start);
	// Create timezones array for listing timezones
	const timezones = Array.range(-12, 13);

	const handleClose = () => {
		setShow(false);
		setTimeout(() => {
			showDeleteConfirm(false);
			setEditing(false);
		}, 300);
	};

	const handleShow = () => {
		setShow(true);
	};

	const handleChange = (event: any) => {
		const { name, value, maxLength } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});

		if (maxLength === 3) {
			if (value.length >= maxLength) {
				event.target.nextElementSibling.focus();
			}
		}
	};

	const handleEditSubmit = async (event: any) => {
		event.preventDefault();

		let payload: ManagerCardEditPayload = {
			salary: manager.salary,
			phone: manager.phone,
			email: manager.email,
			timezone: manager.timezone,
		};
		const phonenumbers = [
			formState.phone1.trim(),
			formState.phone2.trim(),
			formState.phone3.trim(),
		];

		// Check if salary has changed , and if so, assign salary to payload
		if (formState.mngrSalary !== manager.salary) {
			payload!.salary = formState.mngrSalary;
		}

		// Check if phone number has changed
		if (
			`${phonenumbers[0]}${phonenumbers[1]}${phonenumbers[2]}` !== manager.phone
		) {
			// Check to make sure phone number length is valid
			if (
				phonenumbers[0].length === 3 &&
				phonenumbers[1].length === 3 &&
				phonenumbers[2].length === 4
			) {
				payload!.phone = `${phonenumbers[0]}${phonenumbers[1]}${phonenumbers[2]}`;
			} else {
				window.alert('Invalid phone number!');
				return;
			}
		}

		// Check if email has changed
		if (formState.mngrEmail && formState.mngrEmail !== manager.email) {
			let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			// Ensure email is formatted correctly and add to payload
			if (formState.mngrEmail.match(emailFormat)) {
				payload!.email = formState.mngrEmail;
			} else {
				window.alert('Invalid email!');
				return;
			}
		}

		// Check if timezone has changed, and if so, add to payload
		if (formState.mngrTimezone !== manager.timezone) {
			payload!.timezone = formState.mngrTimezone;
		}

		await axios
			.put(`/api/managers/${manager.id}`, {
				salary: payload.salary,
				phone: payload.phone,
				email: payload.email,
				timezone: payload.timezone,
			})
			.then(() => {
				window.alert(`Manager successfully updated!`);

				navigate(0);
			})
			.catch((err) => console.log(`Failed to update manager: ${err}`));

		setEditing(!editing);
	};

	const deleteEmployee = (manager: any) => {
		let index = manager.id - 1;
		delete manager[index];
	};

	return (
		<>
			<div className='emp-card' onClick={handleShow}>
				<div className='emp-card-header'>
					<div className='emp-picture'>
						{manager.picture ? (
							<img src={manager.picture} alt='' />
						) : (
							<FaUser className='emp-picture-icon' />
						)}
					</div>

					<div className='emp-info-header'>
						<h6 className='emp-name'>
							<strong>{abbreviatedname}</strong>
						</h6>

						<h6 className='emp-role'>
							{manager.is_lead ? 'Team Lead' : 'Manager'}
						</h6>

						<EmpPhoneNumber header={true} phone={manager.phone} />
					</div>
				</div>
			</div>

			<Modal
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={show}
				onHide={() => {
					handleClose();
					setTimeout(() => {
						showDeleteConfirm(false);
						setEditing(false);
					}, 300);
				}}>
				<div className='emp-card-modal-container'>
					<HiXMark className=' exit-button' onClick={() => handleClose()} />

					<div className='emp-card-header-modal'>
						<div className='emp-picture'>
							{manager.picture ? (
								<img src={manager.picture} alt='' />
							) : (
								<FaUser className='emp-picture-icon' />
							)}
						</div>

						<div className='emp-info-header'>
							<h6 className='emp-name'>
								<strong>{manager.name}</strong>
							</h6>

							<h6 className='emp-role'>
								{manager.is_lead ? 'Team Lead' : 'Manager'}
							</h6>
						</div>
					</div>

					<div className='emp-contact-info'>
						{editing ? (
							<>
								<form className='card-edit' onSubmit={handleEditSubmit}>
									<p>
										<strong>Salary:</strong> $
										<input
											type='text'
											className='card-input salary-input'
											name='mngrSalary'
											value={formState.mngrSalary}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Phone:</strong>
										<input
											type='text'
											className='card-input number-input'
											id='number-input1'
											name='phone1'
											maxLength={3}
											value={formState.phone1}
											onChange={handleChange}
										/>
										-
										<input
											type='text'
											className='card-input number-input'
											id='number-input2'
											name='phone2'
											maxLength={3}
											value={formState.phone2}
											onChange={handleChange}
										/>
										-
										<input
											type='text'
											className='card-input number-input'
											id='number-input3'
											name='phone3'
											maxLength={4}
											value={formState.phone3}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Email:</strong>
										<input
											type='text'
											className='card-input email-input'
											name='mngrEmail'
											value={formState.mngrEmail}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Time:</strong>
										<select
											className='card-input timezone-input'
											name='mngrTimezone'
											defaultValue={'default'}
											onChange={handleChange}>
											<option value='default' disabled>
												Select timezone...
											</option>
											{timezones.map((time) => (
												<option value={time}>
													<p>UTC -{time}:00</p>
												</option>
											))}
										</select>
									</p>

									<div className='emp-card-button-container'>
										<button
											className='edit-button'
											onClick={() => setEditing(!editing)}>
											Cancel
										</button>

										<button className='submit-button' type='submit'>
											Submit
										</button>
									</div>
								</form>
							</>
						) : (
							<>
								<EmpSalary salary={manager.salary} />
								<EmpPhoneNumber header={false} phone={manager.phone} />
								<EmpEmail email={manager.email} />
								<EmpTimeZone timezone={manager.timezone} />
								<div className='emp-card-button-container'>
									<button
										className='edit-button'
										onClick={() => setEditing(!editing)}>
										Edit
									</button>

									<button
										className={
											deleteConfirm ? 'delete-button confirm' : 'delete-button'
										}
										onClick={
											deleteConfirm
												? () => deleteEmployee(manager)
												: () => showDeleteConfirm(true)
										}>
										{deleteConfirm ? 'Are you sure?' : 'Delete'}
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

export function EmpCard({
	employee,
	managers,
	roles,
}: {
	employee: Employee;
	managers?: Manager[];
	roles?: Role[];
}) {
	const navigate = useNavigate();
	const { abbreviateName } = useFormat();
	const abbreviatedname = abbreviateName(employee.name);
	const [show, setShow] = useState<boolean>(false);
	const [deleteConfirm, showDeleteConfirm] = useState<boolean>(false);
	const [editing, setEditing] = useState<boolean>(false);
	const [currentEmpData, setCurrentEmpData] = useState<CurrentEmpData | null>();
	const [formState, setFormState] = useState({
		phone1: employee.phone ? employee.phone.slice(0, 3) : '',
		phone2: employee.phone ? employee.phone.slice(3, 6) : '',
		phone3: employee.phone ? employee.phone.slice(6, 10) : '',
		empEmail: employee.email ? employee.email : '',
		empRole: '',
		empSalary: '',
		empManager: '',
	});

	const handleClose = () => {
		setShow(false);
		showDeleteConfirm(false);
		setEditing(false);
	};

	const handleShow = () => {
		setShow(true);
	};

	const handleChange = (event: any) => {
		const { name, value, maxLength } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});

		if (maxLength === 3) {
			if (value.length >= maxLength) {
				event.target.nextElementSibling.focus();
			}
		}
	};

	const handleEditSubmit = async (event: any) => {
		event.preventDefault();

		let payload: EmpCardEditPayload = {
			role_id: currentEmpData?.role.id,
			salary: currentEmpData?.salary
				? currentEmpData.salary
				: currentEmpData?.role.salary,
			phone: currentEmpData?.phone,
			email: currentEmpData?.email,
			manager_id: currentEmpData?.manager.id,
		};
		let phonenumbers = [
			formState.phone1.trim().toString(),
			formState.phone2.trim().toString(),
			formState.phone3.trim().toString(),
		];

		// Check if role has changed
		if (formState.empRole !== currentEmpData?.role.title) {
			// Find new role's ID and assign it to payload
			let newEmpRole = roles?.filter(
				(role) => role.title === formState.empRole
			);

			payload!.role_id = newEmpRole![0].id;
		}

		// Check if salary has changed and is not the same as employee's role salary, and if so, assign salary to payload
		if (
			parseInt(formState.empSalary) !== currentEmpData?.role.salary ||
			parseInt(formState.empSalary) !== currentEmpData?.salary
		) {
			payload!.salary = parseInt(formState.empSalary);
		}

		// Check if phone number has changed
		if (
			`${phonenumbers[0]}${phonenumbers[1]}${phonenumbers[2]}` !==
			currentEmpData?.phone
		) {
			// Check to make sure phone number length is valid
			if (
				phonenumbers[0].length === 3 &&
				phonenumbers[1].length === 3 &&
				phonenumbers[2].length === 4
			) {
				payload!.phone = `${phonenumbers[0]}${phonenumbers[1]}${phonenumbers[2]}`;
			} else {
				window.alert('Invalid phone number!');
				return;
			}
		}

		// Check if email has changed
		if (formState.empEmail && formState.empEmail !== currentEmpData?.email) {
			let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

			// Ensure email is formatted correctly and add to payload
			if (formState.empEmail.match(emailFormat)) {
				payload!.email = formState.empEmail;
			} else {
				window.alert('Invalid email!');
				return;
			}
		}

		// Check if manager has changed
		if (formState.empManager !== currentEmpData?.manager.name) {
			// Find new manager's ID and assign it to payload
			let newManagerID = managers!.filter(
				(manager) => manager.name === formState.empManager
			);

			payload!.manager_id = newManagerID[0].id;
		}

		await axios
			.put(`/api/employees/${employee.id}`, {
				role_id: payload.role_id,
				salary: payload.salary,
				phone: payload.phone,
				email: payload.email,
				manager_id: payload.manager_id,
			})
			.then(() => {
				window.alert(`Employee successfully updated!`);

				navigate(0);
			})
			.catch((err) => console.log(`Failed to update updated: ${err}`));

		setEditing(!editing);
	};

	const deleteEmployee = (employee: Employee) => {
		if (employee.role!.title === 'manager') {
			let index = parseInt(employee.id!) - 1;
			delete managers![index];
		}
	};

	useEffect(() => {
		const handleSetCurrentData = () => {
			if (roles) {
				const roleData = roles.filter((role) => role.id === employee.role_id);
				const managerData = managers!.filter(
					(manager) => manager.id === employee.manager_id
				);

				setCurrentEmpData({
					role: roleData[0],
					salary: employee.salary ? employee.salary : roleData[0].salary,
					phone: employee.phone ? employee.phone : undefined,
					email: employee.email ? employee.email : undefined,
					manager: managerData[0],
				});

				setFormState({
					...formState,
					empRole: roleData[0].title,
					empSalary: employee.salary
						? employee.salary.toString()
						: roleData[0].salary.toString(),
					empManager: managerData[0].name,
				});
			}
		};

		handleSetCurrentData();
	}, []);

	return (
		<>
			<div className='emp-card' onClick={handleShow}>
				<div className='emp-card-header'>
					<div className='emp-picture'>
						{employee.picture ? (
							<img src={employee.picture} alt='' />
						) : (
							<FaUser className='emp-picture-icon' />
						)}
					</div>

					<div className='emp-info-header'>
						<h6 className='emp-name'>
							<strong>{abbreviatedname}</strong>
						</h6>

						<h6 className='emp-role'>{currentEmpData?.role.title}</h6>
					</div>
				</div>
			</div>

			<Modal
				aria-labelledby='contained-modal-title-vcenter'
				centered
				show={show}
				onHide={() => {
					handleClose();
					setTimeout(() => {
						showDeleteConfirm(false);
						setEditing(false);
					}, 300);
				}}>
				<div className='emp-card-modal-container'>
					<HiXMark className='exit-button' onClick={() => handleClose()} />

					<div className='emp-card-header-modal'>
						<div className='emp-picture'>
							{employee.picture ? (
								<img src={employee.picture} alt='' />
							) : (
								<FaUser className='emp-picture-icon' />
							)}
						</div>

						<div className='emp-info-header'>
							<h6 className='emp-name'>
								<strong>{employee.name}</strong>
							</h6>
						</div>
					</div>

					<div className='emp-contact-info'>
						{editing ? (
							<>
								<form className='card-edit' onSubmit={handleEditSubmit}>
									<p>
										<strong>Role:</strong>
										<select
											className='card-role-select'
											name='empRole'
											value={formState.empRole}
											onChange={handleChange}>
											{roles!.map((role) => (
												<option key={uuidv4()} value={role.id}>
													{role.title}
												</option>
											))}
										</select>
									</p>

									<p>
										<strong>Salary:</strong> $
										<input
											className='card-input'
											type='text'
											name='empSalary'
											value={formState.empSalary}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Phone:</strong>
										<input
											className='card-input number-input'
											type='text'
											id='number-input1'
											name='phone1'
											maxLength={3}
											value={formState.phone1}
											onChange={handleChange}
										/>
										-
										<input
											className='card-input number-input'
											type='text'
											id='number-input2'
											name='phone2'
											maxLength={3}
											value={formState.phone2}
											onChange={handleChange}
										/>
										-
										<input
											className='card-input number-input'
											type='text'
											id='number-input3'
											name='phone3'
											maxLength={4}
											value={formState.phone3}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Email:</strong>
										<input
											className='card-input'
											type='text'
											name='empEmail'
											value={formState.empEmail}
											onChange={handleChange}
										/>
									</p>

									<p>
										<strong>Manager:</strong>
										<select
											className='card-manager-select'
											name='empManager'
											value={formState.empManager}
											onChange={handleChange}>
											{managers!.map((manager) => (
												<option key={uuidv4()} value={manager.id}>
													{manager.name}
												</option>
											))}
										</select>
									</p>

									<div className='emp-card-button-container'>
										<button
											className='edit-button'
											onClick={() => setEditing(!editing)}>
											Cancel
										</button>
										<button className='submit-button' type='submit'>
											Submit
										</button>
									</div>
								</form>
							</>
						) : (
							<>
								<EmpRole role={currentEmpData && currentEmpData!.role.title} />
								<EmpSalary salary={currentEmpData && currentEmpData!.salary} />
								<EmpPhoneNumber
									phone={currentEmpData && currentEmpData!.phone}
								/>
								<EmpEmail email={currentEmpData && currentEmpData!.email} />
								<EmpMngr
									manager={currentEmpData && currentEmpData!.manager.name}
								/>
								<div className='emp-card-button-container'>
									<button
										className='edit-button'
										onClick={() => setEditing(!editing)}>
										Edit
									</button>

									<button
										className={
											deleteConfirm ? 'delete-button confirm' : 'delete-button'
										}
										onClick={
											deleteConfirm
												? () => deleteEmployee(employee)
												: () => showDeleteConfirm(true)
										}>
										{deleteConfirm ? 'Are you sure?' : 'Delete'}
									</button>
								</div>
							</>
						)}
					</div>
				</div>
			</Modal>
		</>
	);
}

export function PreviewCard({ employee }: { employee: Employee | Manager }) {
	const { abbreviateName } = useFormat();

	return (
		<div className='preview-card'>
			<h6 className='emp-name'>
				<strong>{abbreviateName(employee.name)}</strong>
			</h6>
			<p className='emp-role'>{employee.role_title}</p>
		</div>
	);
}
