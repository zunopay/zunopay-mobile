import { useEffect, useState } from "react";
import { fetchBalance } from "@/api/user/query";

export function useFetchBalance() {
  const [balance, setBalance] = useState<string>("--");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const {data: balance} = await fetchBalance();
        setBalance(balance || "0");
      } catch (err: any) {
        setError(err.message || "Failed to fetch balance");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { balance, isLoading, error };
}
