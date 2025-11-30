import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../api/client';
import { dashboardStyles as styles } from '../styles/DashboardStyles';

export default function DashboardScreen() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await api.get('/todos');
      setTodos(res.data);
    } catch (err) {
      console.log('Failed to load todos', err);
      Alert.alert('Error', 'Could not load todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) return;
    try {
      const res = await api.post('/todos', { title: title.trim() });
      setTodos(prev => [res.data, ...prev]);
      setTitle('');
    } catch (err) {
      console.log('Add todo failed', err);
      Alert.alert('Error', 'Could not add todo');
    }
  };

  const toggleTodo = async (item) => {
    try {
      const res = await api.patch(`/todos/${item.id}`, {
        completed: !item.completed,
      });
      setTodos(prev =>
        prev.map(t => (t.id === item.id ? res.data : t))
      );
    } catch (err) {
      console.log('Toggle todo failed', err);
      Alert.alert('Error', 'Could not update todo');
    }
  };

  const deleteTodo = async (item) => {
    try {
      await api.delete(`/todos/${item.id}`);
      setTodos(prev => prev.filter(t => t.id !== item.id));
    } catch (err) {
      console.log('Delete todo failed', err);
      Alert.alert('Error', 'Could not delete todo');
    }
  };

  const renderTodo = ({ item }) => (
    <View style={styles.todoItem}>
      <View style={styles.todoTextContainer}>
        <Text
          style={[
            styles.todoTitle,
            item.completed && styles.todoTitleDone,
          ]}
        >
          {item.title}
        </Text>
      </View>
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={[
            styles.actionButton,
            item.completed ? styles.undoButton : styles.doneButton,
          ]}
          onPress={() => toggleTodo(item)}
        >
          <Icon 
            name={item.completed ? "arrow-undo" : "checkmark"} 
            size={18} 
            color="#fff" 
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => deleteTodo(item)}
        >
          <Icon name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>
        No todos yet!{'\n'}Add one above to get started.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Todo"
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          style={styles.todoList}
          data={todos}
          keyExtractor={item => item.id.toString()}
          renderItem={renderTodo}
          ListEmptyComponent={renderEmpty}
        />
      )}
    </View>
  );
}