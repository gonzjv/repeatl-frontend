<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const props = defineProps({
  route: String,
});

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
    <router-link :to="props.route"
      >Коллекция
      {{ currentCollection.number }}</router-link
    >
  </nav>
</template>
