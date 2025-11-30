import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/client';

export const AuthContext = createContext();

const initialState = {
  isLoading: true,
  userToken: null,
};

function reducer(state, action) {
  switch (action.type) {
    case 'RESTORE_TOKEN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_IN':
      return { ...state, userToken: action.token, isLoading: false };
    case 'SIGN_OUT':
      return { ...state, userToken: null, isLoading: false };
    default:
      return state;
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const bootstrapAsync = async () => {
      let token = null;
      try {
        token = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log('Failed to load token', e);
      }
      dispatch({ type: 'RESTORE_TOKEN', token });
    };
    bootstrapAsync();
  }, []);

  const authContext = {
    state,
    signIn: async (email, password) => {
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;
      await AsyncStorage.setItem('userToken', token);
      dispatch({ type: 'SIGN_IN', token });
    },
    signUp: async (email, password) => {
      await api.post('/auth/signup', { email, password });
      const res = await api.post('/auth/login', { email, password });
      const token = res.data.access_token;
      await AsyncStorage.setItem('userToken', token);
      dispatch({ type: 'SIGN_IN', token });
    },
    signOut: async () => {
      await AsyncStorage.removeItem('userToken');
      dispatch({ type: 'SIGN_OUT' });
    },
  };

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
}
