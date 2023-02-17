<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../store/user';
import {
  countPhrases,
  getPercentage,
} from '@/helpers/questHelpers';
import {
  getModelSectionState,
  addModelSectionState,
  updateModelSectionState,
} from '@/services/modelSectionStateService';
import {
  addModelStateArr,
  completeModelRequest,
} from '@/services/modelStateService';

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
  modelSectionState,
} = storeToRefs(userStore);

const state = reactive({
  currentModel: currentSection.value.models[0],
  currentModelState: {},
  currentPhrase:
    currentSection.value.models[0].phrases[0],
  progress: {},
  phraseAmount: 0,
  notCompletedPhraseAmount: 0,
  percentage: 0,
  answer: '',
  isAnswerCorrect: true,
  isAnswerFullfilled: false,
  isSectionComplete: false,
  prevPhrases: [],
  phraseArrToDo: [],
  modelArrToDo: [],
});
const {
  currentModel,
  currentModelState,
  currentPhrase,
  progress,
  phraseAmount,
  notCompletedPhraseAmount,
  percentage,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
  isSectionComplete,
  prevPhrases,
  phraseArrToDo,
  modelArrToDo,
} = toRefs(state);

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
  currentModel.value = modelArrToDo.value[0];
  phraseArrToDo.value =
    currentModel.value.phrases;
};

const updateCurrentPhrase = () => {
  currentPhrase.value = phraseArrToDo.value[0];
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

const updatePercentage = () => {
  const notDonePhraseAmount =
    modelArrToDo.value.reduce(
      (accu, model) =>
        accu + model.phrases.length,
      0
    ) - prevPhrases.value.length;

  percentage.value = getPercentage(
    phraseAmount.value,
    notDonePhraseAmount
  );
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

onBeforeMount(async () => {
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

  isAnswerCorrect.value =
    answer.value == stringToCompare
      ? true
      : false;

  isAnswerFullfilled.value =
    answerLength == phraseLength ? true : false;
};

const resetAnswer = () => {
  isAnswerCorrect.value = true;
  isAnswerFullfilled.value = false;
  answer.value = '';
};

const resetPrevPhrases = () =>
  (prevPhrases.value = []);
const resetCurrentPhrase = () =>
  (currentPhrase.value = {});

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

  prevPhrases.value.push(currentPhrase.value);
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
  console.log(
    'currentModelState',
    currentModelState.value
  );

  const res = await completeModelRequest(
    userData.value.token,
    currentModelState.value.id
  );
  console.log('res', res);

  if (modelArrToDo.value.length == 0) {
    completeSection();
    resetPrevPhrases();
    resetCurrentPhrase();
    return;
  }
  prevPhrases.value = [];
  updatePhraseArrToDo();
  updateCurrentPhrase();
  // updatePercentage();

  // percentage.value = getPercentage(
  //   phraseAmount.value,
  //   notCompletedPhraseAmount.value
  // );

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
  // percentage.value = 100;
};
</script>

<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <p>
      modelSectionState {{ modelSectionState }}
    </p>
    <nav
      class="flex justify-start gap-2 text-sky-400"
    >
      <router-link to="/course">
        {{ currentCourse.name }}
      </router-link>
      <p>/</p>
      <router-link to="/modelList"
        >Коллекция
        {{
          currentCollection.number
        }}</router-link
      >
    </nav>
    <h2 class="text-xl">
      {{ currentSection.label }}
    </h2>
    <section class="flex gap-10 w-full">
      <aside class="flex flex-col gap-5 w-2/12">
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-center"
        >
          <p>Model: {{ currentModel.number }}</p>
        </div>
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-center"
        >
          <p>
            Progress:
            {{ percentage }} %
          </p>
        </div>
      </aside>
      <div class="w-6/12 flex flex-col gap-10">
        <div
          class="h-80 shadow-lg rounded-lg flex flex-col gap-51 items-center"
        >
          <ul
            class="h-1/2 w-full flex flex-col gap-5 items-start justify-center p-20"
          >
            <li v-for="prev in prevPhrases">
              <p class="font-extralight text-xs">
                {{ prev.native }}
              </p>
              <p class="text-xs">
                {{ prev.foreign }}
              </p>
            </li>
          </ul>
          <div
            class="h-1/2 w-full flex flex-col items-start justify-center p-20"
          >
            <p class="font-extralight">
              {{ currentPhrase.native }}
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
              <span>
                {{ currentPhrase.foreign }}
              </span>
            </div>
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
            class="w-full bg-white shadow-lg rounded-lg p-3 border-2 border-transparent focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
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
            to="/modelList"
          >
            в коллекцию</router-link
          >
        </form>
      </div>
      <aside>help</aside>
    </section>
  </main>
</template>
