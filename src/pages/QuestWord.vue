<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import {
  createProgressWord,
  getProgressWord,
  updateProgressWord,
} from '../services/progressWordService';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../store/user';
import {
  countNotCompletedWordAmount,
  getPercentage,
} from '@/helpers/questHelpers';

const courseStore = useCourseStore();
const {
  currentCourse,
  currentSection,
  currentCollection,
} = storeToRefs(courseStore);

const userStore = useUserStore();
const { userData } = userStore;

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
});
const {
  currentWord,
  progress,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
  isSectionComplete,
  wordAmount,
  notCompletedWordAmount,
  percentage,
} = toRefs(state);

onBeforeMount(async () => {
  progress.value = await getProgressWord(
    currentCollection.value.id,
    userData.id,
    userData.token
  );

  console.log(
    'progress before mount',
    progress.value
  );
  if (!progress.value.id) {
    console.log('progress not found');

    const initProgress = {
      userId: userData.id,
      wordStep: 0,
      sectionStep: 0,
      collectionId: currentCollection.value.id,
    };
    console.log('userData', userStore.userData);
    progress.value = await createProgressWord(
      initProgress,
      userData.token
    );
  }

  wordAmount.value =
    currentSection.value.words.length;

  notCompletedWordAmount.value =
    countNotCompletedWordAmount(
      progress.value,
      currentSection.value
    );

  percentage.value = getPercentage(
    wordAmount.value,
    notCompletedWordAmount.value
  );

  const initWord =
    currentSection.value.words[
      progress.value.wordStep
    ];

  currentWord.value = initWord;
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

const completeSection = () => {
  console.log('COMPLETE SECTION');
  isSectionComplete.value = true;
  percentage.value = 100;
};

const completeWord = async () => {
  console.log('COMPLETE WORD');
  if (
    progress.value.wordStep ==
    currentSection.value.words.length - 1
  ) {
    completeSection();
    return;
  }

  progress.value.wordStep += 1;
  console.log('progress.value', progress.value);
  await updateProgressWord(
    userData.token,
    progress.value
  );
  currentWord.value =
    currentSection.value.words[
      progress.value.wordStep
    ];

  notCompletedWordAmount.value =
    countNotCompletedWordAmount(
      progress.value,
      currentSection.value
    );

  percentage.value = getPercentage(
    wordAmount.value,
    notCompletedWordAmount.value
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
          class="h-80 shadow-lg rounded-lg flex flex-col gap-51 items-center justify-center"
        >
          <div
            class="h-1/2 w-full flex flex-col gap-7 items-start justify-center p-20"
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
              <span>
                {{ currentWord.foreign }}
              </span>
            </div>
            <p class="font-extralight">
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
      <aside>help</aside>
    </section>
  </main>
</template>
