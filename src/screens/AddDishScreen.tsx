// src/screens/AddDishScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList, MenuItem } from '../types';
import { useMenu } from '../context/MenuContext';
import { v4 as uuidv4 } from 'uuid';

type Nav = NativeStackNavigationProp<RootStackParamList, 'AddDish'>;

export default function AddDishScreen() {
  const navigation = useNavigation<Nav>();
  const { addItem } = useMenu();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'Starter' | 'Main' | 'Dessert'>('Starter');
  const [price, setPrice] = useState('');

  const onAddDish = () => {
    if (!name || !description || !price) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const item: MenuItem = {
      id: uuidv4(),
      name,
      description,
      category,
      price,
    };

    addItem(item);
    Alert.alert('Success', 'Menu item added!');
    setName('');
    setDescription('');
    setPrice('');
    setCategory('Starter');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>

      <TextInput
        placeholder="Dish Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Description"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        placeholder="Price"
        style={styles.input}
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Category:</Text>
      <View style={styles.categoryContainer}>
        {['Starter', 'Main', 'Dessert'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryBtn, category === cat ? styles.categorySelected : null]}
            onPress={() => setCategory(cat as 'Starter' | 'Main' | 'Dessert')}
          >
            <Text style={[styles.categoryText, category === cat ? styles.categoryTextSelected : null]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.addBtn} onPress={onAddDish}>
        <Text style={styles.addText}>Add Dish</Text>
      </TouchableOpacity>

      {/* New Button to View Menu */}
      <TouchableOpacity style={styles.viewMenuBtn} onPress={() => navigation.navigate('MenuDisplay')}>
        <Text style={styles.viewMenuText}>View Menu</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Chef')}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#FFD700',
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  label: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  categoryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFD700',
    backgroundColor: '#1c1c1c',
  },
  categorySelected: {
    backgroundColor: '#FFD700',
  },
  categoryText: {
    color: '#FFD700',
    fontWeight: '700',
  },
  categoryTextSelected: {
    color: '#1c1c1c',
  },
  addBtn: {
    backgroundColor: '#FFD700',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  addText: {
    color: '#1a1a1a',
    fontWeight: '700',
    fontSize: 18,
  },
  viewMenuBtn: {
    backgroundColor: '#333',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
  viewMenuText: {
    color: '#FFD700',
    fontWeight: '700',
    fontSize: 16,
  },
  backBtn: {
    marginTop: 10,
    alignItems: 'center',
  },
  backText: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
});
