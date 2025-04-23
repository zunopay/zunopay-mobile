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
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useTransferStore } from "@/store";
import { useEmbeddedSolanaWallet, usePrivy } from "@privy-io/expo";
import { getConnection } from "@/lib/connection";
import { useState } from "react";
import { transferDigital } from "@/lib/transfer-transaction";
import { cleanWalletAddress } from "@/lib/utils";
import * as LocalAuthentication from "expo-local-authentication";
import { ActivityIndicator } from "react-native";

export default function TransferModal() {
  const router = useRouter();
  const { receiver } = useTransferStore();
  const { isReady } = usePrivy();
  const { wallets } = useEmbeddedSolanaWallet();
  const [amount, setAmount] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showLoader, setLoader] = useState(false);

  const wallet = wallets?.[0];
  const connection = getConnection();

  const handleSendPressed = async () => {
    if (!amount || isNaN(Number(amount))) {
      Alert.alert("Enter a valid amount");
      return;
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();

    if (!hasHardware || !isEnrolled) {
      Alert.alert("Biometric auth not available");
      return;
    }

    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to confirm transfer",
      fallbackLabel: "Enter device password",
      cancelLabel: "Cancel",
    });

    if (result.success) {
      await handleTransferTransaction();
    } else {
      Alert.alert("Authentication failed or canceled");
    }
  };

  const handleTransferTransaction = async () => {
    const provider = await wallet?.getProvider();
    const parsedAmount = parseFloat(amount);

    if (!provider || !receiver) {
      Alert.alert("Receiver doesn't exist");
      return;
    }

    try {
      setLoader(true);
      await transferDigital(connection, provider, receiver.vpa, parsedAmount);
      setLoader(false);
      setShowSuccess(true);
    } catch (error) {
      console.error("Transfer failed:", error);
      Alert.alert("Transfer Failed", "Something went wrong. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  if (!isReady) {
    return <Text style={styles.loading}>Loading wallet...</Text>;
  }

  return (
    <>
      <Stack.Screen
        options={{
          presentation: "modal",
          headerTitle: "Transfer Funds",
          headerBackVisible: true,
        }}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
          <Text style={styles.sectionLabel}>Sending to</Text>
          <View style={styles.vpaBox}>
            <Text style={styles.vpaText}>{receiver?.vpa}</Text>
            <Text style={styles.walletHint}>
              ({cleanWalletAddress(receiver?.walletAddress)})
            </Text>
          </View>

          <Text style={styles.sectionLabel}>
            Amount in {receiver?.currency}
          </Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="0.00"
            value={amount}
            onChangeText={setAmount}
          />

          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendPressed}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>

      <Modal
        visible={showSuccess}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSuccess(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>🎉 Transfer Successful</Text>
            <Text style={{ textAlign: "center", marginVertical: 10 }}>
              You've successfully sent {amount} {receiver?.currency} to{" "}
              {receiver?.vpa}.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccess(false);
                router.back();
              }}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showLoader}
        transparent
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.loaderOverlay}>
          <View style={styles.loaderBox}>
            <Text style={styles.loaderText}>Transferring...</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1C1C1E",
    fontFamily: "Inter_600SemiBold",
  },
  vpaBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 14,
    marginBottom: 24,
    backgroundColor: "#f9f9f9",
  },
  vpaText: {
    fontSize: 16,
    color: "#000",
    fontFamily: "Inter_500Medium",
  },
  walletHint: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
    fontFamily: "Inter_400Regular",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    backgroundColor: "#fff",
  },
  sendButton: {
    marginTop: 32,
    backgroundColor: "#007AFF",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  loading: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontFamily: "Inter_400Regular",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 24,
  },
  modalBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
  },
  pinInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 18,
    fontFamily: "Inter_500Medium",
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  loaderOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  loaderBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    alignItems: "center",
    elevation: 10,
  },

  loaderText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#333",
  },
});
