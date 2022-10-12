import { defineStore } from 'pinia';

export const useCourseStore = defineStore(
  'course',
  {
    state: () => ({
      currentCourse: {},
      currentCollection: {},
      currentSubCollection: {},
    }),
  }
);
