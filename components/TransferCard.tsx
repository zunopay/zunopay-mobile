import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text } from "react-native";
import { versionedTransactionFromBs64 } from "@/lib/utils";
import { useEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";
import { getConnection } from "@/lib/connection";
import { fetchDigitalTransferTransaction } from "@/api/payment/query";

type Props = {
    vpa?: string
}

export const TransferCard: React.FC<Props> = (props) => {
  const [vpa, setVpa] = useState(props.vpa);
  const [amount, setAmount] = useState("");

  const { isReady } = usePrivy();

  const { wallets } = useEmbeddedSolanaWallet();
  const wallet = wallets?.at(0);

  if (!isReady) {
    return <Text>Loading ... !</Text>;
  }

  const connection = getConnection();

  const handleTransferTransaction = async () => {
    const provider = await wallet?.getProvider();

    if (!provider) return;

    const parsedAmount = parseFloat(amount);
    if (!vpa || isNaN(parsedAmount)) {
      Alert.alert("Error", "Please enter a valid VPA and amount");
      return;
    }

    try {
      const encodedTransaction = await fetchDigitalTransferTransaction({
        vpa,
        amount: parsedAmount * 1_000_000,
      });
      if(!encodedTransaction)return;
      const transaction = versionedTransactionFromBs64(encodedTransaction);
      const receipt = await provider.request({
        method: 'signAndSendTransaction',
        params: { transaction: transaction, connection: connection },
      });

      Alert.alert("Success", "Transaction sent!");
      console.log("Transaction receipt:", receipt);
    } catch (err) {
      console.error("Transfer failed:", err);
      Alert.alert("Transfer Failed", "Something went wrong.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter VPA"
        value={vpa}
        onChangeText={setVpa}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={styles.input}
      />
      <Text>Wallet: {wallet?.address}</Text>
      <Button title="Transfer Funds" onPress={handleTransferTransaction} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 12,
    maxWidth: 300,
    alignSelf: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
  },
});
