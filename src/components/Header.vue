<script setup>
import logoImg from '@/assets/logo.svg';
import { useDisplayStore } from '@/store/display';
import { storeToRefs } from 'pinia';

const NAV_BTNS = [
  {
    title: 'Выбор заданий',
    route: '/tasks',
  },
];

const store = useDisplayStore();
const {
  isNavLogoDisplay,
  isSectionPopupDisplay,
} = storeToRefs(store);
</script>
<template>
  <header
    :class="
      isSectionPopupDisplay &&
      'blur-[2px] transition-all duration-500'
    "
    class="relative flex items-center justify-start gap-10 h-24 text-xl py-4"
  >
    <figure
      v-show="isNavLogoDisplay"
      class="w-3/12 absolute left-0 top-0"
    >
      <img class="" :src="logoImg" alt="" />
    </figure>
    <nav class="text-sky-400 flex gap-10 ml-80">
      <router-link
        @click="
          store.$patch({
            isNavLogoDisplay: false,
          })
        "
        class="w-56 h-10 flex justify-center items-center"
        active-class="bg-sky-100 rounded-lg"
        to="/"
        >Главная</router-link
      >
      <router-link
        @click="
          store.$patch({ isNavLogoDisplay: true })
        "
        v-for="btn in NAV_BTNS"
        class="w-56 h-10 flex justify-center items-center"
        active-class="bg-sky-100 rounded-lg"
        :to="btn.route"
        >{{ btn.title }}</router-link
      >
      <!-- <router-link to="/todayTasks"
        >Задания на сегодня</router-link
      > -->
    </nav>
  </header>
</template>
