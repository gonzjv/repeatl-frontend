<script setup>
import { onBeforeMount, ref } from 'vue';

let tasksData = ref();
onBeforeMount(async () => {
  const response = await fetch(
    `http://localhost:4000/courses`
  );
  tasksData.value = await response.json();
  console.log('taskData', tasksData.value);
});
</script>
<template>
  <h2 class="text-yellow-400">Tasks is there!</h2>
  <ul>
    <li v-for="task in tasksData">
      {{ task.name }}
    </li>
  </ul>
</template>
