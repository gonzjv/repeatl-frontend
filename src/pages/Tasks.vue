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
  tasksData: [],
  collectionsData: [],
  currentCourseId: 2,
});

let {
  tasksData,
  collectionsData,
  currentCourseId,
} = toRefs(state);

onBeforeMount(async () => {
  tasksData.value = await getCourses();
  collectionsData.value = await getCollections(
    currentCourseId.value
  );
});

const handleCourseSwitch = async (id) => {
  currentCourseId.value = id;
  collectionsData.value = await getCollections(
    id
  );
  console.log('courseId', currentCourseId.value);
};
</script>
<template>
  <ul class="flex gap-5 justify-center">
    <li class="w-1/3" v-for="task in tasksData">
      <button
        @click="handleCourseSwitch(task.id)"
        class="bg-red-200 w-full rounded-lg h-10 text-2xl"
        :class="
          currentCourseId == task.id &&
          'bg-red-600 text-white'
        "
      >
        {{ task.name }}
      </button>
    </li>
  </ul>
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
</template>
