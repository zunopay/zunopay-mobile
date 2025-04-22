import { usePrivy, useEmbeddedSolanaWallet, getUserEmbeddedSolanaWallet, useRecoverEmbeddedWallet, useOnNeedsRecovery, useSetEmbeddedWalletRecovery } from "@privy-io/expo";
import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export function TransferCard() {
  const { isReady, user } = usePrivy();

  const wallet = getUserEmbeddedSolanaWallet(user);

  if (!isReady) {
    return <Text>Loading ... !</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {" "}
        Wallet Address: {wallet?.address}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    maxHeight: 50,
    padding: 5,
    margin: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    color: "#fff",
    fontSize: 10,
  },
});
