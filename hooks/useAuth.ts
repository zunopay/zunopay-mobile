import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN_KEY } from '@/constants/general';

export function useAuth() {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(ACCESS_TOKEN_KEY).then((token) => {
      setAuthenticated(!!token);
      setLoading(false);
    });
  }, []);

  return { isAuthenticated, isLoading };
}
