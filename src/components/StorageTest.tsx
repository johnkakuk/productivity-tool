import React, { useState } from 'react';
import { View, Text, Button, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { runSqliteTest } from './sqliteTest';

// Caught errors are `unknown` in strict TypeScript, so read the message safely
const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : String(error);

export default function StorageTest() {
  const [sqliteStatus, setSqliteStatus] = useState('Not tested');
  const [asyncStorageStatus, setAsyncStorageStatus] = useState('Not tested');
  const [secureStoreStatus, setSecureStoreStatus] = useState('Not tested');

  // Test SQLite (Native only)
  const testSQLite = async () => {
    if (Platform.OS === 'web') {
      setSqliteStatus('N/A (Web platform)');
      return;
    }
    
    try {
      // SQLite code lives in sqliteTest.native.ts so it stays out of the web bundle
      const worked = await runSqliteTest();
      setSqliteStatus(worked ? 'Working ✅' : 'Failed ❌');
    } catch (error) {
      setSqliteStatus(`Error: ${errorMessage(error)}`);
    }
  };

  // Test AsyncStorage
  const testAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('test_key', 'Hello AsyncStorage');
      const value = await AsyncStorage.getItem('test_key');
      setAsyncStorageStatus(value === 'Hello AsyncStorage' ? 'Working ✅' : 'Failed ❌');
    } catch (error) {
      setAsyncStorageStatus(`Error: ${errorMessage(error)}`);
    }
  };

  // Test Secure Store
  const testSecureStore = async () => {
    try {
      if (Platform.OS === 'web') {
        // Test localStorage fallback
        localStorage.setItem('test_secure', 'Hello Secure');
        const value = localStorage.getItem('test_secure');
        setSecureStoreStatus(value === 'Hello Secure' ? 'Working (localStorage) ✅' : 'Failed ❌');
      } else {
        await SecureStore.setItemAsync('test_secure', 'Hello SecureStore');
        const value = await SecureStore.getItemAsync('test_secure');
        setSecureStoreStatus(value === 'Hello SecureStore' ? 'Working ✅' : 'Failed ❌');
      }
    } catch (error) {
      setSecureStoreStatus(`Error: ${errorMessage(error)}`);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
        Storage Technology Tests
      </Text>
      
      <View style={{ marginBottom: 15 }}>
        <Text>SQLite Status: {sqliteStatus}</Text>
        <Button title="Test SQLite" onPress={testSQLite} />
      </View>
      
      <View style={{ marginBottom: 15 }}>
        <Text>AsyncStorage Status: {asyncStorageStatus}</Text>
        <Button title="Test AsyncStorage" onPress={testAsyncStorage} />
      </View>
      
      <View style={{ marginBottom: 15 }}>
        <Text>Secure Store Status: {secureStoreStatus}</Text>
        <Button title="Test Secure Store" onPress={testSecureStore} />
      </View>
      
      <Button 
        title="Test All Storage" 
        onPress={() => {
          testSQLite();
          testAsyncStorage();
          testSecureStore();
        }} 
      />
    </View>
  );
}
