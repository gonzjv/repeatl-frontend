import { defineStore } from 'pinia';

export const useDisplayStore = defineStore(
  'display',
  {
    state: () => ({
      isNavLogoDisplay: false,
      isPopupDisplay: false,
      isSectionPopupDisplay: false,
      isLoginPopupDisplay: false,
      isBoardPopupDisplay: false,
      popupElement: '',
      isTodayWordsDisplay: false,
    }),
  }
);
