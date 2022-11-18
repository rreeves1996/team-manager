import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import '../../assets/style/teamcard.css';

export default function TeamCard(props) {
	const navigate = useNavigate();
	const filteredList = props.team.managers.filter((manager) => manager.is_lead);
	const { id, name, managers, employees } = props.team;
	const lead = filteredList[0];

	return (
		<>
			<div
				className='team-card-container'
				onClick={() => {
					localStorage.setItem('teamID', id);
					navigate('/');
				}}>
				<div className='team-card-header'>
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
				<div className='tc-managers'>
					<div className='tc-count'>{managers.length}</div>
					<div className='tc-icon-container'>
						{managers.map((manager) => (
							<>
								<FaUserAlt key={uuidv4()} className='tc-manager-icon' />
							</>
						))}
					</div>
				</div>
				<div className='tc-employees'>
					<div className='tc-count'>{props.team.employees.length}</div>
					<div className='tc-icon-container'>
						{employees.map((employee) => (
							<>
								<FaUserAlt key={uuidv4()} className='tc-employee-icon' />
							</>
						))}
					</div>
				</div>
				<div className='tc-delete'>
					<TiDelete className='tc-delete-icon' />
				</div>
			</div>
		</>
	);
}
