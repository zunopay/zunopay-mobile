import React, { useState } from "react";
import {
  View,
  TextInput,
  Alert,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { cleanWalletAddress, versionedTransactionFromBs64 } from "@/lib/utils";
import { useEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";
import { getConnection } from "@/lib/connection";
import { fetchDigitalTransferTransaction } from "@/api/payment/query";
import { FontAwesome } from "@expo/vector-icons";
import { transferDigital } from "@/lib/transfer-transaction";

type Props = {
  vpa?: string;
};

export const TransferCard: React.FC<Props> = ({ vpa: initialVpa }) => {
  const [vpa, setVpa] = useState(initialVpa ?? "");
  const [amount, setAmount] = useState("");

  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedSolanaWallet();
  const wallet = wallets?.[0];

  const connection = getConnection();

  const handleTransferTransaction = async () => {
    const provider = await wallet?.getProvider();
    const parsedAmount = parseFloat(amount);

    if (!provider || !vpa || isNaN(parsedAmount)) {
      Alert.alert("Invalid Input", "Please enter a valid VPA and amount.");
      return;
    }

    transferDigital(connection, provider, vpa, parsedAmount)
  }
    
  if (!isReady) {
    return <Text style={styles.loading}>Loading wallet...</Text>;
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.wrapper}
    >
      <View style={styles.card}>
        <Text style={styles.heading}>Transfer Funds</Text>
        <Text style={styles.label}>Wallet: {cleanWalletAddress(wallet?.address)}</Text>

        <TextInput
          placeholder="Enter VPA"
          value={vpa}
          onChangeText={setVpa}
          style={styles.input}
          autoCapitalize="none"
          placeholderTextColor="#999"
        />
        <TextInput
          placeholder="Amount"
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity style={styles.button} onPress={handleTransferTransaction}>
          <FontAwesome name="paper-plane" size={18} color="#fff" />
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 16,
    width: "90%",
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    gap: 12,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  label: {
    fontSize: 14,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: "#000",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#0066ff",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});
