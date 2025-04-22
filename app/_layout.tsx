import { useAuth } from '@/hooks/useAuth';
import { Stack, Redirect } from 'expo-router';
import {PrivyProvider} from '@privy-io/expo';
import { PRIVY_APPLICATION_ID, PRIVY_CLIENT_ID } from '@/config';

function AppLayout(){
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) {
    return <Redirect href="/(tabs)" />;
  }

  return  <Stack screenOptions={{ headerShown: false }} initialRouteName='register' />
}

export default function RootLayout() {

  return (
    <PrivyProvider appId={PRIVY_APPLICATION_ID} clientId={PRIVY_CLIENT_ID}>
       <AppLayout />
    </PrivyProvider>
  ) ;
}

