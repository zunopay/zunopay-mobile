import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useState } from "react";

export function useAsyncStorage<T>(key: string, initialValue: T): [T, (value: T) => Promise<void>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    (async () => {
      try {
        const item = await AsyncStorage.getItem(key);
        if(!item)return initialValue;

        const parsedValue = parseJson<T>(item);
        if (parsedValue) {
          try {
            setStoredValue(parsedValue);
          } catch (e) {
            setStoredValue(item as T);
          }
        }
      } catch (error) {
        console.warn(`Error reading ${key} from AsyncStorage`, error);
      }
    })();
  }, [key]);

  const setValue = useCallback(
    async (value: T) => {
      try {
        if (typeof value === 'string') {
          await AsyncStorage.setItem(key, value);
        } else {
          await AsyncStorage.setItem(key, JSON.stringify(value));
        }
        setStoredValue(value);
      } catch (error) {
        console.warn(`Error setting ${key} in AsyncStorage`, error);
      }
    },
    [key]
  );

  return [storedValue, setValue];
}

function parseJson<T>(value: string): T | undefined {
  if (value === "undefined") return undefined;

  try {
    return JSON.parse(value, (_key, val) => {
      if (typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val)) {
        const date = new Date(val);
        return isNaN(date.getTime()) ? val : date;
      }
      return val;
    }) as T;
  } catch {
    return undefined;
  }
}