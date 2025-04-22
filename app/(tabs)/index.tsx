import { StyleSheet, Text, View } from 'react-native';
import { BalanceCard } from '@/components/BalanceCard';
import { PointsCard } from '@/components/PointsCard';
import { LogoutCard } from '@/components/LogoutCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TransferCard } from '@/components/TransferCard';

export default function HomeScreen() {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>ZunoPay</Text>
      <View style={styles.content}>
        <BalanceCard />
        <PointsCard />
        <TransferCard />
        <Text style={styles.subtitle}>
          Scan and pay easily
        </Text>
      </View>
      <LogoutCard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 85
  },
  heroImage: {
    width: '100%',
    height: 300,
  },
  content: {
    padding: 20,
    flex: 1
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter_700Bold',
    marginBottom: 10,
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
    color: '#8E8E93',
    lineHeight: 24,
  },
});