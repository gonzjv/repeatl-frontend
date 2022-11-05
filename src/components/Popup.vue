<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';
import PopupLogin from './PopupLogin.vue';
import PopupSection from './PopupSection.vue';
import PopupBoard from './PopupBoard.vue';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const {
  isSectionPopupDisplay,
  isLoginPopupDisplay,
  isBoardPopupDisplay,
} = storeToRefs(displayStore);
</script>
<template>
  <Transition
    enter-active-class="transition duration-500"
    leave-active-class="transition duration-500"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <aside>
      <PopupSection
        v-if="isSectionPopupDisplay"
      />
      <PopupLogin v-if="isLoginPopupDisplay" />
      <PopupBoard v-if="isBoardPopupDisplay" />
    </aside>
  </Transition>
</template>
