import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    userData: {},
    progress: {},
    courseState: {},
    collectionState: {},
    wordSectionState: {},
    isUserLoggedIn: false,
    isAdminHere: false,
  }),
});
