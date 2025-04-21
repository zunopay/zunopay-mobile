import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useAsyncStorage<T>(key: string, initialValue: T): [T, (value: T) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    (async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if (item !== null) {
          setStoredValue(JSON.parse(item));
        }
      } catch (error) {
        console.warn(`Error reading ${key} from AsyncStorage`, error);
      }
    })();
  }, [key]);

  const setValue = useCallback(
    async (value: T) => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
        setStoredValue(value);
      } catch (error) {
        console.warn(`Error setting ${key} in AsyncStorage`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}
