<script setup>
const props = defineProps({
  collection: Object,
});

const models =
  props.collection.modelSubCollection.models;

const modelsNumber = models.length;
</script>
<template>
  <h2 class="text-2xl">
    Коллекция {{ collection.name }}
  </h2>
  <article
    class="p-5 flex gap-20 w-full border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
  >
    <div class="flex flex-col items-center">
      <h3>МОДЕЛИ</h3>
      <mark
        class="text-gray-500 bg-sky-100 flex w-10 h-10 justify-center items-center rounded-lg"
      >
        {{ modelsNumber }}
      </mark>
    </div>
    <ul class="w-full flex gap-2 flex-wrap">
      <li v-for="model in models">
        {{ model.label }}
      </li>
    </ul>
  </article>
</template>
