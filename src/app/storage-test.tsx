import React from 'react';
import { View } from 'react-native';
import StorageTest from '../components/StorageTest';

// Verification screen from the "Technology Verification" lesson — visit /storage-test
export default function StorageTestScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#ffffff' }}>
      <StorageTest />
    </View>
  );
}
