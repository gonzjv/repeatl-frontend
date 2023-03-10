<script setup>
import IndexFigure from '../components/IndexFigure.vue';
import IndexButtonCourseList from '../components/IndexButtonCourseList.vue';
import IndexBtnTodayTask from '../components/IndexBtnTodayTask.vue';
</script>
<template>
  <main
    class="text-2xl flex flex-col justify-center items-center gap-10"
  >
    <IndexFigure />
    <IndexButtonCourseList />
    <IndexBtnTodayTask />
  </main>
</template>
