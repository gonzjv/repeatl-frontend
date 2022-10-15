<script setup>
import { useCourseStore } from '../store/course';

const props = defineProps({
  collection: Object,
});

const store = useCourseStore();

const { modelSections } =
  props.collection.modelSubCollection;

let modelsNumber = 0;
modelSections.forEach(
  (e) => (modelsNumber += e.models.length)
);
</script>
<template>
  <h2 class="text-xl">
    Коллекция {{ collection.name }}
  </h2>
  <router-link
    @click="
      store.$patch({
        currentSubCollection:
          collection.modelSubCollection,
        currentCollection: collection,
      })
    "
    to="/modelSubCollection"
    class="p-5 flex gap-20 w-full border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
  >
    <div class="flex flex-col items-center">
      <h3>МОДЕЛИ</h3>
      <mark
        class="text-white bg-sky-400 flex w-14 h-7 justify-center items-center rounded-lg"
      >
        {{ modelsNumber }}
      </mark>
    </div>
    <ul class="w-full flex gap-2 flex-wrap">
      <li v-for="modelSection in modelSections">
        {{ modelSection.label }}
      </li>
    </ul>
  </router-link>
</template>
