// ============= LoginScreen.js =============
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/AuthStyles';

import { getErrorMessage } from '../utils/errorHandler';
import { useToast } from '../context/ToastContext';

// // Use like:
// <View style={authStyles.container}></View>

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const { showError, showSuccess } = useToast();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      showError('Missing fields', 'Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Invalid email', 'Please enter a valid email address.');
      return;
    }

    try {
      await signIn(email.trim(), password);
      showSuccess('Welcome back!', 'You have logged in successfully.');
    } catch (err) {
      console.log('Login error:', err);
      const msg = getErrorMessage(err, 'Login failed. Please try again.');
      showError('Login failed', msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <Button title="Login" onPress={handleLogin} />
      
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.linkText}>
          Don't have an account? Sign Up
        </Text>
        
      </TouchableOpacity>
    </View>
  );
}