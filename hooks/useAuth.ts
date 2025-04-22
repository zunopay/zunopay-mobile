import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACCESS_TOKEN_KEY } from "@/constants/general";
import { fetchMe } from "@/api/user/query";

export function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);

      if (!token) {
        setAuthenticated(false);
        setIsEmailVerified(false);
        setLoading(false);
        return;
      }

      setAuthenticated(true);

      try {
        const { data: user } = await fetchMe();
        setEmail(user?.email)
        setIsEmailVerified(user?.isEmailVerified ?? false);
      } catch (error) {
        console.error("Error fetching user:", error);
        setIsEmailVerified(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  return { isAuthenticated, isEmailVerified, isLoading, email };
}
