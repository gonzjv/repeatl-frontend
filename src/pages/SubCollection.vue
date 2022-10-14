<script setup>
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';

const store = useCourseStore();
const { currentCourse, currentSubCollection } =
  storeToRefs(store);
const { modelSections } =
  currentSubCollection.value;
</script>
<template>
  <main
    class="relative gap-10 w-full flex flex-col items-center"
  >
    <router-link
      class="absolute flex gap-1 items-center left-0 top-3 text-дп"
      to="/collections"
    >
      <ArrowLeftIcon class="w-5 text-sky-400" />
      <p class="text-sky-400">Все коллекции</p>
    </router-link>
    <h2
      class="flex justify-center items-center bg-fuchsia-400 text-white w-1/3 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </h2>
    <ul class="w-full flex flex-col">
      <li
        v-for="section in modelSections"
        class="p-5 flex gap-2 border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
      >
        <mark
          class="text-white bg-sky-400 flex w-10 h-10 justify-center items-center rounded-lg"
        >
          {{ section.models.length }}
        </mark>
        <p>
          {{ section.label }}
        </p>
      </li>
    </ul>
  </main>
</template>
