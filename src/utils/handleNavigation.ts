import { Href, router } from 'expo-router';
import { Platform } from 'react-native';

export const handleNavigation = (route: Href) => {
  if (Platform.OS === 'web') {
    // Web: Update URL for better UX
    window.history.pushState(null, '', String(route));
  }
  router.push(route);
};
