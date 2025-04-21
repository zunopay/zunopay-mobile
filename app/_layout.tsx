// app/_layout.tsx
import { useAuth } from '@/hooks/useAuth';
import { Stack, Redirect } from 'expo-router';

export default function RootLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null; // or splash screen

  // Authenticated users go to the tabs layout by default
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  // Not authenticated -> show auth stack (e.g., register/login)
  return <Stack screenOptions={{ headerShown: false }} initialRouteName='register' />;
}
