<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { isSectionComplete, isRepeatOptional } =
  storeToRefs(courseStore);
</script>
<template>
  <router-link
    class="text-sky-400 p-4 shadow-lg rounded-lg"
    v-if="isSectionComplete"
    :to="
      isRepeatOptional
        ? '/modelList'
        : '/todayTask'
    "
  >
    {{
      isRepeatOptional
        ? 'в коллекцию'
        : 'к заданиям на сегодня'
    }}
  </router-link>
</template>
