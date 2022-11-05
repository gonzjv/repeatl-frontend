<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import { getCourses } from '../../services/courseService';
import { useUserStore } from '../../store/user';
import {
  ArrowLeftIcon,
  SquaresPlusIcon,
  Squares2X2Icon,
} from '@heroicons/vue/24/outline';

const userStore = useUserStore();

let state = reactive({
  courses: [],
});

let { courses } = toRefs(state);
onBeforeMount(async () => {
  console.log('userData', userStore.userData);
  courses.value = await getCourses(
    userStore.userData.token
  );
});

const test = 'test';
</script>
<template>
  <main class="flex flex-col gap-10">
    <nav class="w-full flex justify-start">
      <router-link
        class="text-sky-400 flex gap-3 hover:font-extrabold"
        to="/controlBoard"
      >
        <ArrowLeftIcon class="w-5" />
        <p>назад в панель управления</p>
      </router-link>
    </nav>
    <section class="w-full flex">
      <div class="flex flex-col gap-5 w-1/2">
        <h2
          class="flex gap-2 justify-start w-2/12 text-xl border-b-2 border-yellow-400"
        >
          <Squares2X2Icon class="w-5" />
          Курсы:
        </h2>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start"
            v-for="course in courses"
          >
            <button>{{ course.name }}</button>
          </li>
        </ul>
      </div>
      <div class="flex w-1/2">
        <button
          class="shadow-sm hover:shadow-lg flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <SquaresPlusIcon class="w-5" />
          <p>Создать курс</p>
        </button>
      </div>
    </section>
  </main>
</template>
