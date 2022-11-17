import React from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';
import { TiDelete } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import '../../assets/style/teamcard.css';

export default function TeamCard(props) {
	const navigate = useNavigate();

	console.log(props.team);
	return (
		<>
			<div
				className='team-card-container'
				onClick={() => {
					localStorage.setItem('teamID', props.team.id);
					navigate('/');
				}}>
				<div className='team-card-header'>
					<h6>Team ID: {props.team.id}</h6>
					<div className='team-header-text'>
						<h3 className='tc-header-name'>
							<strong>{props.team.name}</strong>
						</h3>
						<p className='tc-header-manager'>
							<AiOutlineRight className='right-caret' />
							Team led by <strong>{props.team.manager.name}</strong>
						</p>
					</div>
				</div>
				<div className='tc-managers'>
					<div className='tc-count'>1</div>
					<div className='tc-icon-container'>
						<FaUserAlt className='tc-manager-icon' />
					</div>
				</div>
				<div className='tc-employees'>
					<div className='tc-count'>{props.team.employees.length}</div>
					<div className='tc-icon-container'>
						{props.team.employees.map((employee) => (
							<>
								<FaUserAlt className='tc-employee-icon' />
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
