import React, { useState, useEffect } from 'react';
import { BsExclamationLg } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import '../../assets/style/empcard.css';

function EmpPhoneNumber(props) {
	return (
		<>
			<p>
				{props.header ? (
					<></>
				) : (
					<>
						<strong>Phone #:</strong>
					</>
				)}
				{props.number1 === '' ? (
					<>
						{props.header ? (
							<span className='phone-missing'>
								<BsExclamationLg className='alert-icon' /> Phone # missing
							</span>
						) : (
							<>No phone number found</>
						)}
					</>
				) : (
					<>{`(${props.number1}) ${props.number2}-${props.number3}`}</>
				)}
			</p>
		</>
	);
}

function EmpEmail(props) {
	return (
		<>
			<p>
				<strong>Email:</strong> {props.email ? props.email : 'No email found'}
			</p>
		</>
	);
}

function EmpTimeZone(props) {
	return (
		<>
			<p>
				<strong>Time:</strong> UTC -{props.timezone ? props.timezone : '0'}:00
			</p>
		</>
	);
}

function EmpRole(props) {
	return (
		<>
			<p>
				<strong>Role:</strong> {props.title ? props.title : 'No role found'}
			</p>
		</>
	);
}

function EmpSalary(props) {
	return (
		<>
			<p>
				<strong>Salary:</strong> $
				{props.salary ? props.salary : 'No salary found'}
			</p>
		</>
	);
}

// TODO: Split employee and manager cards

export default function EmpCard(props) {
	const [show, setShow] = useState(false);
	const [deleteConfirm, showDeleteConfirm] = useState(false);
	const [editing, setEditing] = useState(false);
	const [loading, setLoading] = useState(true);

	const [employee, setEmployee] = useState(() =>
		props.employee
			? props.employee
			: { ...props.manager, role: { title: 'Manager' } }
	);
	const [phoneNumber, setPhoneNumber] = useState(
		props.manager
			? {
					groupOne: props.manager.phone.slice(0, 3),
					groupTwo: props.manager.phone.slice(3, 6),
					groupThree: props.manager.phone.slice(6, 10),
			  }
			: {
					groupOne: '',
					groupTwo: '',
					groupThree: '',
			  }
	);
	const [formState, setFormState] = useState({
		phone1: phoneNumber.groupOne,
		phone2: phoneNumber.groupTwo,
		phone3: phoneNumber.groupThree,
		email: props.manager && props.manager.email,
		timezone: '',
	});
	console.log(props.manager.phone);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleEditSubmit = async (event) => {
		event.preventDefault();

		const phonenumbers = [
			formState.phone1.trim(),
			formState.phone2.trim(),
			formState.phone3.trim(),
		];

		const email = formState.email.trim();

		if (phonenumbers && email) {
			if (
				phonenumbers[0].length === 3 &&
				phonenumbers[1].length === 3 &&
				phonenumbers[2].length === 4
			) {
				const number = phonenumbers[0] + phonenumbers[1] + phonenumbers[2];

				await axios
					.put(`/api/managers/${employee.id}`, {
						phone: number,
						email: email,
					})
					.then((res) => {
						console.log(`Manager updated: ${res}`);
					})
					.catch((err) => console.log(`Failed to update manager: ${err}`));
			} else {
				alert('Invalid phone number or email');
			}
		}

		setEditing(!editing);
	};

	const deleteEmployee = (employee) => {
		if (employee.role === 'manager') {
			let index = employee.id - 1;
			delete props.managers[index];
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
								{employee.picture ? (
									<>
										<img src={employee.picture} alt='' />
									</>
								) : (
									<>
										<FaUser className='emp-picture-icon' />
									</>
								)}
							</div>
							<div className='emp-info-header'>
								<h6 className='emp-name'>
									<strong>{employee.abbreviatedname}</strong>
								</h6>

								<h6 className='emp-role'>
									{employee.is_lead ? 'Team Lead' : employee.role.title}
								</h6>

								{props.manager ? (
									<>
										<EmpPhoneNumber
											header={true}
											number1={phoneNumber.groupOne}
											number2={phoneNumber.groupTwo}
											number3={phoneNumber.groupThree}
										/>
									</>
								) : (
									<></>
								)}
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
							<i
								className='fa-solid fa-xmark exit-button'
								onClick={() => handleClose()}></i>
							<div className='emp-card-header-modal'>
								<div className='emp-picture'>
									{employee.picture ? (
										<>
											<img src={employee.picture} alt='' />
										</>
									) : (
										<>
											<FaUser className='emp-picture-icon' />
										</>
									)}
								</div>
								<div className='emp-info-header'>
									<h6 className='emp-name'>
										<strong>{employee.name}</strong>
									</h6>
									{props.manager ? (
										<h6 className='emp-role'>
											{props.lead ? 'Team Lead' : employee.role}
										</h6>
									) : (
										<></>
									)}
								</div>
							</div>
							<div className='emp-contact-info'>
								{props.manager ? (
									<>
										{editing ? (
											<>
												<form className='card-edit' onSubmit={handleEditSubmit}>
													<p>
														<strong>Phone #:</strong>
														<input
															type='text'
															className='card-input number-input'
															id='number-input1'
															name='phone1'
															value={formState.phone1}
															onChange={handleChange}
														/>
														-
														<input
															type='text'
															className='card-input number-input'
															id='number-input2'
															name='phone2'
															value={formState.phone2}
															onChange={handleChange}
														/>
														-
														<input
															type='text'
															className='card-input number-input'
															id='number-input3'
															name='phone3'
															value={formState.phone3}
															onChange={handleChange}
														/>
													</p>
													<p>
														<strong>Email:</strong>
														<input
															type='text'
															className='card-input email-input'
															name='email'
															value={formState.email}
															onChange={handleChange}
														/>
													</p>
													<p>
														<strong>Time:</strong>
														<button className='timezone-button'>
															Timezones{' '}
															<i className='fa-solid fa-caret-down'></i>
														</button>
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
												<EmpPhoneNumber
													header={false}
													number1={phoneNumber.groupOne}
													number2={phoneNumber.groupTwo}
													number3={phoneNumber.groupThree}
												/>
												<EmpEmail email={employee.email} />
												<EmpTimeZone timezone={employee.timeZone} />
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
																? deleteEmployee(props)
																: () => showDeleteConfirm(true)
														}>
														{deleteConfirm ? 'Are you sure?' : 'Delete'}
													</button>
												</div>
											</>
										)}
									</>
								) : (
									<>
										{editing ? (
											<>
												<form className='card-edit' onSubmit={handleEditSubmit}>
													<p>
														<strong>Phone #:</strong>
														<input
															type='text'
															className='card-input number-input'
															id='number-input1'
															name='phone1'
															value={formState.phone1}
															onChange={handleChange}
														/>
														-
														<input
															type='text'
															className='card-input number-input'
															id='number-input2'
															name='phone2'
															value={formState.phone2}
															onChange={handleChange}
														/>
														-
														<input
															type='text'
															className='card-input number-input'
															id='number-input3'
															name='phone3'
															value={formState.phone3}
															onChange={handleChange}
														/>
													</p>
													<p>
														<strong>Email:</strong>
														<input
															type='text'
															className='card-input'
															name='email'
															value={formState.email}
															onChange={handleChange}
														/>
													</p>
													<p>
														<strong>Time:</strong>
														<button className='timezone-button'>
															Timezones{' '}
															<i className='fa-solid fa-caret-down'></i>
														</button>
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
												<EmpRole role={employee.role.title} />
												<EmpSalary salary={employee.role.salary} />
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
																? deleteEmployee(props)
																: () => showDeleteConfirm(true)
														}>
														{deleteConfirm ? 'Are you sure?' : 'Delete'}
													</button>
												</div>
											</>
										)}
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
