import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, StyleSheet } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { styles } from '../styles/AuthStyles';

import { getErrorMessage } from '../utils/errorHandler';
import { useToast } from '../context/ToastContext';

const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp } = useContext(AuthContext);

  const { showError, showSuccess } = useToast();

  const handleSignup = async () => {
    if (!email.trim() || !password.trim()) {
      showError('Missing fields', 'Please enter both email and password.');
      return;
    }

    if (!isValidEmail(email)) {
      showError('Invalid email', 'Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      showError('Weak password', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      await signUp(email.trim(), password);
      showSuccess('Account created', 'Welcome! You are now logged in.');
    } catch (err) {
      console.log('Signup error:', err);
      const msg = getErrorMessage(err, 'Signup failed. Please try again.');
      showError('Signup failed', msg);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Signup</Text>
      
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
      
      <Button title="Create Account" onPress={handleSignup} />
      
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
}