import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Theme } from '../constants/themes';

// Theme picker ported from Slate Writer's Settings > Appearance toggle
// (https://github.com/johnkakuk/slate-writer — src/components/settings/SettingsView.jsx).
// Same THEME_OPTIONS shape (value / label / hint) and button layout; Slate's
// .theme-toggle CSS classes (src/styles/index.css) are translated to Tailwind classes.
const THEME_OPTIONS: { value: Theme; label: string; hint: string }[] = [
  { value: 'dark', label: 'Dark', hint: 'Dark & moody' },
  { value: 'light', label: 'Light', hint: 'Day mode' },
];

export default function SettingsScreen() {
  const { theme, setTheme } = useTheme();

  return (
    <ScrollView className="flex-1 bg-ink-950" contentContainerClassName="px-5 pt-4 pb-10">
      <Text className="text-sm text-ink-500 mb-6">
        App-level preferences — saved securely on this device.
      </Text>

      {/* Slate: .settings-section-label */}
      <Text className="text-[10px] tracking-[0.6px] uppercase text-ink-500 mb-2.5">
        Appearance
      </Text>

      {/* Slate: .theme-toggle / .theme-toggle-btn */}
      <View className="flex-row gap-2">
        {THEME_OPTIONS.map(opt => {
          const active = theme === opt.value;
          return (
            <Pressable
              key={opt.value}
              onPress={() => setTheme(opt.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              className={`flex-1 items-start gap-[3px] px-3 py-2.5 rounded-lg border ${
                active ? 'border-accent bg-accent/10' : 'border-ink-700 bg-ink-900 hover:border-ink-500'
              }`}
            >
              <Text className={`text-xs font-bold ${active ? 'text-accent' : 'text-ink-100'}`}>
                {opt.label}
              </Text>
              <Text className="text-[10px] text-ink-500">{opt.hint}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
