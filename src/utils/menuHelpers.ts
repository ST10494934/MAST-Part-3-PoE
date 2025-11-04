// src/utils/menuHelpers.ts
import type { MenuItem } from '../types';

export function getAveragePriceForLoop(menu: MenuItem[], category: 'Starter' | 'Main' | 'Dessert'): number {
  let sum = 0;
  let count = 0;
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].category === category) {
      sum += parseFloat(menu[i].price);
      count++;
    }
  }
  return count === 0 ? 0 : sum / count;
}