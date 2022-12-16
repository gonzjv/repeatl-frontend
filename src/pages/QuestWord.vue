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
  answer: '',
  isAnswerCorrect: true,
  isAnswerFullfilled: false,
  isSectionComplete: false,
  prevWordArr: [],
});
const {
  currentWord,
  progress,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
  isSectionComplete,
  prevWordArr,
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
  console.log('progress', progress.value);
  const initWord =
    currentSection.value.words[
      progress.value.wordStep
    ];

  currentWord.value = initWord;
  // currentPhrase.value =
  //   currentModel.value.phrases[
  //     progress.value.phraseStep
  //   ];

  // console.log('currentModel', currentModel.value);
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

  prevWordArr.value.push(currentWord.value);
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
          <p>Word section:</p>
          <span class="w-14 h-14"
            >word section number</span
          >
        </div>
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
        >
          <p>Progress:</p>
          <span class="w-14 h-14">
            progress, %</span
          >
        </div>
      </aside>
      <div class="w-6/12 flex flex-col gap-10">
        <div
          class="h-80 shadow-lg rounded-lg flex flex-col gap-51 items-center"
        >
          <ul
            class="h-1/2 w-full flex flex-col gap-5 items-start justify-center p-20"
          >
            <li v-for="prev in prevWordArr">
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
              {{ currentWord.native }}
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
            class="p-3 shadow-lg w-full bg-white rounded-lg focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
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
