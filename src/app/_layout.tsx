import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { TasksProvider } from '../context/TasksContext';
import config from '../constants/config';
import '../styles/global.css';

export default function RootLayout() {
  // Web-only features. Inside useEffect so it only runs in the browser,
  // not during static rendering where `document` doesn't exist.
  useEffect(() => {
    if (Platform.OS !== 'web') return;

    // Add keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'n') {
        e.preventDefault();
        router.push('/add-task');
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Add web analytics
    if (config.webAnalyticsId) {
      // Initialize analytics
    }

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <TasksProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0b0b0f' },
          headerTintColor: '#ececf1',
          headerShadowVisible: false,
          contentStyle: { backgroundColor: '#0b0b0f' },
        }}
      >
        {/* The list draws its own header */}
        <Stack.Screen name="index" options={{ title: 'Tasks', headerShown: false }} />
        <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
        <Stack.Screen name="edit-task" options={{ title: 'Edit Task' }} />
      </Stack>
    </TasksProvider>
  );
}
