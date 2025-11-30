import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';

// Auto-detect the correct base URL based on platform and environment
const getBaseURL = () => {
  // Web
  if (Platform.OS === 'web') {
    return 'http://localhost:8000';
  }

  // Android emulator (dev)
  if (Platform.OS === 'android') {
    return 'http://10.0.2.2:8000';
  }

  // iOS simulator or physical devices
  return 'http://192.168.216.148:8000';
};

const BASE_URL = getBaseURL();

console.log('API Base URL:', BASE_URL, '| Platform:', Platform.OS);

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  async (config) => {
    try {
      //  IMPORTANT: use the SAME key as in AuthContext
      const token = await AsyncStorage.getItem('userToken');
      console.log('TOKEN IN INTERCEPTOR =>', token); // DEBUG
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token:', error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Error logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.log('API Error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('Network Error: No response from server');
      console.log('Check if backend is running at:', BASE_URL);
    } else {
      console.log('Request Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default api;