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
} from '../services/progressService';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';

const courseStore = useCourseStore();
const {
  currentCourse,
  currentSection,
  currentCollection,
  currentSubCollection,
} = storeToRefs(courseStore);

const state = reactive({
  currentModel: currentSection.value.models[0],
  currentPhrase:
    currentSection.value.models[0].phrases[0],
  progress: {},
  answer: '',
  isAnswerCorrect: true,
  isAnswerFullfilled: false,
  prevPhrases: [],
});
const {
  currentModel,
  currentPhrase,
  progress,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
  prevPhrases,
} = toRefs(state);

const USER_ID = '4';

onBeforeMount(async () => {
  progress.value = await getProgress(
    currentSubCollection.value.id,
    USER_ID
  );
  if (!progress.value.id) {
    console.log('progress not found');

    const initProgress = {
      userId: USER_ID,
      modelStep: 0,
      phraseStep: 0,
      sectionStep: 0,
      subCollectionId: currentCollection.value.id,
    };
    progress.value = await createProgress(
      initProgress
    );
  }
  const initModel =
    currentSection.value.models[
      progress.value.modelStep
    ];

  currentModel.value = initModel;
  console.log('currentModel', currentModel.value);
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
    if (
      progress.value.phraseStep ==
      currentModel.value.phrases.length - 1
    ) {
      completeModel();
      return;
    }
    completePhrase();
  }
};

const completeModel = () => {
  console.log('COMPLETE MODEL');
  progress.value.phraseStep = 0;
  progress.value.modelStep += 1;
  currentModel.value =
    currentSection.value.models[
      progress.value.modelStep
    ];
  currentPhrase.value =
    currentModel.value.phrases[
      progress.value.phraseStep
    ];

  resetAnswer();
};

const completePhrase = () => {
  console.log('COMPLETE PHRASE');
  prevPhrases.value.push(currentPhrase.value);
  progress.value.phraseStep += 1;
  currentPhrase.value =
    currentModel.value.phrases[
      progress.value.phraseStep
    ];
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
      <router-link to="/collections">
        {{ currentCourse.name }}
      </router-link>
      <p>/</p>
      <router-link to="/modelSubCollection"
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
          class="flex gap-2 items-center justify-between"
        >
          <p>Model:</p>
          <span
            class="border-[1px] w-14 h-14 border-sky-400 rounded-md"
            >model number</span
          >
        </div>
        <div
          class="flex gap-2 items-center justify-between"
        >
          <p>Progress:</p>
          <span
            class="border-[1px] w-14 h-14 border-sky-400 rounded-md"
          >
            progress, %</span
          >
        </div>
      </aside>
      <div class="w-6/12 flex flex-col gap-10">
        <div
          class="h-80 border-[1px] border-sky-400 rounded-md flex flex-col gap-51 items-center"
        >
          <!-- <p>{{ progress }}</p> -->
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
            class="w-full bg-white border-[1px] rounded-md border-sky-400 focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
            type="text"
          />
          <button
            class="absolute top-0 -right-20"
            type="submit"
          >
            button
          </button>
        </form>
      </div>
      <aside>help</aside>
    </section>
  </main>
</template>
