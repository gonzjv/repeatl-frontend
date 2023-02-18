import { updateWordSectionState } from '../services/wordSectionStateService';

const WORD_BATCH_NUMBER = 2;

const countPhrases = (section) => {
  let result = 0;
  section.models.forEach((model) => {
    result += model.phrases.length;
  });

  return result;
};

const getPercentage = (amount, notCompleted) => {
  return Math.floor(
    ((amount - notCompleted) / amount) * 100
  );
};

const setIntroActive = async (
  wordSectionsStateId
) => {
  const stateToUpdate = {
    id: wordSectionsStateId,
    isCompleted: false,
    isIntroActive: true,
    isFirsrRepeatActive: false,
    isSecondRepeatActive: false,
  };
  await updateWordSectionState(
    userData.value.token,
    stateToUpdate
  );
};

const setFirstRepeatActive = async (
  wordSectionsStateId
) => {
  const stateToUpdate = {
    id: wordSectionsStateId,
    isCompleted: false,
    isIntroActive: false,
    isFirsrRepeatActive: true,
    isSecondRepeatActive: false,
  };
  await updateWordSectionState(
    userData.value.token,
    stateToUpdate
  );
};

const setSecondRepeatActive = async (
  token,
  wordSectionsStateId
) => {
  const stateToUpdate = {
    id: wordSectionsStateId,
    isCompleted: false,
    isIntroActive: false,
    isFirsrRepeatActive: false,
    isSecondRepeatActive: true,
  };
  await updateWordSectionState(
    token,
    stateToUpdate
  );
};

export {
  countPhrases,
  getPercentage,
  WORD_BATCH_NUMBER,
  setIntroActive,
  setFirstRepeatActive,
  setSecondRepeatActive,
};
