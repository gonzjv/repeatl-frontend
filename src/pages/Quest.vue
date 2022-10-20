<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import {
  getProgress,
  createProgress,
} from '../services/progressService';

const courseStore = useCourseStore();
const {
  currentCourse,
  currentSection,
  currentCollection,
  currentSubCollection,
} = storeToRefs(courseStore);

const initModel = currentSection.value.models[0];

const state = reactive({
  currentModel: initModel,
  progress: {},
});
const { currentModel, progress } = toRefs(state);

const USER_ID = '4';

onBeforeMount(async () => {
  progress.value = await getProgress(
    currentSubCollection.value.id,
    USER_ID
  );
  if (!progress.value.id) {
    console.log('progress not found');

    const initProgress = {
      userId: USER_ID,
      modelStep: 0,
      phraseStep: 0,
      sectionStep: 0,
      subCollectionId: currentCollection.value.id,
    };
    progress.value = await createProgress(
      initProgress
    );
  }
  console.log('progress', progress.value);
});
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
    <section class="flex gap-10 w-full">
      <aside class="flex flex-col gap-5">
        <div
          class="flex gap-2 items-center justify-between"
        >
          <p>Model:</p>
          <span
            class="border-[1px] w-14 h-14 border-sky-400 rounded-md"
            >model number</span
          >
        </div>
        <div
          class="flex gap-2 items-center justify-between"
        >
          <p>Progress:</p>
          <span
            class="border-[1px] w-14 h-14 border-sky-400 rounded-md"
          >
            progress, %</span
          >
        </div>
      </aside>
      <div class="w-6/12 flex flex-col gap-10">
        <ul
          class="h-80 border-[1px] border-sky-400 rounded-md"
        >
          <li
            v-for="phrase in currentModel.phrases"
          >
            <p class="font-extralight">
              {{ phrase.native }}
            </p>
            <p class="">
              {{ phrase.foreign }}
            </p>
          </li>
        </ul>
        <form
          class="w-full flex justify-center items-center"
          action=""
        >
          <input
            class="w-full bg-white border-[1px] rounded-md border-sky-400 focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
            type="text"
          />
        </form>
      </div>
      <aside>help</aside>
    </section>
  </main>
</template>
