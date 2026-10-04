import React from 'react';
import { View } from 'react-native';

// NativeWind v4 uses className directly on components
interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'sm' | 'md' | 'lg';
}

export default function Card({ 
  children, 
  variant = 'default', 
  padding = 'md' 
}: CardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return 'bg-ink-900 border border-ink-800 shadow-lg';
      case 'outlined':
        return 'bg-transparent border border-ink-700';
      default:
        return 'bg-ink-900';
    }
  };

  const getPaddingClasses = () => {
    switch (padding) {
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-4';
      case 'lg':
        return 'p-6';
      default:
        return 'p-4';
    }
  };

  const cardClasses = [
    'rounded-2xl',
    getVariantClasses(),
    getPaddingClasses(),
  ].join(' ');

  return (
    <View className={cardClasses}>
      {children}
    </View>
  );
}
