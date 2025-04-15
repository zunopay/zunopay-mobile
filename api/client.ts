import { API_ENDPOINT } from '@/config';
import axios from 'axios';

const apiClient = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default apiClient;