<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import { useCourseStore } from '@/store/course';
import { useUserStore } from '../store/user';
import { getCourses } from '../services/courseService';
import {
  createProgress,
  getProgress,
} from '../services/progressService';
import { storeToRefs } from 'pinia';

const store = useCourseStore();
const userStore = useUserStore();
const { progress } = storeToRefs(userStore);

let state = reactive({
  coursesData: [],
  collectionsData: [],
  coursesWindowDisplay: true,
});

let { coursesData, coursesWindowDisplay } =
  toRefs(state);

onBeforeMount(async () => {
  console.log('userData', userStore.userData);
  coursesData.value = await getCourses(
    userStore.userData.token
  );

  const progress = await getProgress(
    userStore.userData.id,
    userStore.userData.token
  );
  console.log('progress', progress);

  progress &&
    userStore.$patch({ progress: progress });

  if (!progress) {
    const newProgress = await createProgress(
      userStore.userData.id,
      userStore.userData.token
    );
    userStore.$patch({ progress: newProgress });

    console.log('newProgress', newProgress);
  }
});

const handleCourseSwitch = async (course) => {
  store.$patch({
    currentCourse: course,
  });
};
</script>
<template>
  <main class="flex flex-col gap-10 items-center">
    <!-- <p>Progress: {{ progress }}</p> -->
    <aside
      v-if="coursesWindowDisplay"
      class="flex flex-col gap-10 w-full"
    >
      <h2 class="text-2xl">
        В какой язык окунемся?
      </h2>
      <ul class="flex gap-5 justify-center">
        <li
          class="w-1/3"
          v-for="course in coursesData"
        >
          <router-link
            to="/course"
            @click="handleCourseSwitch(course)"
            class="text-white p-3 bg-fuchsia-400 w-full rounded-lg h-10 text-2xl"
          >
            {{ course.name }}
          </router-link>
        </li>
      </ul>
    </aside>
    <section
      class="flex flex-col w-full items-center"
      v-if="!coursesWindowDisplay"
    ></section>
  </main>
</template>
