import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, ''),
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.NEXT_PUBLIC_INTERNAL_API_KEY || '',
  },
});

export default apiClient;