import { defineStore } from 'pinia';

export const useControlBoardStore = defineStore(
  'controlBoard',
  {
    state: () => ({
      courses: [],
      collections: [],
      modelSections: [],
      wordSections: [],
      models: [],
      phrases: [],
      activeCourse: {},
      activeCollection: {},
      activeModelSection: {},
      activeModel: {},
    }),
  }
);
