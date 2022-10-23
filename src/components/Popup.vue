<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const { isSectionPopupDisplay } =
  storeToRefs(displayStore);
const { currentSection, currentCollection } =
  storeToRefs(courseStore);
console.log(
  'currentSection',
  currentSection.value
);
</script>
<template>
  <Transition
    enter-active-class="transition duration-500"
    leave-active-class="transition duration-500"
    enter-from-class="opacity-0"
    leave-to-class="opacity-0"
    ><div
      v-if="isSectionPopupDisplay"
      class="py-5 flex flex-col gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[25vh] left-[20vw] w-6/12 h-96 overflow-auto"
    >
      <h3
        class="text-sky-400 flex gap-2 justify-center"
      >
        <p>Коллекция</p>
        <span class="text-fuchsia-400">
          {{ currentCollection.name }}
        </span>
        <p>Раздел</p>
        <span class="text-fuchsia-400">
          {{ currentSection.label }}
        </span>
      </h3>
      <ul
        class="flex flex-col gap-4 w-full items-start"
      >
        <li
          class="w-full px-10"
          v-for="model in currentSection.models"
          :key="model.id"
        >
          <div
            class="py-4 flex gap-7 border-b-[1px] border-sky-400 w-full"
          >
            <!-- <p class="text-sm">
              {{ model }}
            </p> -->
            <ul
              class="flex flex-col items-start gap-2 w-full"
            >
              <li
                v-for="phrase in model.phrases"
                class="flex flex-col items-start w-full"
              >
                <p class="font-extralight">
                  {{ phrase.native }}
                </p>
                <p>
                  {{ phrase.foreign }}
                </p>
              </li>
            </ul>
            <h4 class="italic text-sm">
              {{ model.label }}
            </h4>
          </div>
        </li>
      </ul>
    </div></Transition
  >
</template>
