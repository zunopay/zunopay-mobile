import { API_ENDPOINT } from '@/config';
import { ACCESS_TOKEN_KEY } from '@/constants/general';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const getAccessToken = async() => await AsyncStorage.getItem(ACCESS_TOKEN_KEY); 

const apiClient = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

apiClient.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
)

export default apiClient;