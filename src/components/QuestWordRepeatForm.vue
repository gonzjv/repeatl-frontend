<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue';
import { useUserStore } from '../store/user';
import { getPercentage } from '@/helpers/questHelpers';
import QuestWordInput from './QuestWordInput.vue';
import { completeWordRepeat } from '../services/wordSectionStateService';

const courseStore = useCourseStore();
const {
  currentSection,
  currentWord,
  isAnswerCorrect,
  isAnswerFullfilled,
  percentage,
} = storeToRefs(courseStore);

const userStore = useUserStore();
const { userData, collectionState } =
  storeToRefs(userStore);

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

const updateCurrentWord = () => {
  if (wordArrToDo.value.length > 0) {
    courseStore.$patch({
      currentWord: wordArrToDo.value[0],
    });
  }
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

onBeforeMount(async () => {
  wordArrToDo.value = currentSection.value.words;
  courseStore.$patch({
    isRepeatActive: true,
  });

  updateCurrentWord();
  updatePercentage();

  lastWord.value =
    currentSection.value.words.at(-1);
});

onBeforeUnmount(async () => {
  userStore.$patch({
    wordSectionState: false,
  });
  courseStore.$patch({
    isRepeatActive: false,
    isSectionComplete: false,
    isAnswerCorrect: true,
    isAnswerFullfilled: false,
    answer: '',
  });
});

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

  await completeWordRepeat(
    userData.value.token,
    collectionState.value.id,
    currentSection.value.id
  );
};

const completeWord = async () => {
  console.log('COMPLETE WORD');
  completedWordArr.value.push(currentWord.value);

  wordArrToDo.value = wordArrToDo.value.slice(1);

  updateCurrentWord();
  updatePercentage();

  percentage.value >= 100 && completeSection();
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
    <QuestWordInput />
    <!-- <button
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
    > -->
  </form>
</template>
