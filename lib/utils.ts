import { VersionedTransaction } from "@solana/web3.js";
import axios from "axios";

export function debugApiClient(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.log("❌ Axios Error");
    console.log("Message:", error.message);
    console.log("Config:", error.config);
    console.log("Code:", error.code);
    console.log("Response:", error.response?.data);
    console.log("Status:", error.response?.status);
    console.log("Headers:", error.response?.headers);
  } else {
    console.log("❌ Unknown Error:", error);
  }
}

export function decodeBs64(encodedString: string) {
  return Buffer.from(encodedString, "base64");
}

export function versionedTransactionFromBs64(encodedString: string) {
  return VersionedTransaction.deserialize(decodeBs64(encodedString));
}

export function cleanWalletAddress(walletAddress?: string) {
  if(!walletAddress)return "";
  
  const start = walletAddress.slice(0,4);
  const end = walletAddress.slice(-4);
  return `${start}...${end}`;
}
