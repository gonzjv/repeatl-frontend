<script setup>
import Header from '@/components/Header.vue';
import { storeToRefs } from 'pinia';
import { useDisplayStore } from './store/display';
import Cover from './components/Cover.vue';
import Popup from './components/Popup.vue';

const store = useDisplayStore();
const { isSectionPopupDisplay } =
  storeToRefs(store);
</script>

<template>
  <Header />
  <router-view
    :class="
      isSectionPopupDisplay &&
      'blur-[2px] transition-all duration-500'
    "
  ></router-view>
  <Cover />
  <Popup />
</template>
