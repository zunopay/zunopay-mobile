import { usePrivy, useEmbeddedSolanaWallet } from "@privy-io/expo";
import { StyleSheet, Text, View } from "react-native";

export function TransferCard() {
  const { isReady, user } = usePrivy();
  const wallet = useEmbeddedSolanaWallet();

  if (!isReady) {
    return <Text>Loading ... !</Text>;
  }

  const isAuthenticated = !!user;
  if (!isAuthenticated) {
    return (
      <View style={styles.container}>
        <Text style={styles.content}>Verify your email to start using the app</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.content}>
        {" "}
        Wallet Address: {wallet?.wallets?.at(0)?.address}
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
