import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaGlobeAmericas } from 'react-icons/fa';
import TeamCard from '../../../../components/cards/TeamCard';

export default function Teams(props) {
	const { teamData } = props;

	return (
		<div className='profile-teams'>
			<h2>
				<FaGlobeAmericas className='globe-icon card-icon' />
				Your Teams
			</h2>
			<div className='card-body'>
				<div className='profile-teams-key'>
					<h6 id='profile-name'>Team Name & Lead</h6>
					<h6 id='profile-managers'>Mngr. #</h6>
					<h6 id='profile-employees'>Emp. #</h6>
					<h6 id='profile-delete'>Delete</h6>
				</div>
				<div className='profile-teams-container'>
					{teamData.map((team) => (
						<TeamCard key={uuidv4()} team={team} />
					))}
				</div>
			</div>
		</div>
	);
}
