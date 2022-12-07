import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../utils/userSlice';
import axios from 'axios';

const API_ROUTE = '/api/users/';

export default function useAuth() {
	const dispatch = useDispatch();

	async function registerUser(payload) {
		const { username, name, email, password } = payload;

		try {
			const res = await axios.post(API_ROUTE + 'create', {
				username,
				name,
				email,
				password,
			});

			dispatch(login(res.data.user));
			return res.data.token;
		} catch (err) {
			console.log(`Registration failed! Error:\n${err}`);
		}
	}

	async function loginUser(payload) {
		const { email, password } = payload;

		try {
			const res = await axios.post(API_ROUTE + 'login', {
				email,
				password,
			});

			dispatch(login(res.data.user));
			return res.data.token;
		} catch (err) {
			console.log(`Login failed! Error:\n${err}`);
		}
	}

	async function logoutUser() {
		try {
			await axios.post(API_ROUTE + 'logout');

			dispatch(logout());
		} catch (err) {
			console.log(`Logout failed! Error:\n${err}`);
		}
	}

	return { registerUser, loginUser, logoutUser };
}
