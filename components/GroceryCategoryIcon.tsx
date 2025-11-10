'use client';

import { 
  Apple, 
  Carrot, 
  Milk, 
  Fish, 
  Beef, 
  ShoppingCart, 
  Cookie,
  Coffee,
  Wine,
  UtensilsCrossed,
  Package
} from 'lucide-react';

interface GroceryCategoryIconProps {
  category: string;
  size?: number;
  className?: string;
}

const categoryIcons: Record<string, any> = {
  'Fruits': Apple,
  'Vegetables': Carrot,
  'Dairy': Milk,
  'Meat': Beef,
  'Seafood': Fish,
  'Bakery': Cookie,
  'Beverages': Coffee,
  'Alcohol': Wine,
  'Pantry': Package,
  'Other': ShoppingCart,
};

export default function GroceryCategoryIcon({ 
  category, 
  size = 24, 
  className = '' 
}: GroceryCategoryIconProps) {
  const Icon = categoryIcons[category] || ShoppingCart;
  const colors: Record<string, string> = {
    'Fruits': '#f778ba',
    'Vegetables': '#4ade80',
    'Dairy': '#ffe5a4',
    'Meat': '#ef4444',
    'Seafood': '#3b82f6',
    'Bakery': '#f59e0b',
    'Beverages': '#5f33e1',
    'Alcohol': '#8b5cf6',
    'Pantry': '#6b7280',
    'Other': '#9ca3af',
  };

  return (
    <div 
      className={`rounded-full p-2 flex items-center justify-center ${className}`}
      style={{ backgroundColor: `${colors[category] || '#9ca3af'}20` }}
    >
      <Icon 
        size={size} 
        style={{ color: colors[category] || '#9ca3af' }}
      />
    </div>
  );
}

