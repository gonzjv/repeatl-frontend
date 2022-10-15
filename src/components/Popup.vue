<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const { isSectionPopupDisplay } =
  storeToRefs(displayStore);
const { currentSection } =
  storeToRefs(courseStore);
</script>
<template>
  <Transition
    enter-active-class="transition duration-500"
    leave-active-class="transition duration-500"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    ><div
      v-if="isSectionPopupDisplay"
      class="z-20 blur-0 bg-white shadow-lg absolute top-[10vh] left-[30vw] w-3/12 h-96"
    >
      <h3>
        {{ currentSection.label }}
      </h3>
      <ul>
        <li
          v-for="model in currentSection.models"
        >
          <p>{{ model.label }}</p>
        </li>
      </ul>
    </div></Transition
  >
</template>
