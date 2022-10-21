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
});
const {
  currentModel,
  currentPhrase,
  progress,
  answer,
  isAnswerCorrect,
  isAnswerFullfilled,
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
        <ul
          class="h-80 border-[1px] border-sky-400 rounded-md flex flex-col gap-51 items-center"
        >
          <li>asdasd{{ progress }}</li>
          <li>
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
              class="relative"
            >
              <aside
                class="absolute -left-8 top-0"
                v-if="!isAnswerCorrect"
              >
                <InformationCircleIcon
                  class="text-red-600 w-5"
                />
              </aside>
              <aside
                class="absolute -left-8 top-0"
                v-if="
                  isAnswerCorrect &&
                  isAnswerFullfilled
                "
              >
                <CheckBadgeIcon
                  class="text-emerald-400 w-5"
                />
              </aside>
              <span>
                {{ currentPhrase.foreign }}
              </span>
            </div>
          </li>
        </ul>
        <form
          class="relative w-full flex justify-center items-center"
          action=""
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
        </form>
      </div>
      <aside>help</aside>
    </section>
  </main>
</template>
