<script setup>
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';

const store = useCourseStore();
const { currentCourse, currentSubCollection } =
  storeToRefs(store);
console.log(
  'current',
  currentSubCollection.value
);
</script>
<template>
  <main class="w-full flex flex-col items-center">
    <h2
      class="flex justify-center items-center bg-fuchsia-400 text-white w-1/3 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </h2>
    <ul class="w-full">
      <li
        v-for="model in currentSubCollection.models"
        class="p-5 flex gap-20 w-full border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
      >
        {{ model.label }}
      </li>
    </ul>
  </main>
</template>
