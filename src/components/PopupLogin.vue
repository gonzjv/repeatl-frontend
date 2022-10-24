<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const { isLoginPopupDisplay } =
  storeToRefs(displayStore);
const { currentSection, currentCollection } =
  storeToRefs(courseStore);
</script>
<template>
  <div
    class="py-5 flex flex-col gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[25vh] left-[20vw] w-6/12 h-96 overflow-auto"
  >
    <h3>Login Popup</h3>
  </div>
</template>
