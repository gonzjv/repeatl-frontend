<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { currentModel, percentage } =
  storeToRefs(courseStore);
</script>
<template>
  <aside class="flex flex-col gap-5 w-2/12">
    <div
      class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-center"
    >
      <p>Model: {{ currentModel.number }}</p>
    </div>
    <div
      class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-center"
    >
      <p>
        Progress:
        {{ percentage }} %
      </p>
    </div>
  </aside>
</template>
