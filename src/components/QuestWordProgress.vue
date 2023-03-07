<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { currentSection, percentage } =
  storeToRefs(courseStore);
</script>
<template>
  <aside class="flex flex-col gap-5">
    <div
      class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
    >
      <p>
        Word section:
        {{ currentSection.number }}
      </p>
    </div>
    <div
      class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
    >
      <p>
        Progress:
        {{ percentage }} %
      </p>
    </div>
  </aside>
</template>
