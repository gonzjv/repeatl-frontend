<script setup>
import { storeToRefs } from 'pinia';
import { useControlBoardStore } from '../../store/controlBoard';

const controlBoardStore = useControlBoardStore();
const { activeCollection } = storeToRefs(
  controlBoardStore
);
</script>
<template>
  <main>
    <h2>ModelSubCollection</h2>
    <p>{{ activeCollection }}</p>
  </main>
</template>
