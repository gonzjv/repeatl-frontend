<script setup>
import { useCourseStore } from '@/store/course';
import { storeToRefs } from 'pinia';
import { ArrowLeftIcon } from '@heroicons/vue/24/outline';
import { useDisplayStore } from '../store/display';
import { useRouter } from 'vue-router';

const router = useRouter();

const courseStore = useCourseStore();
const displayStore = useDisplayStore();
const { currentCourse, currentCollection } =
  storeToRefs(courseStore);

const { wordSections } = currentCollection.value;
console.log('wordSections', wordSections);

const handleButtonClick = (section) => {
  displayStore.$patch({
    isSectionPopupDisplay: true,
    isPopupDisplay: true,
  });
  courseStore.$patch({
    currentSection: section,
  });
};

const handleGoBack = () => {
  router.back();
};
</script>
<template>
  <main
    class="relative gap-10 w-full flex flex-col items-center"
  >
    <button
      @click="handleGoBack"
      class="absolute flex gap-1 items-center left-0 top-3 text-дп"
    >
      <ArrowLeftIcon class="w-5 text-sky-400" />
      <p class="text-sky-400 font-semibold">
        Все коллекции
      </p>
    </button>
    <h2
      class="flex justify-center items-center bg-fuchsia-400 text-white w-1/3 rounded-lg h-10 text-2xl"
    >
      {{ currentCourse.name }}
    </h2>
    <aside class="w-full flex gap-1 items-center">
      <h3 class="text-xl">
        Коллекция {{ currentCollection.number }}
      </h3>
      <span>/ слова</span>
    </aside>
    <ul class="w-full flex flex-col items-center">
      <li
        v-for="section in wordSections"
        :key="section.id"
        class="w-8/12 p-5 flex items-center gap-10 border-2 border-transparent shadow-none hover:border-2 hover:shadow-md"
      >
        <div class="flex flex-col items-center">
          <p>Слова</p>
          <mark
            class="text-white bg-sky-400 flex w-14 h-7 justify-center items-center rounded-lg"
          >
            {{ section.words.length }}
          </mark>
        </div>
        <div
          class="flex flex-col w-2/4 items-start"
        >
          <p>
            {{ section.number }}
          </p>
          <button
            @click="handleButtonClick(section)"
            class="text-sky-400 text-xs font-bold"
          >
            Просмотр
          </button>
        </div>
        <router-link
          @click="
            courseStore.$patch({
              currentSection: section,
            })
          "
          to="/questWord"
          class="text-sky-400 font-bold w-1/5 border-sky-400 border-2 rounded-md"
        >
          Старт
        </router-link>
      </li>
    </ul>
  </main>
</template>
