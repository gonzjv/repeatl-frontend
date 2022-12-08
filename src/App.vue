<script setup>
import Header from '@/components/Header.vue';
import { storeToRefs } from 'pinia';
import { useDisplayStore } from './store/display';
import Cover from './components/Cover.vue';
import Popup from './components/Popup.vue';
import { inject, onBeforeMount } from 'vue';
import { useUserStore } from './store/user';

const store = useDisplayStore();
const userStore = useUserStore();
const { isPopupDisplay } = storeToRefs(store);
const { userData } = storeToRefs(userStore);

const $cookies = inject('$cookies');
const userDataCookie = $cookies.get('userData');

const checkToken = () => {
  if (userDataCookie) {
    userStore.$patch({
      userData: userDataCookie,
      isUserLoggedIn: true,
    });

    userDataCookie.role == 'admin' &&
      userStore.$patch({ isAdminHere: true });

    console.log('userData', userData.value);
  }
};

onBeforeMount(() => {
  checkToken();
});
</script>

<template>
  <Header />
  <router-view
    :class="
      isPopupDisplay &&
      'blur-[2px] transition-all duration-500'
    "
  ></router-view>
  <Cover />
  <Popup />
</template>
