import React, { useState, useEffect } from 'react';
import { AiOutlineCaretDown } from 'react-icons/ai';
import { BsExclamationLg } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import { HiXMark } from 'react-icons/hi2';
import { v4 as uuidv4 } from 'uuid';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import useFormat from '../../hooks/useFormat';

type EmpCardData = {
	manager: Manager;
	role: Role;
};

function EmpPhoneNumber(props: {
	header?: boolean;
	number1: string;
	number2: string;
	number3: string;
}) {
	return (
		<p>
			{props.header ? (
				<></>
			) : (
				<>
					<strong>Phone:</strong>
				</>
			)}
			{props.number1 === '' ? (
				<>
					{props.header ? (
						<span className='phone-missing'>
							<BsExclamationLg className='alert-icon' /> Phone # missing
						</span>
					) : (
						<>No # found</>
					)}
				</>
			) : (
				<>{`(${props.number1}) ${props.number2}-${props.number3}`}</>
			)}
		</p>
	);
}

function EmpEmail(props: { email?: string }) {
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

function EmpRole(props: { role?: string }) {
	return (
		<p>
			<strong>Role:</strong> {props.role ? props.role : 'No role found'}
		</p>
	);
}

function EmpMngr(props: { manager: string }) {
	return (
		<p>
			<strong>Manager:</strong>{' '}
			{props.manager ? props.manager : 'No manager found'}
		</p>
	);
}

function EmpSalary(props: { salary?: number }) {
	return (
		<p>
			<strong>Salary:</strong> $
			{props.salary ? props.salary : 'No salary found'}
		</p>
	);
}

export function MngrCard(props: { manager: Manager }) {
	const { id, name, picture, is_lead, phone, email, timezone, salary } =
		props.manager;
	const { abbreviateName } = useFormat();
	const abbreviatedname = abbreviateName(name);
	const [show, setShow] = useState(false);
	const [deleteConfirm, showDeleteConfirm] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(false);
	const [phoneNumber, setPhoneNumber] = useState({
		groupOne: phone ? phone.slice(0, 3) : '',
		groupTwo: phone ? phone.slice(3, 6) : '',
		groupThree: phone ? phone.slice(6, 10) : '',
	});
	const [formState, setFormState] = useState({
		mngrSalary: salary,
		phone1: phoneNumber.groupOne,
		phone2: phoneNumber.groupTwo,
		phone3: phoneNumber.groupThree,
		mngrEmail: email ? email : '',
		mngrTimezone: timezone ? timezone : '',
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
	const handleShow = () => setShow(true);

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

		const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		const { mngrSalary, mngrEmail, mngrTimezone } = formState;
		const phonenumbers = [
			formState.phone1.trim(),
			formState.phone2.trim(),
			formState.phone3.trim(),
		];

		if (mngrEmail.match(emailFormat)) {
			if (
				phonenumbers[0].length === 3 &&
				phonenumbers[1].length === 3 &&
				phonenumbers[2].length === 4
			) {
				await axios
					.put(`/api/managers/${id}`, {
						salary: mngrSalary,
						phone: phonenumbers[0] + phonenumbers[1] + phonenumbers[2],
						email: mngrEmail,
						timezone: mngrTimezone,
					})
					.then((res) => {
						console.log(`Manager updated: ${res}`);

						setPhoneNumber({
							groupOne: phonenumbers[0],
							groupTwo: phonenumbers[1],
							groupThree: phonenumbers[2],
						});
					})
					.catch((err) => console.log(`Failed to update manager: ${err}`));
			} else {
				alert('Invalid phone number!');
			}
		} else {
			alert('Invalid email!');
		}

		setEditing(!editing);
	};

	const deleteEmployee = (employee: any) => {
		if (employee.role === 'manager') {
			let index = employee.id - 1;
			// delete props.manager[index];
		}
	};

	return (
		<>
			{loading ? (
				<></>
			) : (
				<>
					<div className='emp-card' onClick={handleShow}>
						<div className='emp-card-header'>
							<div className='emp-picture'>
								{picture ? (
									<img src={picture} alt='' />
								) : (
									<FaUser className='emp-picture-icon' />
								)}
							</div>

							<div className='emp-info-header'>
								<h6 className='emp-name'>
									<strong>{abbreviatedname}</strong>
								</h6>

								<h6 className='emp-role'>
									{is_lead ? 'Team Lead' : 'Manager'}
								</h6>

								<EmpPhoneNumber
									header={true}
									number1={phoneNumber.groupOne}
									number2={phoneNumber.groupTwo}
									number3={phoneNumber.groupThree}
								/>
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
									{picture ? (
										<img src={picture} alt='' />
									) : (
										<FaUser className='emp-picture-icon' />
									)}
								</div>

								<div className='emp-info-header'>
									<h6 className='emp-name'>
										<strong>{name}</strong>
									</h6>

									<h6 className='emp-role'>
										{is_lead ? 'Team Lead' : 'Manager'}
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
										<EmpSalary salary={salary} />
										<EmpPhoneNumber
											header={false}
											number1={phoneNumber.groupOne}
											number2={phoneNumber.groupTwo}
											number3={phoneNumber.groupThree}
										/>
										<EmpEmail email={email} />
										<EmpTimeZone timezone={timezone} />
										<div className='emp-card-button-container'>
											<button
												className='edit-button'
												onClick={() => setEditing(!editing)}>
												Edit
											</button>

											<button
												className={
													deleteConfirm
														? 'delete-button confirm'
														: 'delete-button'
												}
												onClick={
													deleteConfirm
														? () => deleteEmployee(props)
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
			)}
		</>
	);
}

export function EmpCard(props: {
	employee: Employee;
	managers?: Manager[];
	roles?: Role[];
}) {
	const { id, name, picture, role_id, phone, email, manager_id } =
		props.employee;
	const { abbreviateName } = useFormat();
	const abbreviatedname = abbreviateName(name);
	const [data, setData] = useState<EmpCardData>();
	const [show, setShow] = useState(false);
	const [deleteConfirm, showDeleteConfirm] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(true);
	const [phoneNumber, setPhoneNumber] = useState({
		groupOne: phone ? phone.slice(0, 3) : '',
		groupTwo: phone ? phone.slice(3, 6) : '',
		groupThree: phone ? phone.slice(6, 10) : '',
	});
	const [formState, setFormState] = useState({
		phone1: phoneNumber.groupOne,
		phone2: phoneNumber.groupTwo,
		phone3: phoneNumber.groupThree,
		empEmail: email ? email : '',
		empRole: '',
		empSalary: '',
		empManager: '',
	});

	const handleClose = () => {
		setShow(false);
		showDeleteConfirm(false);
		setEditing(false);
	};

	const handleShow = () => setShow(true);

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

		const { empRole, empSalary, empEmail, empManager } = formState;
		const phonenumbers = [
			formState.phone1.trim(),
			formState.phone2.trim(),
			formState.phone3.trim(),
		];

		await axios
			.put(`/api/employees/${id}`, {
				role: empRole !== data!.role.title ? empRole : role_id,
				salary: parseInt(empSalary) !== data!.role.salary ? empSalary : null,
				phone:
					phonenumbers[0].length === 3 &&
					phonenumbers[1].length === 3 &&
					phonenumbers[2].length === 4
						? phonenumbers[0] + phonenumbers[1] + phonenumbers[2]
						: null,
				email: empEmail ? empEmail : null,
				manager_id: empManager,
			})
			.then((res) => {
				window.alert(`Employee updated: ${{ res }}`);

				setPhoneNumber({
					groupOne: phonenumbers[0],
					groupTwo: phonenumbers[1],
					groupThree: phonenumbers[2],
				});
			})
			.catch((err) => console.log(`Failed to update updated: ${err}`));

		setEditing(!editing);
	};

	const deleteEmployee = (employee: Employee) => {
		if (employee.role!.title === 'manager') {
			let index = parseInt(employee.id!) - 1;
			delete props.managers![index];
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const mngrReq = axios.get(`/api/managers/${manager_id}`);
			const roleReq = axios.get(`/api/roles/${role_id}`);

			await axios
				.all([mngrReq, roleReq])
				.then(
					axios.spread((...res) => {
						setData({
							manager: res[0].data,
							role: res[1].data,
						});

						setFormState((formState) => ({
							...formState,
							empRole: res[1].data,
							empSalary: JSON.stringify(res[1].data.salary),
							empManager: res[0].data.name,
						}));
					})
				)
				.finally(() => setLoading(!loading))
				.catch((err) => alert(err));
		};

		fetchData().catch((err) => alert(err));
	}, [phoneNumber]);

	return (
		<>
			{loading ? (
				<></>
			) : (
				<>
					<div className='emp-card' onClick={handleShow}>
						<div className='emp-card-header'>
							<div className='emp-picture'>
								{picture ? (
									<img src={picture} alt='' />
								) : (
									<FaUser className='emp-picture-icon' />
								)}
							</div>

							<div className='emp-info-header'>
								<h6 className='emp-name'>
									<strong>{abbreviatedname}</strong>
								</h6>

								<h6 className='emp-role'>{data!.role.title}</h6>
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
									{picture ? (
										<img src={picture} alt='' />
									) : (
										<FaUser className='emp-picture-icon' />
									)}
								</div>

								<div className='emp-info-header'>
									<h6 className='emp-name'>
										<strong>{name}</strong>
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
													{props.roles!.map((role) => (
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
													{props.managers!.map((manager) => (
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
										<EmpRole role={data!.role.title} />
										<EmpSalary
											salary={
												props.employee.salary
													? props.employee.salary
													: data!.role.salary
											}
										/>
										<EmpPhoneNumber
											number1={phoneNumber.groupOne}
											number2={phoneNumber.groupTwo}
											number3={phoneNumber.groupThree}
										/>
										<EmpEmail email={email!} />
										<EmpMngr manager={data!.manager.name} />
										<div className='emp-card-button-container'>
											<button
												className='edit-button'
												onClick={() => setEditing(!editing)}>
												Edit
											</button>

											<button
												className={
													deleteConfirm
														? 'delete-button confirm'
														: 'delete-button'
												}
												onClick={
													deleteConfirm
														? () => deleteEmployee(props.employee)
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
			)}
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
