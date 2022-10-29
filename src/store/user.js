import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    isUserLoggedIn: false,
  }),
});
