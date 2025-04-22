import { useEffect, useState } from "react";
import { fetchMe } from "@/api/user/query";
import { User } from "@/model/user";

export function useFetchMe() {
  const [me, setMe] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const {data: me} = await fetchMe();
        setMe(me);
      } catch (err: any) {
        setError(err.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return { me, isLoading, error };
}
