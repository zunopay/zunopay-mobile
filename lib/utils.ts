import axios from "axios";

export function debugApiClient(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.log('❌ Axios Error');
        console.log('Message:', error.message);
        console.log('Config:', error.config);
        console.log('Code:', error.code);
        console.log('Response:', error.response?.data);
        console.log('Status:', error.response?.status);
        console.log('Headers:', error.response?.headers);
      } else {
        console.log('❌ Unknown Error:', error);
      }
}