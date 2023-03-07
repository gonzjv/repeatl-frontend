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
  getModelSectionState,
  addModelSectionState,
  updateModelSectionState,
} from '@/services/modelSectionStateService';
import { useUserStore } from '../store/user';
import {
  countPhrases,
  getPercentage,
} from '@/helpers/questHelpers';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';
import {
  addModelStateArr,
  completeModelRequest,
} from '@/services/modelStateService';

const courseStore = useCourseStore();
const {
  isAnswerCorrect,
  isAnswerFullfilled,
  currentPhrase,
  prevPhraseArr,
  currentSection,
  currentModel,
} = storeToRefs(courseStore);

const userStore = useUserStore();
const {
  userData,
  collectionState,
  modelSectionState,
} = storeToRefs(userStore);

const state = reactive({
  phraseArrToDo: [],
  answer: '',
  modelArrToDo: [],
  phraseAmount: 0,
  isSectionComplete: false,
  currentModelState: {},
});
const {
  phraseArrToDo,
  answer,
  modelArrToDo,
  phraseAmount,
  isSectionComplete,
  currentModelState,
} = toRefs(state);

onBeforeMount(async () => {
  courseStore.$patch({
    currentPhrase:
      currentSection.value.models[0].phrases[0],
  });

  await updateState();

  const isStateExist = modelSectionState.value.id
    ? true
    : false;

  if (!isStateExist) {
    await createState();
  }

  phraseAmount.value = countPhrases(
    currentSection.value
  );
  updatePercentage();
});

onBeforeUnmount(async () => {
  userStore.$patch({
    modelSectionState: false,
  });
});

const createState = async () => {
  const newModelSectionState =
    await addModelSectionState(
      collectionState.value.id,
      currentSection.value.id,
      userData.value.token
    );
  console.log(
    'newModelSectionState',
    newModelSectionState
  );
  userStore.$patch({
    modelSectionState: newModelSectionState,
  });

  await addModelStateArr(
    modelSectionState.value.id,
    userData.value.token
  );
  await updateState();
};

const updateModelArrToDo = () => {
  modelArrToDo.value =
    currentSection.value.models.filter(
      (model) =>
        modelSectionState.value.modelStateArr.find(
          (e) => e.modelId == model.id
        ).isCompleted == false
    );
  console.log('modelArrToDo', modelArrToDo.value);
};

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

const updateStateFromApi = async () => {
  const stateFromApi = await getModelSectionState(
    collectionState.value.id,
    currentSection.value.id,
    userData.value.token
  );
  console.log('stateFromApi', stateFromApi);

  stateFromApi &&
    userStore.$patch({
      modelSectionState: stateFromApi,
    });
};

const updateState = async () => {
  console.log('update state!');

  await updateStateFromApi();
  if (
    modelSectionState.value.modelStateArr &&
    modelSectionState.value.modelStateArr.length >
      0
  ) {
    updateModelArrToDo();
    updatePhraseArrToDo();
    updateCurrentPhrase();
  }
};

const checkAnswer = () => {
  const answerLength =
    answer.value.split('').length;
  const phraseToCompare =
    currentPhrase.value.foreign;
  const phraseLength =
    phraseToCompare.split('').length;
  const stringToCompare = phraseToCompare
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

const resetAnswer = () => {
  courseStore.$patch({
    isAnswerCorrect: true,
    isAnswerFullfilled: false,
  });
  answer.value = '';
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
  console.log(
    'phraseArrToDo',
    phraseArrToDo.value
  );

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
  console.log('modelArrToDo', modelArrToDo.value);

  currentModelState.value =
    modelSectionState.value.modelStateArr.find(
      (e) => e.modelId == currentModel.value.id
    );

  const res = await completeModelRequest(
    userData.value.token,
    currentModelState.value.id
  );

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

  const reqData = {
    id: modelSectionState.value.id,
    isCompleted: true,
  };

  const response = await updateModelSectionState(
    userData.value.token,
    reqData
  );
  console.log('response', response);

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
    <input
      placeholder="Введите фразу..."
      @input="checkAnswer"
      v-model="answer"
      class="w-full bg-white shadow-lg rounded-lg p-3 border-2 border-transparent focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
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
      to="/modelList"
    >
      в коллекцию</router-link
    >
  </form>
</template>
