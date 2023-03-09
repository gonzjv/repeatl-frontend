<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useUserStore } from '../store/user';

const courseStore = useCourseStore();
const { isFirstRepeatActive, isRepeatActive } =
  storeToRefs(courseStore);

const userStore = useUserStore();

const { wordSectionState } =
  storeToRefs(userStore);
</script>
<template>
  <aside>
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
  </aside>
</template>
