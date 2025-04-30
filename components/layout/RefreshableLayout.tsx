import { ScrollView, RefreshControl, View, Text, StyleSheet } from 'react-native';
import { useCallback, useState, ReactNode } from 'react';
import { LogoWithText } from '../logo/LogoWithText';
import { useRouter } from 'expo-router';
import { RoutePath } from '@/enums/RoutePath';
import { HomeNav } from '../nav/HomeNav';

type Props = {
  children: ReactNode;
  onRefresh?: () => Promise<void> | void;
};

export default function RefreshableLayout({ children, onRefresh }: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    setRefreshing(true);
    await Promise.resolve(onRefresh());
    setRefreshing(false);
  }, [onRefresh]);

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, padding: 8 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <HomeNav />
      {children}
    </ScrollView>
  );
}

