<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';

const displayStore = useDisplayStore();
const { isTodayWordsDisplay } =
  storeToRefs(displayStore);
</script>
<template>
  <aside class="flex justify-center gap-10">
    <button
      @click="
        displayStore.$patch({
          isTodayWordsDisplay: false,
        })
      "
      :class="
        !isTodayWordsDisplay && 'bg-sky-100'
      "
      class="border-2 border-sky-100 p-2 rounded-full text-sky-400"
    >
      Модели
    </button>
    <button
      @click="
        displayStore.$patch({
          isTodayWordsDisplay: true,
        })
      "
      :class="isTodayWordsDisplay && 'bg-sky-100'"
      class="border-2 border-sky-100 p-2 rounded-full text-sky-400"
    >
      Слова
    </button>
  </aside>
</template>
