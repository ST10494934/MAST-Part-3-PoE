// src/screens/MenuDisplayScreen.tsx
import React, { useState } from 'react'; 
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
  const [filter, setFilter] = useState<'All' | 'Starter' | 'Main' | 'Dessert'>('All'); 

  const categories: ('Starter' | 'Main' | 'Dessert')[] = ['Starter', 'Main', 'Dessert'];

  // Apply filter
  const filteredMenu = filter === 'All' 
    ? menu 
    : menu.filter(item => item.category === filter);

  const getItemsByCategory = (cat: 'Starter' | 'Main' | 'Dessert') =>
    filteredMenu.filter(item => item.category === cat);

  // Calculate average for a category
  const getAvg = (cat: 'Starter' | 'Main' | 'Dessert') => {
    const avg = getAveragePriceForLoop(filteredMenu, cat); 
    return avg === 0 ? '—' : `R${avg.toFixed(2)}`;
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.backText}>Back to Home</Text>
      </TouchableOpacity>

      <View style={styles.filterContainer}>
        {['All', 'Starter', 'Main', 'Dessert'].map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.filterBtn, filter === cat ? styles.filterSelected : null]}
            onPress={() => setFilter(cat as any)}
          >
            <Text style={[styles.filterText, filter === cat ? styles.filterTextSelected : null]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.total}>Total Menu Items: {filteredMenu.length}</Text>

      {categories.map(cat => {
        const items = getItemsByCategory(cat);
        if (items.length === 0) return null;
        return (
          <View key={cat} style={styles.categorySection}>
            {/* Inline average next to title */}
            <View style={styles.headerRow}>
              <Text style={styles.categoryTitle}>{cat}s</Text>
              <Text style={styles.avgInline}>Avg: {getAvg(cat)}</Text>
            </View>
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
  total: { color: '#FFD700', fontSize: 20, fontWeight: '700', marginBottom: 20, textAlign: 'center' },
  categorySection: { marginBottom: 24 },
  // Added flex row for title and average
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: { color: '#FFD700', fontSize: 24, fontWeight: '700' },
  avgInline: { color: '#FFD700', fontSize: 18, fontWeight: '600' },
  itemCard: { backgroundColor: '#333', padding: 16, borderRadius: 12, marginBottom: 12 },
  itemName: { color: '#fff', fontSize: 20, fontWeight: '700', marginBottom: 4 },
  itemDesc: { color: '#ccc', fontSize: 16, marginBottom: 4 },
  itemPrice: { color: '#FFD700', fontSize: 18, fontWeight: '700' },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD700',
    marginHorizontal: 4,
    marginBottom: 8,
  },
  filterSelected: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    color: '#FFD700',
    fontWeight: '600',
  },
  filterTextSelected: {
    color: '#1a1a1a',
  },
});