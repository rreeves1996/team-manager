import React, { useState, useContext } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaUser, FaTimes, FaCheck } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { DataContext } from '.';
import useQuery from '../../hooks/useQuery';
import { useNavigate } from 'react-router-dom';

export default function Header() {
	const navigate = useNavigate();
	const teamData = useContext(DataContext);
	const { editTeamName, editTeamLead, deleteTeam } = useQuery();
	const [collapse, toggleCollapse] = useState(true);
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const [editing, setEditing] = useState('none');
	const [formState, setFormState] = useState({
		teamname: teamData.name as string,
		leadname: 'default',
	});
	const teamManagers: Manager[] = teamData.managers!.filter(
		(manager: any) => manager.is_lead === false
	);

	const handleChange = (event: any) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
	};

	const handleCancelEditing = () => {
		setEditing('none');
		setFormState({
			teamname: JSON.stringify(teamData.name),
			leadname: 'default',
		});
	};

	const handleEditSubmit = () => {
		const newTeamName = formState.teamname.trim();
		const newLeadName = formState.leadname.trim();

		if (newTeamName !== teamData.name) {
			const payload = {
				name: newTeamName,
				id: teamData.id!.toString(),
			};

			try {
				editTeamName(payload);

				window.alert(`Team name successfully updated!`);
			} catch (err) {
				window.alert(`Failed to update team name! Error: ${err}`);
			} finally {
				navigate(0);
			}
		}

		if (newLeadName !== teamData.lead!.name) {
			const payload = {
				lead_id: teamData.lead!.id.toString(),
				manager_id: newLeadName,
			};

			try {
				editTeamLead(payload);

				window.alert(`Team lead successfully updated!`);
			} catch (err) {
				window.alert(`Failed to update team lead! Error: ${err}`);
			} finally {
				navigate(0);
			}
		}

		setEditing('none');
		setFormState({
			teamname: '',
			leadname: '',
		});
	};

	const handleDeleteTeam = () => {
		try {
			deleteTeam(teamData.id!.toString());

			window.alert('Team successfully deleted!');
		} catch (err) {
			window.alert(`Failed to delete team! Error: ${err}`);
		} finally {
			navigate(0);
		}
	};

	console.log(teamData);
	return (
		<header>
			<div className='row'>
				<div className='header-text'>
					<h1>
						{editing === 'team' ? (
							<>
								<input
									className='input'
									type='text'
									name='teamname'
									maxLength={17}
									value={formState.teamname}
									onChange={handleChange}
								/>
								<div className='header-button-container'>
									<button
										className='header-button'
										onClick={() => handleEditSubmit()}>
										<FaCheck />
									</button>
									<button
										className='header-button'
										onClick={() => handleCancelEditing()}>
										<FaTimes />
									</button>
								</div>
							</>
						) : (
							<>{teamData.name}</>
						)}
					</h1>
					<h4>
						<FaUser className='manager-icon' /> Team Lead:{' '}
						{editing === 'lead' ? (
							<>
								<select
									className='input'
									name='leadname'
									value={formState.leadname}
									onChange={handleChange}
									defaultValue='default'>
									<option value='default' disabled>
										Select new lead...
									</option>
									{teamManagers.map((manager) => (
										<option key={uuidv4()} value={manager.id}>
											{manager.name}
										</option>
									))}
								</select>
								<div className='header-button-container'>
									<button
										className='header-button'
										onClick={() => handleEditSubmit()}>
										<FaCheck />
									</button>
									<button
										className='header-button'
										onClick={() => handleCancelEditing()}>
										<FaTimes />
									</button>
								</div>
							</>
						) : (
							<strong>{teamData.lead!.name}</strong>
						)}
					</h4>
				</div>
				<div className={collapse ? 'menu-button' : 'menu-button open'}>
					<HiPencilSquare
						className='pencil-icon'
						onClick={() => {
							toggleCollapse(!collapse);
							setTimeout(() => {
								setDeleteConfirm(false);
							}, 200);
						}}
					/>
					<ul className={!collapse ? 'team-menu' : 'team-menu collapse'}>
						<li
							id='edit-name'
							onClick={() => {
								setEditing('team');
								toggleCollapse(true);
							}}>
							Edit team name
						</li>
						<li
							id='edit-manager'
							onClick={() => {
								setEditing('lead');
								toggleCollapse(true);
							}}>
							Edit team lead
						</li>
						<li
							onClick={
								deleteConfirm
									? () => handleDeleteTeam()
									: () => setDeleteConfirm(true)
							}
							id='delete-team'>
							{deleteConfirm ? 'Are you sure?' : 'Delete team'}
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
