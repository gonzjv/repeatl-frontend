<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { useUserStore } from '../store/user';
import { getCourses } from '../services/courseService';

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
});

const store = useCourseStore();
const userStore = useUserStore();
const { currentCourse } = storeToRefs(store);

const handleCourseSwitch = async (course) => {
  store.$patch({
    currentCourse: course,
  });
};
</script>
<template>
  <main class="flex flex-col gap-10 items-center">
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
    >
      <!-- <button
        @click="coursesWindowDisplay = true"
        class="bg-fuchsia-400 text-white w-4/12 rounded-lg h-10 text-2xl"
      >
        {{ currentCourse.name }}
      </button> -->
      <!-- <h2
        class="w-full text-left text-2xl font-bold"
      >
        ВЫБОР ЗАДАНИЙ:
      </h2>
      <ul
        class="w-full flex flex-col gap-10 py-10 items-start"
      >
        <li
          class="text-base p-4 w-full flex items-start flex-col gap-10"
          v-for="collection in collectionsData"
        >
          <Collection :collection="collection" />
        </li>
      </ul> -->
    </section>
  </main>
</template>
