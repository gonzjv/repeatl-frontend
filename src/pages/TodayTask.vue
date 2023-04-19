<script setup>
import { storeToRefs } from 'pinia';
import TodayTaskBtn from '../components/TodayTaskBtn.vue';
import TodayTaskList from '../components/TodayTaskList.vue';
import TodayTaskWordList from '../components/TodayTaskWordList.vue';
import { useDisplayStore } from '../store/display';
const displayStore = useDisplayStore();
const { isTodayWordsDisplay } =
  storeToRefs(displayStore);
</script>
<template>
  <main class="flex flex-col gap-5">
    <TodayTaskBtn />
    <TodayTaskList v-if="!isTodayWordsDisplay" />
    <TodayTaskWordList
      v-if="isTodayWordsDisplay"
    />
  </main>
</template>
