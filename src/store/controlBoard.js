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
      wordArr: [],
      activeCourse: {},
      activeCollection: {},
      activeModelSection: {},
      activeWordSection: {},
      activeModel: {},
    }),
  }
);
