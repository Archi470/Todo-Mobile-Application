import React, { useContext } from 'react';
import AuthStack from './AuthStack';
import AppTabs from './AppTabs';
import { AuthContext } from '../context/AuthContext';

export default function Routes() {
  const { state } = useContext(AuthContext);
  if (state.isLoading) return null;
  return state.userToken ? <AppTabs /> : <AuthStack />;
}
