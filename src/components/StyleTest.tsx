import React from 'react';
import { View, Text, ScrollView } from 'react-native';
// global.css is already imported once in app/_layout.tsx

export default function StyleTest() {
  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-6 text-blue-600">
        TailwindCSS Test
      </Text>
      
      {/* Color Tests */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Color Tests:</Text>
        <View className="flex-row gap-2">
          <View className="w-12 h-12 bg-red-500 rounded" />
          <View className="w-12 h-12 bg-green-500 rounded" />
          <View className="w-12 h-12 bg-blue-500 rounded" />
          <View className="w-12 h-12 bg-yellow-500 rounded" />
        </View>
      </View>
      
      {/* Spacing & Layout Tests */}
      <View className="mb-4 p-4 bg-white rounded-lg shadow-md">
        <Text className="text-lg font-semibold mb-2">Layout & Spacing:</Text>
        <View className="flex-row justify-between items-center">
          <View className="w-16 h-16 bg-purple-300 rounded-full" />
          <View className="w-16 h-16 bg-pink-300 rounded-lg" />
          <View className="w-16 h-16 bg-indigo-300" />
        </View>
      </View>
      
      {/* Typography Tests */}
      <View className="mb-4 p-4 bg-white rounded-lg">
        <Text className="text-lg font-semibold mb-2">Typography:</Text>
        <Text className="text-xs text-gray-500">Extra Small Text</Text>
        <Text className="text-sm text-gray-600">Small Text</Text>
        <Text className="text-base text-gray-700">Base Text</Text>
        <Text className="text-lg text-gray-800">Large Text</Text>
        <Text className="text-xl font-bold text-gray-900">Extra Large Bold</Text>
      </View>
      
      {/* Border & Shadow Tests */}
      <View className="mb-4">
        <Text className="text-lg font-semibold mb-2">Borders & Effects:</Text>
        <View className="p-4 border-2 border-blue-300 rounded-xl bg-blue-50">
          <Text className="text-center text-blue-800">Bordered Container</Text>
        </View>
      </View>
      
      <View className="mt-4 p-4 bg-green-100 rounded-lg">
        <Text className="text-center text-green-800 font-medium">
          ✅ If you can see properly styled colors, spacing, and typography above, TailwindCSS/NativeWind is working!
        </Text>
      </View>
    </ScrollView>
  );
}
