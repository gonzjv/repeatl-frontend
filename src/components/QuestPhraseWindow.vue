<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  InformationCircleIcon,
  CheckBadgeIcon,
} from '@heroicons/vue/24/outline';

const courseStore = useCourseStore();
const {
  prevPhraseArr,
  currentPhrase,
  isAnswerCorrect,
  isAnswerFullfilled,
  isRepeatActive,
} = storeToRefs(courseStore);
</script>
<template>
  <div
    class="h-80 shadow-lg rounded-lg flex flex-col gap-51 items-center"
  >
    <ul
      class="h-1/2 w-full flex flex-col gap-5 items-start justify-center p-20"
    >
      <li v-for="prev in prevPhraseArr">
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
        class="w-full relative transition duration-500"
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
          class="absolute left-0"
          v-if="
            !isRepeatActive ||
            !isAnswerCorrect ||
            isAnswerFullfilled
          "
        >
          {{ currentPhrase.foreign }}
        </span>
      </div>
    </div>
  </div>
</template>
