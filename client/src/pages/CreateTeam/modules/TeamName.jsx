import React from 'react';
import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';

export default function TeamName({ handleSetName }) {
	const [formState, setFormState] = useState({
		teamname: '',
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});

		handleSetName(formState.teamname);
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
			</div>
		</div>
	);
}
