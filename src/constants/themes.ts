import { vars } from 'nativewind';

/*
 * Light/dark theme palettes.
 *
 * Same approach as Slate Writer's theme tokens
 * (https://github.com/johnkakuk/slate-writer — src/styles/index.css):
 * one set of color tokens per theme, dark is the default, and the light
 * theme uses Slate's "warm paper-adjacent neutrals" with the accent darkened
 * for legibility on light backgrounds.
 *
 * Slate puts its tokens in CSS under :root[data-theme='...']. React Native has
 * no document root, so here each palette becomes NativeWind CSS variables via
 * vars(), applied to the app's root view in app/_layout.tsx. Tailwind classes
 * like `bg-ink-950` and `text-accent` read those variables (tailwind.config.js),
 * so every screen switches themes without per-component changes.
 */

export type Theme = 'dark' | 'light';

type PaletteKey =
  | 'ink-950' // page background
  | 'ink-900' // cards / inputs
  | 'ink-800' // subtle borders, pressed states
  | 'ink-700' // stronger borders
  | 'ink-500' // dim text, placeholders
  | 'ink-300' // secondary text
  | 'ink-100' // primary text
  | 'accent';

export const THEME_PALETTES: Record<Theme, Record<PaletteKey, string>> = {
  dark: {
    'ink-950': '#0b0b0f',
    'ink-900': '#131319',
    'ink-800': '#1c1c24',
    'ink-700': '#2a2a34',
    'ink-500': '#6b6b7a',
    'ink-300': '#a1a1b0',
    'ink-100': '#ececf1',
    accent: '#a3e635', // lime-400
  },
  // Neutrals taken from Slate Writer's light theme (--bg, --surface, --border-alt2,
  // --border-alt, --text-muted, --text-secondary, --text)
  light: {
    'ink-950': '#f2efe7',
    'ink-900': '#ffffff',
    'ink-800': '#e4ddc9',
    'ink-700': '#cfc7b0',
    'ink-500': '#7a7364',
    'ink-300': '#5c564a',
    'ink-100': '#232019',
    accent: '#4d7c0f', // lime-700: lime-400 is unreadable on cream
  },
};

// "#a3e635" -> "163 230 53", the format Tailwind's rgb(var(--x) / <alpha-value>) expects
const hexToRgbChannels = (hex: string) => {
  const value = parseInt(hex.slice(1), 16);
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`;
};

// NativeWind style object that sets every --ink-* / --accent variable for a theme
export const themeVars = (theme: Theme) =>
  vars(
    Object.fromEntries(
      Object.entries(THEME_PALETTES[theme]).map(([key, hex]) => [`--${key}`, hexToRgbChannels(hex)])
    )
  );
