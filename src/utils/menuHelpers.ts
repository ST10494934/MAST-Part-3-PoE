// src/utils/menuHelpers.ts
import type { MenuItem } from '../types';
import { menuData } from '../data/menuData';

export function getAveragePriceForLoop(category: 'Starter' | 'Main' | 'Dessert'): number {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].category === category) {
      sum += parseFloat(menuData[i].price);
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}