<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useUserStore } from '../store/user';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';

const courseStore = useCourseStore();
const {
  currentWord,
  isAnswerCorrect,
  isAnswerFullfilled,
  isFirstRepeatActive,
  isSectionComplete,
} = storeToRefs(courseStore);
const userStore = useUserStore();

const {
  userData,
  collectionState,
  wordSectionState,
} = storeToRefs(userStore);
</script>
<template>
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
          <InformationCircleIcon class="w-5" />
        </aside>
        <aside
          class="absolute -left-8 top-0"
          v-if="
            isAnswerCorrect && isAnswerFullfilled
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
          (isAnswerCorrect && isAnswerFullfilled)
        "
        class="font-extralight"
      >
        {{ currentWord.transcription }}
      </p>
    </div>
  </div>
</template>
