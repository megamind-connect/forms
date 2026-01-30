import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL?.endsWith('/')
  ? process.env.NEXT_PUBLIC_API_URL.slice(0, -1)
  : process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const apiKey = process.env.NEXT_PUBLIC_INTERNAL_API_KEY;
  if (apiKey) {
    config.headers['x-api-key'] = apiKey;
  }
  return config;
});

export default apiClient;