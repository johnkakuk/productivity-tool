import { Stack, router } from 'expo-router';
import { HeaderBackButton } from 'expo-router/react-navigation';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';
import { TasksProvider } from '../context/TasksContext';
import { ThemeProvider, useTheme } from '../context/ThemeContext';
import { themeVars } from '../constants/themes';
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
    <ThemeProvider>
      <TasksProvider>
        <AppShell />
      </TasksProvider>
    </ThemeProvider>
  );
}

// Lives inside ThemeProvider so it can read the current theme
function AppShell() {
  const { theme, colors } = useTheme();

  return (
    // Theme variables go on the root view, the same job Slate Writer's
    // `document.documentElement.dataset.theme = theme` does (see constants/themes.ts)
    <View style={[{ flex: 1 }, themeVars(theme)]}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors['ink-950'] },
          headerTintColor: colors['ink-100'],
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors['ink-950'] },
          // Web only: the back arrow is tinted with an SVG filter, and browsers don't
          // repaint it when the color changes. key={theme} swaps in a fresh button
          // on theme change so it recolors instantly with everything else.
          ...(Platform.OS === 'web' && {
            headerLeft: ({ canGoBack, tintColor, label, href }) =>
              canGoBack ? (
                <HeaderBackButton
                  key={theme}
                  tintColor={tintColor}
                  label={label}
                  href={href}
                  onPress={() => router.back()}
                />
              ) : null,
          }),
        }}
      >
        {/* The list draws its own header */}
        <Stack.Screen name="index" options={{ title: 'Tasks', headerShown: false }} />
        <Stack.Screen name="add-task" options={{ title: 'Add Task' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
        <Stack.Screen name="edit-task" options={{ title: 'Edit Task' }} />
      </Stack>
    </View>
  );
}
