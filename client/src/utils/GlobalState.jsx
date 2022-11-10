import React, { createContext, useContext } from 'react';
import Auth from './auth';
import { useAppReducer } from './reducers';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ value = [], ...props }) => {
  const [state, dispatch] = useAppReducer({
    isLoggedIn: localStorage.getItem('id_token'),
  });

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext };
