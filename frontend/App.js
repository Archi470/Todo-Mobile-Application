import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from './src/context/AuthContext';
import Routes from './src/navigation/Routes';
import { ToastProvider } from './src/context/ToastContext';

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </AuthProvider>
    </ToastProvider>
  );
}
