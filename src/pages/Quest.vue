<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const {
  currentCourse,
  currentSection,
  currentCollection,
} = storeToRefs(courseStore);
</script>
<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <nav
      class="flex justify-start gap-2 text-sky-400"
    >
      <router-link to="/collections">
        {{ currentCourse.name }}
      </router-link>
      <p>/</p>
      <router-link to="/modelSubCollection"
        >Коллекция
        {{ currentCollection.name }}</router-link
      >
    </nav>
    <h2 class="text-xl">
      {{ currentSection.label }}
    </h2>
    <section class="flex gap-10">
      <aside>
        <div class="flex gap-2">
          <p>Model:</p>
          <span class="border-[1px]"
            >model number</span
          >
        </div>
        <div class="flex gap-2">
          <p>Progress:</p>
          <span class="border-[1px]">
            progress, %</span
          >
        </div>
      </aside>
      <div>Quest</div>
      <aside>help</aside>
    </section>
  </main>
</template>
