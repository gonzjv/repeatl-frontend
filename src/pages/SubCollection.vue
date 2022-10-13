<script setup>
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';

const store = useCourseStore();
const { currentCourse, currentSubCollection } =
  storeToRefs(store);
const { models } = currentSubCollection.value;
const modelsNumber = models.length;
</script>
<template>
  <main
    class="gap-10 w-full flex flex-col items-center"
  >
    <h2
      class="flex justify-center items-center bg-fuchsia-400 text-white w-1/3 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </h2>
    <mark
      class="text-gray-500 bg-sky-100 flex w-10 h-10 justify-center items-center rounded-lg"
    >
      {{ modelsNumber }}
    </mark>
    <ul class="w-full flex flex-col">
      <li
        v-for="model in models"
        class="p-5 flex gap-2 border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
      >
        {{ model.label }}
      </li>
    </ul>
  </main>
</template>
