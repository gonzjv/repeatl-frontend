<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';
import { useRouter } from 'vue-router';

const courseStore = useCourseStore();
const { isSectionComplete, isRepeatOptional } =
  storeToRefs(courseStore);

const router = useRouter();

const handleGoBack = () => {
  router.back();
};
</script>
<template>
  <button
    class="text-sky-400 p-4 shadow-lg rounded-lg"
    v-if="isSectionComplete"
    @click="handleGoBack"
  >
    {{
      isRepeatOptional
        ? 'в коллекцию'
        : 'к заданиям на сегодня'
    }}
  </button>
</template>
