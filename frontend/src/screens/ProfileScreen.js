import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import api from '../api/client';
import { AuthContext } from '../context/AuthContext';
import { profileStyles as styles } from '../styles/ProfileStyles';

export default function ProfileScreen() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { signOut } = useContext(AuthContext);

  useEffect(() => {
    api.get('/me')
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load profile:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      
      {profile && (
        <View style={styles.profileCard}>
          <View style={styles.profileSection}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{profile.email}</Text>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.profileSection}>
            <Text style={styles.label}>User ID</Text>
            <Text style={styles.value}>{profile.id}</Text>
          </View>
          
          {profile.username && (
            <>
              <View style={styles.divider} />
              <View style={styles.profileSection}>
                <Text style={styles.label}>Username</Text>
                <Text style={styles.value}>{profile.username}</Text>
              </View>
            </>
          )}
        </View>
      )}
      
      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}