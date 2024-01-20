import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken') || null,
  }),
  actions: {
    setTokens(token) {
      this.accessToken = token;
      localStorage.setItem('accessToken', token);
    },
    clearAccessToken() {
      this.accessToken = null;
      localStorage.removeItem('accessToken');
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    getAccessToken: (state) => state.accessToken,
  },
});

