import React, { createContext, useContext, useState, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null); // { type, title, message }

  const showToast = useCallback((type, title, message) => {
    setToast({ type, title, message });

    // Auto-hide after 3 seconds
    setTimeout(() => {
      setToast(null);
    }, 3000);
  }, []);

  const showSuccess = (title, message) => showToast('success', title, message);
  const showError = (title, message) => showToast('error', title, message);
  const showInfo = (title, message) => showToast('info', title, message);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}

      {toast && (
        <View
          style={[
            styles.toastContainer,
            toast.type === 'success' && styles.toastSuccess,
            toast.type === 'error' && styles.toastError,
            toast.type === 'info' && styles.toastInfo,
          ]}
        >
          <Text style={styles.toastTitle}>{toast.title}</Text>
          {toast.message ? (
            <Text style={styles.toastMessage}>{toast.message}</Text>
          ) : null}
        </View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 40,
    left: 16,
    right: 16,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  toastTitle: {
    color: '#fff',
    fontWeight: '700',
    marginBottom: 2,
  },
  toastMessage: {
    color: '#fff',
    fontSize: 13,
  },
  toastSuccess: {
    backgroundColor: '#4caf50',
  },
  toastError: {
    backgroundColor: '#e53935',
  },
  toastInfo: {
    backgroundColor: '#2196f3',
  },
});
