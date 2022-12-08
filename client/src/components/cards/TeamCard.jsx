import React, { useState } from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FaUserAlt, FaTimes, FaCheck } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import useQuery from '../../hooks/useQuery';
import '../../assets/style/teamcard.css';

export default function TeamCard(props) {
	const navigate = useNavigate();
	const { deleteTeam } = useQuery();
	const [deleteConfirm, setDeleteConfirm] = useState(false);
	const filteredList = props.team.managers.filter((manager) => manager.is_lead);
	const { id, name, managers, employees } = props.team;
	const lead = filteredList[0];
	const styles = {
		style1: {
			opacity: '0',
			pointerEvents: 'none',
		},
		style2: {
			opacity: '1',
			pointerEvents: 'all',
		},
	};

	const handleDeleteTeam = () => {
		try {
			deleteTeam(id);

			window.alert('Team successfully deleted!');
		} catch (err) {
			window.alert(`Failed to delete team! Error: ${err}`);
		} finally {
			navigate(0);
		}
	};

	const handleSelectTeam = () => {
		localStorage.setItem('teamID', id);
		navigate('/');
	};

	return (
		<>
			<div className='team-card-container'>
				<div className='team-card-header' onClick={() => handleSelectTeam()}>
					<h6>Team ID: {id}</h6>
					<div className='team-header-text'>
						<h3 className='tc-header-name'>
							<strong>{name}</strong>
						</h3>
						<p className='tc-header-manager'>
							<AiOutlineRight className='right-caret' />
							Team led by <strong>{lead.name}</strong>
						</p>
					</div>
				</div>
				<div className='tc-managers' onClick={() => handleSelectTeam()}>
					<div className='tc-count manager-count'>{managers.length}</div>
					<div className='tc-icon-container '>
						{managers.map((manager) => (
							<>
								<FaUserAlt key={uuidv4()} className='tc-manager-icon' />
							</>
						))}
					</div>
				</div>
				<div className='tc-employees' onClick={() => handleSelectTeam()}>
					<div className='tc-count'>{props.team.employees.length}</div>
					<div className='tc-icon-container'>
						{employees.map((employee) => (
							<>
								<FaUserAlt key={uuidv4()} className='tc-employee-icon' />
							</>
						))}
					</div>
				</div>
				<div className={deleteConfirm ? 'tc-delete no-hover' : 'tc-delete'}>
					<div
						onClick={() => setDeleteConfirm(true)}
						style={deleteConfirm ? styles.style1 : styles.style2}
						className='tc-delete-icon-container'>
						<TiDelete className='tc-delete-icon' />
					</div>
					<div
						style={deleteConfirm ? styles.style2 : styles.style1}
						className='tc-delete-confirm-container'>
						<span className='tc-delete-confirm'>Are you sure?</span>
						<div className='tc-delete-button-container'>
							<FaCheck
								className='tc-delete-confirm-button'
								onClick={() => handleDeleteTeam()}
							/>
							<FaTimes
								className='tc-delete-confirm-button'
								onClick={() => setDeleteConfirm(false)}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
