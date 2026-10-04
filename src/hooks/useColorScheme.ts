import { useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';

export function useColorScheme(): ColorSchemeName {
  const [colorScheme, setColorScheme] = useState<ColorSchemeName>(
    // getColorScheme() can return null before the OS reports a scheme
    Appearance.getColorScheme() ?? 'unspecified'
  );

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme ?? 'unspecified');
    });
    return () => subscription.remove();
  }, []);

  return colorScheme;
}
