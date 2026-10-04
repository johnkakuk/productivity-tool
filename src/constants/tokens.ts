export const designTokens = {
  colors: {
    primary: '#a3e635',
    primaryDark: '#84cc16',
    secondary: '#6b6b7a',
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    
    background: {
      primary: '#0b0b0f',
      secondary: '#131319',
      tertiary: '#1c1c24',
    },
    
    text: {
      primary: '#ececf1',
      secondary: '#a1a1b0',
      tertiary: '#6b6b7a',
    },
    
    border: {
      light: '#1c1c24',
      medium: '#2a2a34',
      dark: '#6b6b7a',
    },
  },
  
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
  
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
  },
  
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.15,
      shadowRadius: 15,
      elevation: 5,
    },
  },
} as const;
