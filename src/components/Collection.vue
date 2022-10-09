<script setup>
const props = defineProps({
  collection: Object,
});

const modelsNumber =
  props.collection.modelSubCollections.length;
</script>
<template>
  <h2 class="text-2xl">
    Коллекция {{ collection.name }}
  </h2>
  <article class="flex gap-5 w-full">
    <div class="flex flex-col items-center">
      <h3>МОДЕЛИ</h3>
      <mark
        class="bg-sky-100 flex w-10 h-10 justify-center items-center rounded-lg"
      >
        {{ modelsNumber }}
      </mark>
    </div>
    <ul class="w-full flex">
      <li
        v-for="model in collection.modelSubCollections"
      >
        {{ model.label }}
      </li>
    </ul>
  </article>
</template>
