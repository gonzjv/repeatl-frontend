import { defineStore } from 'pinia';

export const useControlBoardStore = defineStore(
  'controlBoard',
  {
    state: () => ({
      courses: [],
      collections: [],
      modelSections: [],
      models: [],
      phrases: [],
      activeCourse: {},
      activeCollection: {},
      activeModelSection: {},
      activeModel: {},
    }),
  }
);
