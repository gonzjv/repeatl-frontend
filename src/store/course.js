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
      currentWord: {},
      percentage: 0,
      prevPhraseArr: [],
      isAnswerCorrect: true,
      isAnswerFullfilled: false,
      answer: '',
      isSectionComplete: false,
      isFirstRepeatActive: false,
      isRepeatActive: false,
      isRepeatOptional: false,
    }),
  }
);
