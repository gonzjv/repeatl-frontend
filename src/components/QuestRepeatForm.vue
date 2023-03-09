<script setup>
import { storeToRefs } from 'pinia';
import {
  reactive,
  toRefs,
  onBeforeMount,
  onBeforeUnmount,
} from 'vue';
import { useCourseStore } from '../store/course';
import {
  countPhrases,
  getPercentage,
} from '@/helpers/questHelpers';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import QuestInput from './QuestInput.vue';

const courseStore = useCourseStore();
const {
  isAnswerCorrect,
  isAnswerFullfilled,
  currentPhrase,
  prevPhraseArr,
  currentSection,
  currentModel,
} = storeToRefs(courseStore);

const state = reactive({
  phraseArrToDo: [],
  modelArrToDo: [],
  phraseAmount: 0,
  isSectionComplete: false,
  currentModelState: {},
});
const {
  phraseArrToDo,
  modelArrToDo,
  phraseAmount,
  isSectionComplete,
} = toRefs(state);

onBeforeMount(async () => {
  modelArrToDo.value =
    currentSection.value.models;

  courseStore.$patch({
    isRepeatActive: true,
    currentPhrase:
      currentSection.value.models[0].phrases[0],
    currentModel: modelArrToDo.value[0],
  });

  phraseArrToDo.value =
    currentModel.value.phrases;

  phraseAmount.value = countPhrases(
    currentSection.value
  );
  updatePercentage();
});

onBeforeUnmount(() => {
  courseStore.$patch({
    isRepeatActive: false,
  });
});

const updatePhraseArrToDo = () => {
  courseStore.$patch({
    currentModel: modelArrToDo.value[0],
  });
  phraseArrToDo.value =
    currentModel.value.phrases;
};

const updateCurrentPhrase = () => {
  courseStore.$patch({
    currentPhrase: phraseArrToDo.value[0],
  });
};

const resetAnswer = () => {
  courseStore.$patch({
    isAnswerCorrect: true,
    isAnswerFullfilled: false,
    answer: '',
  });
};

const resetPrevPhrases = () =>
  courseStore.$patch({
    prevPhraseArr: [],
  });
const resetCurrentPhrase = () =>
  courseStore.$patch({
    currentPhrase: {},
  });

const handleFormSubmit = () => {
  console.log('SUBMIT!!!');
  if (
    isAnswerCorrect.value &&
    isAnswerFullfilled.value
  ) {
    console.log('SUBMIT_correct!!!');
    completePhrase();
  }
};

const completePhrase = async () => {
  console.log('COMPLETE PHRASE');
  phraseArrToDo.value =
    phraseArrToDo.value.slice(1);

  courseStore.$patch((state) =>
    state.prevPhraseArr.push(currentPhrase.value)
  );
  updatePercentage();

  if (phraseArrToDo.value.length == 0) {
    completeModel();
  } else {
    updateCurrentPhrase();
  }

  resetAnswer();
};

const completeModel = async () => {
  console.log('COMPLETE MODEL');
  modelArrToDo.value =
    modelArrToDo.value.slice(1);

  if (modelArrToDo.value.length == 0) {
    completeSection();
    resetPrevPhrases();
    resetCurrentPhrase();
    return;
  }
  courseStore.$patch({
    prevPhraseArr: [],
  });

  updatePhraseArrToDo();
  updateCurrentPhrase();

  resetAnswer();
};

const completeSection = async () => {
  console.log('COMPLETE SECTION');

  isSectionComplete.value = true;
};

const updatePercentage = () => {
  const notDonePhraseAmount =
    modelArrToDo.value.reduce(
      (accu, model) =>
        accu + model.phrases.length,
      0
    ) - prevPhraseArr.value.length;

  const newPercentage = getPercentage(
    phraseAmount.value,
    notDonePhraseAmount
  );
  courseStore.$patch({
    percentage: newPercentage,
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
    <QuestInput />
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
      to="/modelList"
    >
      в коллекцию</router-link
    >
  </form>
</template>
