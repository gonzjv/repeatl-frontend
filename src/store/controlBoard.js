import { defineStore } from 'pinia';

export const useControlBoardStore = defineStore(
  'controlBoard',
  {
    state: () => ({
      courses: [],
      collections: [],
      modelSections: [],
      activeCourse: {},
      activeCollection: {},
    }),
  }
);
