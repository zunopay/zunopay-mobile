import { View, Text, StyleSheet, TextInput, Button, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTransferStore } from '@/store';
import { useEmbeddedSolanaWallet, usePrivy } from '@privy-io/expo';
import { getConnection } from '@/lib/connection';
import { useState } from 'react';
import { transferDigital } from '@/lib/transfer-transaction';

export default function TransferModal() {
  const router = useRouter();
  const { receiver } = useTransferStore()
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedSolanaWallet();
  const [amount, setAmount] = useState("");

  const wallet = wallets?.[0];
  const connection = getConnection();

  const handleTransferTransaction = async () => {
    const provider = await wallet?.getProvider();
    const parsedAmount = parseFloat(amount);

    if (!provider || !receiver) {
      Alert.alert("Receiver doesn't exists");
      return;
    }

    await transferDigital(connection, provider, receiver.vpa, parsedAmount);
    router.back()
  }

  if (!isReady) {
    return <Text style={styles.loading}>Loading wallet...</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          presentation: 'modal',
          headerTitle: 'Transfer Funds',
          headerBackVisible: true,
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Text style={styles.label}>To {receiver?.vpa}</Text>
        <TextInput style={styles.input} placeholder="0x..." />

        <Text style={styles.label}>Amount in {receiver?.currency}</Text>
        <TextInput style={styles.input} keyboardType="numeric" placeholder="0.00" />

        <View style={styles.button}>
          <Button title="Send" onPress={handleTransferTransaction} />
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    marginTop: 20,
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
