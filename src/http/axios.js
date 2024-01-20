import axios from 'axios';

import config from "../config/config"

import { useAuthStore } from '@/store/auth';

const api = axios.create({
  baseURL: config.APP_BASE_URL, // Replace with your API base URL
});

api.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  // console.log("Auth store:", useAuthStore().$state);
  const token = authStore.getAccessToken;
  // console.log(token);
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

export default api;






