<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';
import { useUserStore } from '../store/user';

const userStore = useUserStore();
const { isUserLoggedIn } = storeToRefs(userStore);

const displayStore = useDisplayStore();
</script>
<template>
  <RouterLink
    to="/courseList"
    v-if="isUserLoggedIn"
    @click="
      displayStore.$patch({
        isNavLogoDisplay: true,
      })
    "
    class="text-sky-400 w-56 h-20 flex justify-center items-center hover:bg-sky-100 border-4 border-yellow-200 rounded-full"
  >
    Выбор заданий
  </RouterLink>
</template>
