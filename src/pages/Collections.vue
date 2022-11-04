<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';

import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';

import Collection from '../components/Collection.vue';
import { getCollections } from '../services/collectionService';
import { useUserStore } from '../store/user';

let state = reactive({
  collectionsData: [],
});

let { collectionsData } = toRefs(state);

const store = useCourseStore();
const userStore = useUserStore();
const { currentCourse } = storeToRefs(store);

onBeforeMount(async () => {
  collectionsData.value = await getCollections(
    currentCourse.value.id,
    userStore.userData.token
  );
});
</script>
<template>
  <main
    class="flex flex-col justify-center items-center gap-10"
  >
    <h2
      class="flex justify-center items-center bg-fuchsia-400 text-white w-4/12 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </h2>
    <section class="w-full flex flex-col gap-10">
      <h3
        class="w-full text-left text-xl font-bold"
      >
        ВЫБОР ЗАДАНИЙ:
      </h3>
      <ul
        class="w-full flex flex-col gap-10 items-start"
      >
        <li
          class="pl-32 text-base w-full flex items-start flex-col gap-5"
          v-for="collection in collectionsData"
        >
          <Collection :collection="collection" />
        </li>
      </ul>
    </section>
  </main>
</template>
