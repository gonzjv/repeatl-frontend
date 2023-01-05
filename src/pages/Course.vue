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
import { getProgress } from '../services/progressService';

let state = reactive({
  collectionsData: [],
  courseState: {},
});

let { collectionsData, courseState } =
  toRefs(state);

const store = useCourseStore();
const userStore = useUserStore();
const { currentCourse } = storeToRefs(store);
const { progress } = storeToRefs(userStore);

onBeforeMount(async () => {
  collectionsData.value = await getCollections(
    currentCourse.value.id,
    userStore.userData.token
  );

  const progress = await getProgress(
    userStore.userData.id,
    userStore.userData.token
  );
  console.log('progress', progress);

  courseState.value = await getCourseState(
    progress.id,
    currentCourse.value.id,
    userStore.userData.token
  );
  console.log('courseState', courseState);

  if (!courseState) {
    const newCourseState = await addCourseState(
      progress.value.id,
      currentCourse.value.id,
      userStore.userData.token
    );
    console.log('newCourseState', newCourseState);
  }
});
</script>
<template>
  <main
    class="flex flex-col justify-center items-center gap-10"
  >
    <p>Progress: {{ progress }}</p>
    <p>Course state: {{ courseState }}</p>
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
