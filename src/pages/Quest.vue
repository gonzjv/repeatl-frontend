<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import {
  getProgress,
  createProgress,
  updateProgress,
} from '../services/progressService';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../store/user';
import {
  countPhrases,
  getPercentage,
} from '@/helpers/questHelpers';
import { countNotCompletedPhraseAmount } from '../helpers/questHelpers';
import { getModelSectionState } from '@/services/modelSectionStateService';

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
});
const {
  currentModel,
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
} = toRefs(state);

const updateState = async () => {
  console.log('update state!');

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

  // if (
  //   wordSectionState.value.wordStateArr &&
  //   wordSectionState.value.wordStateArr.length > 0
  // ) {
  //   updateWordArrToDo();
  //   updateCurrentWord();
  //   updatePercentage();
  // }
};

onBeforeMount(async () => {
  await updateState();
  phraseAmount.value = countPhrases(
    currentSection.value
  );
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

const completeSection = () => {
  console.log('COMPLETE SECTION');
  isSectionComplete.value = true;
  percentage.value = 100;
};

const completeModel = async () => {
  console.log('COMPLETE MODEL');
  if (
    progress.value.modelStep ==
    currentSection.value.models.length - 1
  ) {
    completeSection();
    return;
  }
  progress.value.phraseStep = 0;
  progress.value.modelStep += 1;
  await updateProgress(
    userData.token,
    progress.value
  );

  currentModel.value =
    currentSection.value.models[
      progress.value.modelStep
    ];
  currentPhrase.value =
    currentModel.value.phrases[
      progress.value.phraseStep
    ];
  prevPhrases.value = [];

  // updatePercentage();
  notCompletedPhraseAmount.value =
    countNotCompletedPhraseAmount(
      progress.value,
      currentSection.value
    );

  percentage.value = getPercentage(
    phraseAmount.value,
    notCompletedPhraseAmount.value
  );

  resetAnswer();
};

const completePhrase = async () => {
  console.log('COMPLETE PHRASE');
  if (
    progress.value.phraseStep ==
    currentModel.value.phrases.length - 1
  ) {
    completeModel();
    return;
  }

  prevPhrases.value.push(currentPhrase.value);
  progress.value.phraseStep += 1;
  console.log('progress.value', progress.value);
  await updateProgress(
    userData.token,
    progress.value
  );

  currentPhrase.value =
    currentModel.value.phrases[
      progress.value.phraseStep
    ];

  // updatePercentage();
  notCompletedPhraseAmount.value =
    countNotCompletedPhraseAmount(
      progress.value,
      currentSection.value
    );

  percentage.value = getPercentage(
    phraseAmount.value,
    notCompletedPhraseAmount.value
  );

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
    <p>{{ modelSectionState }}</p>
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
