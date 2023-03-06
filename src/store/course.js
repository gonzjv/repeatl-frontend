import { defineStore } from 'pinia';

export const useCourseStore = defineStore(
  'course',
  {
    state: () => ({
      currentCourse: {},
      currentCollection: {},
      currentSection: {},
      currentModel: {},
      currentPhrase: {},
      percentage: 0,
      prevPhraseArr: [],
    }),
  }
);
