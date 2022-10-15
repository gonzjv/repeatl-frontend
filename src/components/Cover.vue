<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';

const store = useDisplayStore();
const { isSectionPopupDisplay } =
  storeToRefs(store);
</script>
<template>
  <aside
    @click="
      store.$patch({
        isSectionPopupDisplay: false,
      })
    "
    v-if="isSectionPopupDisplay"
    class="z-10 w-full h-full absolute left-0 top-0"
  ></aside>
</template>
