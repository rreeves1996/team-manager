import React, { useState, useContext } from 'react';
import { FaUser, FaTimes, FaCheck } from 'react-icons/fa';
import { HiPencilSquare } from 'react-icons/hi2';
import { DataContext } from '.';
import axios from 'axios';

export default function Header({ deleteTeam }) {
	const teamData = useContext(DataContext);
	const [collapsedMenu, toggleCollapseMenu] = useState(true);
	const [editing, setEditing] = useState('none');
	const [formState, setFormState] = useState({
		teamname: teamData.name,
		leadname: teamData.lead.name,
	});

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormState({
			...formState,
			[name]: value,
		});
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
									<button className='header-button'>
										<FaCheck />
									</button>
									<button className='header-button'>
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
								<input
									className='input'
									type='text'
									name='leadname'
									value={formState.leadname}
									onChange={handleChange}
								/>
								<div className='header-button-container'>
									<button className='header-button'>
										<FaCheck />
									</button>
									<button className='header-button'>
										<FaTimes />
									</button>
								</div>
							</>
						) : (
							<strong>{teamData.lead.name}</strong>
						)}
					</h4>
				</div>
				<div className={collapsedMenu ? 'menu-button' : 'menu-button open'}>
					<HiPencilSquare
						className='pencil-icon'
						onClick={() => toggleCollapseMenu(!collapsedMenu)}
					/>
					<ul className={!collapsedMenu ? 'team-menu' : 'team-menu collapse'}>
						<li
							id='edit-name'
							onClick={() => {
								setEditing('team');
								toggleCollapseMenu(true);
							}}>
							Edit team name
						</li>
						<li
							id='edit-manager'
							onClick={() => {
								setEditing('lead');
								toggleCollapseMenu(true);
							}}>
							Edit team lead
						</li>
						<li onClick={() => deleteTeam()} id='delete-team'>
							Delete team
						</li>
					</ul>
				</div>
			</div>
		</header>
	);
}
