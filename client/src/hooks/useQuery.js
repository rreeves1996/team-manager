import React from 'react';
import axios from 'axios';

const API_ROUTE = '/api';

export default function useQuery() {
	async function queryUser(id) {
		try {
			const res = await axios.get(`${API_ROUTE}/users/${id}`);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function queryTeamsByUser(id) {
		try {
			const res = await axios.get(`${API_ROUTE}/teams/user/${id}`);

			return res;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}
	return { queryUser, queryTeamsByUser };
}
