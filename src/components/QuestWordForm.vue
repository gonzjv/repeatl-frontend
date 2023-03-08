<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import { useUserStore } from '../store/user';
import {
  getPercentage,
  WORD_BATCH_NUMBER,
  setSecondRepeatActive,
} from '@/helpers/questHelpers';
import {
  addWordSectionState,
  updateWordSectionState,
  getWordSectionState,
} from '../services/wordSectionStateService';
import {
  addWordState,
  completeWordState,
  completeFirstRepeatBatch,
} from '@/services/wordStateService';

const courseStore = useCourseStore();
const {
  currentSection,
  currentWord,
  isAnswerCorrect,
  isAnswerFullfilled,
  answer,
  isFirstRepeatActive,
  isSectionComplete,
} = storeToRefs(courseStore);

const userStore = useUserStore();

const {
  userData,
  collectionState,
  wordSectionState,
} = storeToRefs(userStore);

const state = reactive({
  wordAmount: 0,
  notCompletedWordAmount: 0,
  wordArrToDo: [],
  completedWordArr: [],
  lastWord: {},
});
const {
  wordAmount,
  notCompletedWordAmount,
  wordArrToDo,
  completedWordArr,
  lastWord,
} = toRefs(state);

const updateState = async () => {
  const stateFromApi = await getWordSectionState(
    collectionState.value.id,
    currentSection.value.id,
    userData.value.token
  );
  console.log('stateFromApi', stateFromApi);

  stateFromApi &&
    userStore.$patch({
      wordSectionState: stateFromApi,
    });

  if (
    wordSectionState.value.wordStateArr &&
    wordSectionState.value.wordStateArr.length > 0
  ) {
    updateWordArrToDo();
    updateCurrentWord();
    updatePercentage();
  }
};

const updateCurrentWord = () => {
  if (wordArrToDo.value.length > 0) {
    courseStore.$patch({
      currentWord: wordArrToDo.value[0],
    });
  }
};

const updateWordArrToDo = () => {
  wordSectionState.value.isSecondRepeatActive &&
    (wordArrToDo.value =
      currentSection.value.words.filter(
        (word) =>
          wordSectionState.value.wordStateArr.find(
            (e) => e.wordId == word.id
          ).isCompleted == false
      ));

  wordSectionState.value.isIntroActive &&
    (wordArrToDo.value =
      currentSection.value.words.filter(
        (word) =>
          wordSectionState.value.wordStateArr.find(
            (e) => e.wordId == word.id
          ).isFirstRepeatComplete == false
      ));

  console.log('wordArrToDo', wordArrToDo.value);
};

const updatePercentage = () => {
  wordAmount.value =
    currentSection.value.words.length;

  notCompletedWordAmount.value =
    wordArrToDo.value.length;

  const newPercentage = getPercentage(
    wordAmount.value,
    notCompletedWordAmount.value
  );
  console.log(
    'percentage',
    courseStore.percentage
  );
  courseStore.$patch({
    percentage: newPercentage,
  });
};

const addWordArrToState = async () => {
  let wordStateArr = [];
  for (const word of currentSection.value.words) {
    const newWordState = await addWordState(
      wordSectionState.value.id,
      word.id,
      userData.value.token
    );
    console.log('newWordState', newWordState);
    wordStateArr.push(newWordState);
  }
  return wordStateArr;
};

onBeforeMount(async () => {
  await updateState();

  lastWord.value =
    currentSection.value.words.at(-1);

  if (!wordSectionState.value.id) {
    const newWordSectionState =
      await addWordSectionState(
        collectionState.value.id,
        currentSection.value.id,
        userData.value.token
      );
    console.log(
      'newWordSectionState',
      newWordSectionState
    );
    userStore.$patch({
      wordSectionState: newWordSectionState,
    });

    await addWordArrToState();
    await updateState();
  }
});

onBeforeUnmount(async () => {
  userStore.$patch({
    wordSectionState: false,
  });
  courseStore.$patch({
    isSectionComplete: false,
    isAnswerCorrect: true,
    isAnswerFullfilled: false,
    answer: '',
  });
});

const checkAnswer = () => {
  const answerLength =
    answer.value.split('').length;
  const wordToCompare = currentWord.value.foreign;
  const phraseLength =
    wordToCompare.split('').length;
  const stringToCompare = wordToCompare
    .split('')
    .slice(0, answerLength)
    .join('');

  courseStore.$patch({
    isAnswerCorrect:
      answer.value == stringToCompare
        ? true
        : false,
    isAnswerFullfilled:
      answerLength == phraseLength ? true : false,
  });
};

const handleFormSubmit = () => {
  console.log('SUBMIT!!!');
  if (
    isAnswerCorrect.value &&
    isAnswerFullfilled.value
  ) {
    console.log('SUBMIT_correct!!!');
    completeWord();
  }
};

const completeSection = async () => {
  console.log('COMPLETE SECTION');
  courseStore.$patch({
    isSectionComplete: true,
  });

  const stateToUpdate = {
    id: wordSectionState.value.id,
    isCompleted: true,
    isFirsrRepeatActive: false,
    isSecondRepeatActive: false,
  };
  await updateWordSectionState(
    userData.value.token,
    stateToUpdate
  );
};

const completeWord = async () => {
  console.log('COMPLETE WORD');

  if (wordSectionState.value.isIntroActive) {
    completedWordArr.value.push(
      currentWord.value
    );

    wordArrToDo.value =
      wordArrToDo.value.slice(1);

    updateCurrentWord();

    if (
      completedWordArr.value.length ==
      WORD_BATCH_NUMBER
    ) {
      if (!isFirstRepeatActive.value) {
        courseStore.$patch({
          isFirstRepeatActive: true,
        });
        wordArrToDo.value =
          completedWordArr.value;
        completedWordArr.value = [];

        updateCurrentWord();
      } else {
        courseStore.$patch({
          isFirstRepeatActive: false,
        });

        let wordStateIdArr = [];
        completedWordArr.value.map((word) => {
          const wordState =
            wordSectionState.value.wordStateArr.find(
              (e) => e.wordId == word.id
            );
          wordStateIdArr.push(wordState.id);
        });

        await completeFirstRepeatBatch(
          userData.value.token,
          wordStateIdArr
        );
        completedWordArr.value = [];

        const isFirstRepeatComplete =
          lastWord.value == currentWord.value &&
          true;
        console.log(
          'isFirstRepeatComplete',
          isFirstRepeatComplete
        );

        isFirstRepeatComplete &&
          (await setSecondRepeatActive(
            userData.value.token,
            wordSectionState.value.id
          ));

        await updateState();
        resetAnswer();
        return;
      }
    }
  }

  if (
    wordSectionState.value.isSecondRepeatActive
  ) {
    const currentWordState =
      wordSectionState.value.wordStateArr.find(
        (e) => e.wordId == currentWord.value.id
      );
    await completeWordState(
      userData.value.token,
      currentWordState.id
    );

    await updateState();

    if (wordArrToDo.value.length == 0) {
      completeSection();
      return;
    }
  }
  resetAnswer();
};

const resetAnswer = () => {
  courseStore.$patch({
    isAnswerCorrect: true,
    isAnswerFullfilled: false,
    answer: '',
  });
};
</script>
<template>
  <form
    @submit.prevent="handleFormSubmit"
    class="relative w-full flex justify-center items-center"
  >
    <aside
      class="absolute left-0 -top-7 text-red-600 text-sm font-light"
      v-if="!isAnswerCorrect"
    >
      Проверьте корректность ввода фразы
    </aside>
    <input
      placeholder="Введите фразу..."
      @input="checkAnswer"
      v-model="answer"
      class="p-3 shadow-lg w-full bg-white rounded-lg border-2 border-transparent focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
      type="text"
    />
    <button
      v-if="isAnswerCorrect && isAnswerFullfilled"
      class="absolute top-1 -right-40 text-white w-32 h-10 bg-emerald-400 rounded-md"
      type="submit"
    >
      Дальше
    </button>
    <aside
      class="absolute -right-40 -top-10 text-xs flex gap-2 items-center text-emerald-400"
      v-if="isSectionComplete"
    >
      <CheckBadgeIcon class="w-5" />
      <span>Раздел завершен</span>
    </aside>

    <router-link
      class="absolute -top-2 -right-72 text-sky-400"
      v-if="isSectionComplete"
      to="/wordList"
    >
      в коллекцию</router-link
    >
  </form>
</template>
