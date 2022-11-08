import { defineStore } from 'pinia';

export const useControlBoardStore = defineStore(
  'controlBoard',
  {
    state: () => ({
      courses: [],
      collections: [],
      activeCourse: {},
      activeCollection: {},
    }),
  }
);
