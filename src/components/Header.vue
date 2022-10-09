<script setup>
import logoImg from '@/assets/logo.svg';
import { useDisplayStore } from '@/store/display';
import { storeToRefs } from 'pinia';

const store = useDisplayStore();

const { isNavLogoDisplay } = storeToRefs(store);
</script>
<template>
  <header
    class="flex items-center justify-start gap-10"
  >
    <figure
      v-if="isNavLogoDisplay"
      class="w-3/12"
    >
      <img class="" :src="logoImg" alt="" />
    </figure>
    <nav class="text-sky-500">
      <router-link
        active-class="text-yellow-400"
        to="/"
        >Главная</router-link
      >
      |
      <router-link
        active-class="text-yellow-400"
        to="/tasks"
        >Выбор заданий</router-link
      >
      |
      <!-- <router-link to="/todayTasks"
        >Задания на сегодня</router-link
      > -->
    </nav>
  </header>
</template>
