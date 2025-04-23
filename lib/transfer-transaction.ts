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
    await provider.request({
      method: "signAndSendTransaction",
      params: { transaction, connection },
    });
    //TODO: Have this after buying rpc plan
    // const result = await connection.confirmTransaction({
    //   ...latestBlockhash,
    //   signature: receipt.signature,
    // });
    // if (result.value.err) throw new Error();

  } catch (err) {
    console.error("Transfer failed:", err);
    Alert.alert("Transfer Failed", "Something went wrong.");
  }
}
