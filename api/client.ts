import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_ENDPOINT } from '@/config';
import { ACCESS_TOKEN_KEY } from '@/constants/general';

export const getAccessToken = async () => {
  const token = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
  return token?.trim() ?? '';
};

const apiClient = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      const formattedToken = token;
      if (config.headers) {
        config.headers.Authorization = formattedToken;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
