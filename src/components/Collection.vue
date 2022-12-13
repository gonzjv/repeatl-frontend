<script setup>
import { useCourseStore } from '../store/course';

const props = defineProps({
  collection: Object,
});

const store = useCourseStore();

const { modelSections, wordSections } =
  props.collection;
console.log('wordSections', wordSections);

let modelSum = 0;
modelSections.forEach(
  (e) => (modelSum += e.models.length)
);
</script>
<template>
  <h2 class="text-xl">
    Коллекция {{ collection.number }}
  </h2>
  <router-link
    @click="
      store.$patch({
        currentCollection: collection,
      })
    "
    to="/modelList"
    class="p-5 flex gap-20 w-full border-2 border-transparent shadow-lg hover:border-b-yellow-300 rounded-lg"
  >
    <div class="w-40 flex flex-col items-center">
      <h3>МОДЕЛИ</h3>
      <mark
        class="text-white bg-sky-400 flex w-14 h-7 justify-center items-center rounded-lg"
      >
        {{ modelSum }}
      </mark>
    </div>
    <ul class="w-full flex gap-2 flex-wrap">
      <li v-for="modelSection in modelSections">
        {{ modelSection.number }}
      </li>
    </ul>
  </router-link>
  <router-link
    @click="
      store.$patch({
        currentCollection: collection,
      })
    "
    to="/wordList"
    class="p-5 flex gap-20 w-full border-2 border-transparent shadow-lg hover:border-b-yellow-300 rounded-lg"
  >
    <div class="w-40 flex flex-col items-center">
      <h3>СЛОВА</h3>
      <mark
        class="text-white bg-sky-400 flex w-14 h-7 justify-center items-center rounded-lg"
      >
        {{ modelSum }}
      </mark>
    </div>
    <ul class="w-full flex gap-2 flex-wrap">
      <li v-for="wordSection in wordSections">
        {{ wordSection.number }}
      </li>
    </ul>
  </router-link>
</template>
