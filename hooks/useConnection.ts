import { Connection } from "@solana/web3.js";
import { useCallback } from "react";

export function useConnection() {
  return useCallback(() => {
    const endpoint =
      process.env.RPC_ENDPOINT || "https://api.mainnet-beta.solana.com";

    const connection = new Connection(endpoint, "confirmed");
    return connection;
  }, []);
}
