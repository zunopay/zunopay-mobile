import { useFetchBalance } from "@/hooks/useFetchBalance";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient'; // Make sure to install expo-linear-gradient
import { FontAwesome } from '@expo/vector-icons';

export function BalanceCard() {
  const { balance } = useFetchBalance();

  return (
    <LinearGradient
      colors={['#1e3c72', '#2a5298']}
      start={[0, 0]}
      end={[1, 1]}
      style={styles.container}
    >
      <View style={styles.row}>
        <FontAwesome name="money" size={28} color="#fff" />
        <Text style={styles.label}>Available Balance</Text>
      </View>
      <Text style={styles.balance}>${balance ?? '0.00'} USD</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    margin: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
  },
  label: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
