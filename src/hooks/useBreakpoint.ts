import { useWindowDimensions } from 'react-native';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
};

// useWindowDimensions re-renders on resize/rotation, so no manual listener is needed
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();

  if (width >= breakpoints.xl) return 'xl';
  if (width >= breakpoints.lg) return 'lg';
  if (width >= breakpoints.md) return 'md';
  return 'sm';
}
