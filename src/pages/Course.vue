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
import {
  getCourseState,
  addCourseState,
} from '@/services/courseStateService';
import { goHome } from '@/helpers/navigation.helper';

let state = reactive({
  collectionsData: [],
});

let { collectionsData } = toRefs(state);

const store = useCourseStore();
const userStore = useUserStore();
const { currentCourse } = storeToRefs(store);
const { courseState, userData, progress } =
  storeToRefs(userStore);

onBeforeMount(async () => {
  !currentCourse.value.id && goHome();

  if (currentCourse.value.id) {
    collectionsData.value = await getCollections(
      currentCourse.value.id,
      userData.value.token
    );

    const state = await getCourseState(
      progress.value.id,
      currentCourse.value.id,
      userData.value.token
    );

    state &&
      userStore.$patch({
        courseState: state,
      });
    console.log('courseState', state);

    if (!state) {
      const newCourseState = await addCourseState(
        progress.value.id,
        currentCourse.value.id,
        userData.value.token
      );
      console.log(
        'newCourseState',
        newCourseState
      );
      userStore.$patch({
        courseState: newCourseState,
      });
    }
  }
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
        class="max-w-max text-left text-xl border-b-2 border-yellow-300"
      >
        Выбор заданий:
      </h3>
      <ul
        class="w-full flex flex-col gap-10 items-start"
      >
        <li
          class="shadow-lg rounded-lg p-6 text-base w-full flex items-start flex-col gap-5"
          v-for="collection in collectionsData"
        >
          <Collection :collection="collection" />
        </li>
      </ul>
    </section>
  </main>
</template>
