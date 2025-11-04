// src/screens/MenuDisplayScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useMenu } from '../context/MenuContext';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';
import { getAveragePriceForLoop } from '../utils/menuHelpers';

type Nav = NativeStackNavigationProp<RootStackParamList, 'MenuDisplay'>;

export default function MenuDisplayScreen() {
  const { menu } = useMenu();
  const navigation = useNavigation<Nav>();

  
  const avgStarter = getAveragePriceForLoop('Starter').toFixed(2);
  const avgMain    = getAveragePriceForLoop('Main').toFixed(2);
  const avgDessert = getAveragePriceForLoop('Dessert').toFixed(2);

  const categories: ('Starter' | 'Main' | 'Dessert')[] = ['Starter', 'Main', 'Dessert'];

  const getItemsByCategory = (cat: 'Starter' | 'Main' | 'Dessert') =>
    menu.filter(item => item.category === cat);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.avgBox}>
        <Text style={styles.avgTitle}>Average Price per Course</Text>
        <Text style={styles.avgLine}>Starters: R{avgStarter}</Text>
        <Text style={styles.avgLine}>Mains: R{avgMain}</Text>
        <Text style={styles.avgLine}>Desserts: R{avgDessert}</Text>
      </View>

      <Text style={styles.total}>Total Menu Items: {menu.length}</Text>

      {categories.map(cat => {
        const items = getItemsByCategory(cat);
        if (items.length === 0) return null;
        return (
          <View key={cat} style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{cat}s</Text>
            {items.map(item => (
              <View key={item.id} style={styles.itemCard}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemPrice}>R{item.price}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1a1a1a', padding: 16 },
  backBtn: { marginBottom: 16 },
  backText: { color: '#FFD700', textDecorationLine: 'underline', fontSize: 16 },
  avgBox: { backgroundColor: '#333', padding: 16, borderRadius: 12, marginBottom: 20 },
  avgTitle: { color: '#FFD700', fontSize: 20, fontWeight: '700', marginBottom: 8, textAlign: 'center' },
  avgLine: { color: '#fff', fontSize: 16, textAlign: 'center' },
  total: { color: '#FFD700', fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  categorySection: { marginBottom: 24 },
  categoryTitle: { color: '#FFD700', fontSize: 24, fontWeight: '700', marginBottom: 12 },
  itemCard: { backgroundColor: '#333', padding: 16, borderRadius: 12, marginBottom: 12 },
  itemName: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  itemDesc: { color: '#ccc', fontSize: 16, marginBottom: 4 },
  itemPrice: { color: '#FFD700', fontSize: 18, fontWeight: '700' },
});