<script setup>
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import { getCourses } from '../../services/courseService';
import { useUserStore } from '../../store/user';

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
  <main>
    <p>Courses!!!</p>
    <ul>
      <li v-for="course in courses">
        <button>{{ course.name }}</button>
      </li>
    </ul>
  </main>
</template>
