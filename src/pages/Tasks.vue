<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import {
  getCourses,
  getCollections,
} from '@/services/apiService';
import Collection from '../components/Collection.vue';
let state = reactive({
  coursesData: [],
  collectionsData: [],
  currentCourse: {},
  coursesWindowDisplay: true,
});

let {
  coursesData,
  collectionsData,
  currentCourse,
  coursesWindowDisplay,
} = toRefs(state);

onBeforeMount(async () => {
  coursesData.value = await getCourses();
  // collectionsData.value = await getCollections(
  //   currentCourseId.value
  // );
});

const handleCourseSwitch = async (course) => {
  currentCourse.value = course;
  collectionsData.value = await getCollections(
    course.id
  );
  console.log(
    'collections',
    collectionsData.value
  );
  coursesWindowDisplay.value = false;
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
          <button
            @click="handleCourseSwitch(course)"
            class="bg-fuchsia-200 w-full rounded-lg h-10 text-2xl"
          >
            {{ course.name }}
          </button>
        </li>
      </ul>
    </aside>
    <section
      class="flex flex-col w-full items-center"
      v-if="!coursesWindowDisplay"
    >
      <button
        @click="coursesWindowDisplay = true"
        class="bg-fuchsia-400 text-white w-4/12 rounded-lg h-10 text-2xl"
      >
        {{ currentCourse.name }}
      </button>
      <h2
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
      </ul>
    </section>
  </main>
</template>
