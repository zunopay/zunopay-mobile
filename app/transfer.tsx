import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { useTransferStore } from '@/store';
import { useEmbeddedSolanaWallet, usePrivy } from '@privy-io/expo';
import { getConnection } from '@/lib/connection';
import { useState } from 'react';
import { transferDigital } from '@/lib/transfer-transaction';
import { cleanWalletAddress } from '@/lib/utils';

export default function TransferModal() {
  const router = useRouter();
  const { receiver } = useTransferStore();
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedSolanaWallet();
  const [amount, setAmount] = useState("");

  const wallet = wallets?.[0];
  const connection = getConnection();

  const handleTransferTransaction = async () => {
    const provider = await wallet?.getProvider();
    const parsedAmount = parseFloat(amount);

    if (!provider || !receiver) {
      Alert.alert("Receiver doesn't exist");
      return;
    }

    await transferDigital(connection, provider, receiver.vpa, parsedAmount);
    router.back();
  };

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
        <Text style={styles.sectionLabel}>Sending to</Text>
        <View style={styles.vpaBox}>
          <Text style={styles.vpaText}>{receiver?.vpa}</Text>
          <Text style={styles.walletHint}>
            ({cleanWalletAddress(receiver?.walletAddress)})
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Amount in {receiver?.currency}</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
        />

        <TouchableOpacity style={styles.sendButton} onPress={handleTransferTransaction}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1C1C1E',
    fontFamily: 'Inter_600SemiBold',
  },
  vpaBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    marginBottom: 24,
    backgroundColor: '#f9f9f9',
  },
  vpaText: {
    fontSize: 16,
    color: '#000',
    fontFamily: 'Inter_500Medium',
  },
  walletHint: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    fontFamily: 'Inter_500Medium',
    backgroundColor: '#fff',
  },
  sendButton: {
    marginTop: 32,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Inter_600SemiBold',
  },
  loading: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    fontFamily: 'Inter_400Regular',
  },
});
