import { useAuth } from "@/hooks/useAuth";
import { Stack, useRouter } from "expo-router";
import { PrivyProvider, usePrivy } from "@privy-io/expo";
import { PRIVY_APPLICATION_ID, PRIVY_CLIENT_ID } from "@/config";
import { useEffect } from "react";
import { RoutePath } from "@/enums/RoutePath";

function AppLayout() {
  const { isAuthenticated, isLoading, isEmailVerified } = useAuth(); // assuming this includes isVerified
  const router = useRouter();
  const { isReady, user } = usePrivy();

  useEffect(() => {
    if (!isReady || isLoading) return;
    if (!isAuthenticated) return;
    if (isAuthenticated && !user) return;
  
    if (isAuthenticated && (!isEmailVerified || !user)) {
      router.replace(RoutePath.Verify_Email as any);
    } else if (isAuthenticated && isEmailVerified) {
      router.replace(RoutePath.Home);
    }
  }, [isAuthenticated, isEmailVerified, isLoading, isReady, user]);

  if (isLoading || !isReady) return null;

  return (
    <Stack
      screenOptions={{ headerShown: false }}
      initialRouteName="(auth)/register"
    />
  );
}

export default function RootLayout() {
  return (
    <PrivyProvider appId={PRIVY_APPLICATION_ID} clientId={PRIVY_CLIENT_ID}>
      <AppLayout />
    </PrivyProvider>
  );
}
