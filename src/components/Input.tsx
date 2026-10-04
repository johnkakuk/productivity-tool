import React from 'react';
import { Text, TextInput, View } from 'react-native';

// NativeWind v4 uses className directly on components
interface InputProps {
  label?: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  multiline?: boolean;
  numberOfLines?: number;
  error?: string;
  disabled?: boolean;
}

export default function Input({
  label,
  value,
  onChangeText,
  placeholder,
  multiline = false,
  numberOfLines = 1,
  error,
  disabled = false,
}: InputProps) {
  const inputClasses = [
    'border rounded-xl px-4 py-3 bg-ink-900 text-ink-100 text-base outline-none',
    error ? 'border-rose-400' : 'border-ink-700 focus:border-accent',
    disabled && 'opacity-50',
    multiline && 'min-h-[110px]',
  ].filter(Boolean).join(' ');

  return (
    <View className="mb-5">
      {label && (
        <Text className="text-xs font-bold tracking-widest uppercase text-ink-500 mb-2">
          {label}
        </Text>
      )}
      
      <TextInput
        className={inputClasses}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={numberOfLines}
        // Start multiline text at the top (Android centers it by default)
        textAlignVertical={multiline ? 'top' : 'center'}
        editable={!disabled}
        placeholderTextColor="#6b6b7a"
      />
      
      {error && (
        <Text className="text-rose-400 text-sm mt-1.5">
          {error}
        </Text>
      )}
    </View>
  );
}
