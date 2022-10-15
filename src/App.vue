<script setup>
import Header from '@/components/Header.vue';
import { storeToRefs } from 'pinia';
import { useDisplayStore } from './store/display';

const store = useDisplayStore();
const { isBlurDisplay } = storeToRefs(store);
</script>

<template>
  <aside
    @click="
      store.$patch({
        isBlurDisplay: false,
      })
    "
    v-if="isBlurDisplay"
    class="z-10 w-full h-full absolute left-0 top-0"
  ></aside>
  <Header
    :class="
      isBlurDisplay &&
      'blur-[2px] transition-all duration-500'
    "
    class="h-24 text-xl py-4"
  />
  <router-view
    :class="
      isBlurDisplay &&
      'blur-[2px] transition-all duration-500'
    "
  ></router-view>
</template>
