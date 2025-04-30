import { Redirect, Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { RoutePath } from "@/enums/RoutePath";
import { useAuth } from "@/hooks/useAuth";
import { usePrivy } from "@privy-io/expo";

export default function AuthenticatedLayout() {
  const { isAuthenticated, isLoading, isEmailVerified } = useAuth();
  const { isReady, user } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    if (!isReady || isLoading || !isAuthenticated) return;

    if (!user || !isEmailVerified) {
      router.replace(RoutePath.Verify_Email as any);
    }
  }, [isAuthenticated, isEmailVerified, isLoading, isReady, user]);

  if (isLoading || !isReady) return null;

  if (!isAuthenticated) return <Redirect href={RoutePath.Register} />;

  return (
    <Stack screenOptions={{ headerShown: false }} />
  );
}
