import React, { createContext } from 'react';

export const UserContext = createContext({
	userData: null,
	setUserData: () => {},
});
