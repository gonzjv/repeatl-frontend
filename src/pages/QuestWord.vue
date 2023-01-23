<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../store/user';
import {
  getPercentage,
  WORD_BATCH_NUMBER,
  setIntroActive,
  setFirstRepeatActive,
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
  currentCourse,
  currentSection,
  currentCollection,
} = storeToRefs(courseStore);

const userStore = useUserStore();

const {
  userData,
  collectionState,
  wordSectionState,
} = storeToRefs(userStore);

const state = reactive({
  currentWord: currentSection.value.words[0],
  progress: {},
  wordAmount: 0,
  notCompletedWordAmount: 0,
  percentage: 0,
  answer: '',
  isAnswerCorrect: true,
  isAnswerFullfilled: false,
  isSectionComplete: false,
  isFirstRepeatActive: false,
  wordArrToDo: [],
  completedWordArr: [],
  lastWord: {},
});
const {
  currentWord,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
  isSectionComplete,
  isFirstRepeatActive,
  wordAmount,
  notCompletedWordAmount,
  percentage,
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
    currentWord.value = wordArrToDo.value[0];
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

  percentage.value = getPercentage(
    wordAmount.value,
    notCompletedWordAmount.value
  );
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

  isAnswerCorrect.value =
    answer.value == stringToCompare
      ? true
      : false;

  isAnswerFullfilled.value =
    answerLength == phraseLength ? true : false;
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
  isSectionComplete.value = true;
  percentage.value = 100;

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

    console.log('currentWord', currentWord.value);
    console.log('wordArrToDo', wordArrToDo.value);
    console.log(
      'completedWordArr',
      completedWordArr.value
    );
    if (
      completedWordArr.value.length ==
      WORD_BATCH_NUMBER
    ) {
      if (!isFirstRepeatActive.value) {
        isFirstRepeatActive.value = true;
        wordArrToDo.value =
          completedWordArr.value;
        completedWordArr.value = [];

        updateCurrentWord();
      } else {
        isFirstRepeatActive.value = false;

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
  isAnswerCorrect.value = true;
  isAnswerFullfilled.value = false;
  answer.value = '';
};
</script>

<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <nav
      class="flex justify-start gap-2 text-sky-400"
    >
      <router-link to="/course">
        {{ currentCourse.name }}
      </router-link>
      <p>/</p>
      <router-link to="/wordList"
        >Коллекция
        {{ currentCollection.name }}</router-link
      >
    </nav>
    <h2 class="text-xl">
      {{ currentSection.label }}
    </h2>
    <section class="flex gap-10 w-full">
      <aside class="flex flex-col gap-5">
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
        >
          <p>
            Word section:
            {{ currentSection.number }}
          </p>
        </div>
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
        >
          <p>
            Progress:
            {{ percentage }} %
          </p>
        </div>
      </aside>
      <div class="w-6/12 flex flex-col gap-10">
        <div
          class="h-80 shadow-lg rounded-lg flex flex-col gap-51 items-center justify-start"
        >
          <div
            v-if="!isSectionComplete"
            class="w-full flex flex-col gap-7 items-start justify-start p-20"
          >
            <p>
              {{ currentWord.native }}
            </p>
            <p class="font-extralight">
              {{ currentWord.mnemoTag }}
            </p>
            <div
              :class="
                !isAnswerCorrect
                  ? 'text-red-600'
                  : isAnswerFullfilled &&
                    'text-emerald-400'
              "
              class="relative transition duration-500"
            >
              <aside
                class="absolute -left-8 top-0"
                v-if="!isAnswerCorrect"
              >
                <InformationCircleIcon
                  class="w-5"
                />
              </aside>
              <aside
                class="absolute -left-8 top-0"
                v-if="
                  isAnswerCorrect &&
                  isAnswerFullfilled
                "
              >
                <CheckBadgeIcon class="w-5" />
              </aside>
              <span
                v-if="
                  (wordSectionState.isIntroActive &&
                    !isFirstRepeatActive) ||
                  !isAnswerCorrect ||
                  (isAnswerCorrect &&
                    isAnswerFullfilled)
                "
              >
                {{ currentWord.foreign }}
              </span>
            </div>
            <p
              v-if="
                (wordSectionState.isIntroActive &&
                  !isFirstRepeatActive) ||
                !isAnswerCorrect ||
                (isAnswerCorrect &&
                  isAnswerFullfilled)
              "
              class="font-extralight"
            >
              {{ currentWord.transcription }}
            </p>
          </div>
        </div>
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
            v-if="
              isAnswerCorrect &&
              isAnswerFullfilled
            "
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
      </div>
      <aside>
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
        >
          <p
            v-if="
              wordSectionState.isIntroActive &&
              !isFirstRepeatActive
            "
          >
            Ознакомление
          </p>
          <p v-if="isFirstRepeatActive">
            Первое повторение
          </p>
          <p
            v-if="
              wordSectionState.isSecondRepeatActive
            "
          >
            Второе повторение
          </p>
        </div>
      </aside>
    </section>
  </main>
</template>
