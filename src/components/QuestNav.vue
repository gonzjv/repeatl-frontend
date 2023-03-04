<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { currentCourse, currentCollection } =
  storeToRefs(courseStore);
</script>
<template>
  <nav
    class="flex justify-start gap-2 text-sky-400"
  >
    <router-link to="/course">
      {{ currentCourse.name }}
    </router-link>
    <p>/</p>
    <router-link to="/modelList"
      >Коллекция
      {{ currentCollection.number }}</router-link
    >
  </nav>
</template>
