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
  coursesWindowDisplay.value = false;
  console.log('course', course);
  console.log('window', coursesWindowDisplay);
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
            class="bg-red-200 w-full rounded-lg h-10 text-2xl"
          >
            {{ course.name }}
          </button>
        </li>
      </ul>
    </aside>
    <button
      v-if="!coursesWindowDisplay"
      @click="coursesWindowDisplay = true"
      class="bg-red-600 text-white w-4/12 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </button>
    <ul
      class="text-green-600 flex flex-col gap-5 py-10 items-start"
    >
      <li
        class="text-base p-4"
        v-for="collection in collectionsData"
      >
        {{ collection.name }}
      </li>
    </ul>
  </main>
</template>
