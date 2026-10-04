import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { Appearance, Platform } from 'react-native';
import userPreferencesService from '../services/userPreferences';
import { THEME_PALETTES, Theme } from '../constants/themes';

/*
 * App-wide theme state.
 *
 * Mirrors how Slate Writer handles its theme in ProjectContext
 * (https://github.com/johnkakuk/slate-writer — src/state/ProjectContext.jsx):
 * a 'dark' | 'light' value that defaults to dark, is loaded from saved
 * preferences on startup, and is persisted whenever it changes. Here the
 * preference lives in SecureStore (services/userPreferences) instead of
 * Slate's SQLite blob.
 */

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  colors: (typeof THEME_PALETTES)[Theme]; // raw hex values for props that can't take className
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Dark is the default, same as Slate Writer
  const [theme, setThemeState] = useState<Theme>('dark');

  // Load the saved theme on startup
  useEffect(() => {
    const loadTheme = async () => {
      const prefs = await userPreferencesService.getPreferences();
      // Same validation Slate Writer uses: anything that isn't 'light' falls back to dark
      setThemeState(prefs.theme === 'light' ? 'light' : 'dark');
    };

    loadTheme();
  }, []);

  // Tell iOS/Android which theme the app is in, so system-drawn UI (header back
  // button, keyboard, alerts) matches the toggle instead of the phone's setting.
  // The native counterpart of Slate Writer's effect that reflects the theme onto
  // the document root (`document.documentElement.dataset.theme = theme`).
  useEffect(() => {
    if (Platform.OS === 'web') return; // web has no system appearance to override
    Appearance.setColorScheme(theme);
  }, [theme]);

  // Update the theme and save it securely, keeping the other saved preferences intact
  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    userPreferencesService
      .getPreferences()
      .then(prefs => userPreferencesService.savePreferences({ ...prefs, theme: next }))
      .catch(error => console.error('Error saving theme preference:', error));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, colors: THEME_PALETTES[theme] }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return context;
}
