<script setup>
import logoImg from '@/assets/logo.svg';
import descrImg from '@/assets/description.svg';
// import { useDisplayStore } from '@/store/display';
// import { onBeforeMount } from 'vue';

// const store = useDisplayStore();

// onBeforeMount(() => {
//   store.$patch({ isNavLogoDisplay: false });
// });
</script>
<template>
  <figure class="flex justify-between">
    <img
      class="w-6/12"
      :src="logoImg"
      alt="Repeatl"
    />
    <figcaption
      class="w-6/12 flex justify-center items-center"
    >
      <img
        class="w-5/12"
        :src="descrImg"
        alt="Description"
      />
    </figcaption>
  </figure>
</template>
