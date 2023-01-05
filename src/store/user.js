import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    progress: {},
    isUserLoggedIn: false,
    isAdminHere: false,
  }),
});
