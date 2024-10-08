<script setup>
import logoImg from '@/assets/logo.svg';
import { useDisplayStore } from '@/store/display';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';
import {
  Cog8ToothIcon,
  UsersIcon,
} from '@heroicons/vue/24/outline';
import { inject } from 'vue';

const NAV_BTNS = [
  {
    title: 'Выбор заданий',
    route: '/courseList',
  },
];

const store = useDisplayStore();
const userStore = useUserStore();

const { isNavLogoDisplay, isPopupDisplay } =
  storeToRefs(store);
const { isUserLoggedIn, isAdminHere, userData } =
  storeToRefs(userStore);

const $cookies = inject('$cookies');

const handleLogoutClick = () => {
  $cookies.remove('userData');
  userStore.$patch({
    userData: {},
    isUserLoggedIn: false,
    isAdminHere: false,
  });
};
</script>
<template>
  <header
    :class="
      isPopupDisplay &&
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
        class="w-56 h-10 flex justify-center items-center hover:border-2 border-sky-100 rounded-lg"
        active-class="bg-sky-100 rounded-lg"
        to="/"
        >Главная</router-link
      >
      <router-link
        v-if="isUserLoggedIn"
        @click="
          store.$patch({ isNavLogoDisplay: true })
        "
        v-for="btn in NAV_BTNS"
        class="w-56 h-10 flex justify-center items-center hover:border-2 border-sky-100 rounded-lg"
        active-class="bg-sky-100 rounded-lg"
        :to="btn.route"
        >{{ btn.title }}</router-link
      >
      <router-link
        v-if="isAdminHere"
        @click="
          store.$patch({ isNavLogoDisplay: true })
        "
        to="/controlBoard"
        class="w-72 flex items-center justify-center gap-3 hover:border-2 border-sky-100 rounded-lg"
        active-class="bg-sky-100 rounded-lg"
      >
        <cog8-tooth-icon class="w-6" />
        <p>Панель управления</p>
      </router-link>
    </nav>
    <button
      class="p-[4px] bg-gradient-to-r from-cyan-400 via-yellow-200 to-pink-400 rounded-full"
      @click="
        store.$patch({
          isLoginPopupDisplay: true,
          isPopupDisplay: true,
        })
      "
    >
      <p
        class="text-base px-4 py-1 rounded-full bg-white text-sky-400"
      >
        {{
          isUserLoggedIn ? userData.email : 'Вход'
        }}
      </p>
    </button>
    <button
      @click="handleLogoutClick"
      v-if="isUserLoggedIn"
      class="w-20 h-10 flex justify-center items-center hover:border-2 border-sky-100 rounded-lg text-sky-400"
    >
      Выйти
    </button>
  </header>
</template>
