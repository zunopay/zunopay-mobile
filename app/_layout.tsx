import { useAuth } from '@/hooks/useAuth';
import { Stack, useRouter } from 'expo-router';
import {PrivyProvider} from '@privy-io/expo';
import { PRIVY_APPLICATION_ID, PRIVY_CLIENT_ID } from '@/config';
import { useEffect } from 'react';

function AppLayout(){
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  if (isLoading) return null;

  return  <Stack screenOptions={{ headerShown: false }} initialRouteName='register' />
}

export default function RootLayout() {

  return (
    <PrivyProvider appId={PRIVY_APPLICATION_ID} clientId={PRIVY_CLIENT_ID}>
       <AppLayout />
    </PrivyProvider>
  ) ;
}

