import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

// NativeWind v4 uses className directly on components
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const { colors } = useTheme();
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-accent active:opacity-80';
      case 'secondary':
        return 'bg-ink-800 active:bg-ink-700';
      case 'outline':
        return 'bg-transparent border border-accent active:bg-ink-800';
      default:
        return 'bg-accent active:opacity-80';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-2';
      case 'md':
        return 'px-4 py-3';
      case 'lg':
        return 'px-6 py-4';
      default:
        return 'px-4 py-3';
    }
  };

  const getTextClasses = () => {
    const sizeClass = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
    const colorClass =
      variant === 'primary' ? 'text-ink-950' : variant === 'outline' ? 'text-accent' : 'text-ink-100';
    return `${sizeClass} ${colorClass} font-bold tracking-wider text-center`;
  };

  const buttonClasses = [
    'rounded-2xl items-center justify-center',
    getVariantClasses(),
    getSizeClasses(),
    fullWidth && 'w-full',
    (disabled || loading) && 'opacity-50',
  ].filter(Boolean).join(' ');

  return (
    <TouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors['ink-950'] : colors.accent} />
      ) : (
        <Text className={getTextClasses()}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
