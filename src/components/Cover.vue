<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';

const store = useDisplayStore();
const {
  isPopupDisplay,
  isLoginPopupDisplay,
  isSectionPopupDisplay,
} = storeToRefs(store);
</script>
<template>
  <aside
    @click="
      store.$patch({
        isPopupDisplay: false,
        isLoginPopupDisplay: false,
        isSectionPopupDisplay: false,
      })
    "
    v-if="isPopupDisplay"
    class="z-10 w-full h-full absolute left-0 top-0"
  ></aside>
</template>
