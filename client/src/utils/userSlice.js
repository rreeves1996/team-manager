import React from 'react';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	isLogged: false,
	data: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action) => {
			state.isLogged = true;
			state.data = action.payload;
		},
		logout: (state) => {
			state.isLogged = false;
			state.data = null;
		},
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
