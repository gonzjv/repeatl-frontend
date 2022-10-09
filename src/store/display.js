import { defineStore } from 'pinia';

export const useDisplayStore = defineStore(
  'display',
  {
    state: () => ({
      isNavLogoDisplay: false,
    }),
  }
);
