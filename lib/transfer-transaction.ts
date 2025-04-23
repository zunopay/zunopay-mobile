import { fetchDigitalTransferTransaction } from "@/api/payment/query";
import { versionedTransactionFromBs64 } from "./utils";
import { Alert } from "react-native";
import { Connection } from "@solana/web3.js";
import { PrivyEmbeddedSolanaWalletProvider } from "@privy-io/expo";

export async function transferDigital(
  connection: Connection,
  provider: PrivyEmbeddedSolanaWalletProvider,
  vpa: string,
  amount: number
) {
  try {
    const encodedTransaction = await fetchDigitalTransferTransaction({
      vpa,
      amount: amount * 1_000_000,
    });

    if (!encodedTransaction) return;

    const transaction = versionedTransactionFromBs64(encodedTransaction);
    const receipt = await provider.request({
      method: "signAndSendTransaction",
      params: { transaction, connection },
    });

    Alert.alert("Success", "Transaction sent successfully!");
    console.log("Transaction receipt:", receipt);
  } catch (err) {
    console.error("Transfer failed:", err);
    Alert.alert("Transfer Failed", "Something went wrong.");
  }
}
