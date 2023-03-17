<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useUserStore } from '../store/user';
import { CheckBadgeIcon } from '@heroicons/vue/24/outline';

const courseStore = useCourseStore();
const {
  isFirstRepeatActive,
  isRepeatActive,
  isSectionComplete,
  isAnswerCorrect,
  isAnswerFullfilled,
} = storeToRefs(courseStore);

const userStore = useUserStore();

const { wordSectionState } =
  storeToRefs(userStore);
</script>
<template>
  <aside
    class="flex flex-col justify-between h-full"
  >
    <div
      class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
    >
      <p
        v-if="
          wordSectionState.isIntroActive &&
          !isFirstRepeatActive
        "
      >
        Ознакомление
      </p>
      <p v-if="isFirstRepeatActive">
        Первое повторение
      </p>
      <p
        v-if="
          wordSectionState.isSecondRepeatActive
        "
      >
        Второе повторение
      </p>
      <p v-if="isRepeatActive">Повторение</p>
    </div>
    <aside
      class="text-xs flex gap-2 items-center text-emerald-400"
      v-if="isSectionComplete"
    >
      <CheckBadgeIcon class="w-5" />
      <span>Раздел завершен</span>
    </aside>
    <button
      v-if="
        isAnswerCorrect &&
        isAnswerFullfilled &&
        !isSectionComplete
      "
      class="text-white w-32 h-10 bg-emerald-400 rounded-md"
      type="submit"
    >
      Дальше
    </button>
  </aside>
</template>
