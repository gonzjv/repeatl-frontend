<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import {
  getCourses,
  deleteCourse,
} from '../../services/courseService';
import { useUserStore } from '../../store/user';
import { useControlBoardStore } from '@/store/controlBoard';
import {
  ArrowLeftIcon,
  SquaresPlusIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { useDisplayStore } from '../../store/display';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const { token } = userStore.userData;

const displayStore = useDisplayStore();
const { isBoardPopupDisplay } =
  storeToRefs(displayStore);

const controlBoardStore = useControlBoardStore();
const { courses } = storeToRefs(
  controlBoardStore
);

let state = reactive({});
// let { courses } = toRefs(state);

const router = useRouter();

onBeforeMount(async () => {
  controlBoardStore.$patch({
    courses: await getCourses(token),
  });
});

const handleDeleteClick = async (course) => {
  const deletedCourse = await deleteCourse(
    token,
    course
  );
  courses.value = await getCourses(token);
};

const handleCourseClick = async (course) => {
  controlBoardStore.$patch({
    activeCourse: course,
  });
  router.push('/controlBoard/collections');
};
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
      <div
        class="flex flex-col gap-5 w-1/2 shadow-md p-5"
      >
        <h2
          class="py-2 flex gap-2 justify-start w-2/12 text-xl border-b-2 border-yellow-300"
        >
          <Squares2X2Icon class="w-5" />
          Курсы:
        </h2>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
            v-for="course in courses"
          >
            <button
              @click="handleCourseClick(course)"
              class="shadow-lg p-3 rounded-lg active:shadow-md"
            >
              {{ course.name }}
            </button>
            <button
              @click="handleDeleteClick(course)"
            >
              <XMarkIcon
                class="w-5 hover:text-red-600"
              />
            </button>
          </li>
        </ul>
      </div>
      <div class="flex w-1/2 p-5">
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addCourse',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <SquaresPlusIcon class="w-5" />
          <p>Создать курс</p>
        </button>
      </div>
    </section>
  </main>
</template>
