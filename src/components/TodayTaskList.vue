<script setup>
import { storeToRefs } from 'pinia';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';
import { useUserStore } from '../store/user';
import { getCompletedModelSectionArr } from '@/services/modelService';
import { useCourseStore } from '../store/course';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const courseStore = useCourseStore();

const state = reactive({
  completedSectionArr: [],
});

const { completedSectionArr } = toRefs(state);
onBeforeMount(async () => {
  completedSectionArr.value =
    await getCompletedModelSectionArr(
      userData.value.token,
      userData.value.id
    );
  console.log(
    'completedSectionArr',
    completedSectionArr.value
  );
});
</script>
<template>
  <ul
    v-if="completedSectionArr.length > 0"
    class="shadow-lg rounded-lg p-10 flex flex-col gap-5"
  >
    <!-- <p class="text-emerald-400">User data</p>
    <p>{{ userData }}</p>
    <p class="text-emerald-400">
      Completed section arr
    </p>
    <p>{{ completedSectionArr }}</p> -->

    <li
      class="flex gap-3 shadow-lg p-5 rounded-lg justify-between items-center"
      v-for="section in completedSectionArr"
    >
      <div class="flex gap-7">
        <p class="text-sky-400">
          {{ section.models[0].grammarSubject }}
        </p>
        <p class="font-extralight">
          {{
            section.models[0].phrases[0].foreign
          }}...
        </p>
      </div>
      <router-link
        @click="
          courseStore.$patch({
            currentSection: section,
            isRepeatOptional: false,
          })
        "
        to="/questRepeat"
        class="text-sky-400 font-bold w-1/5 border-sky-400 border-2 rounded-md"
      >
        Повторение
      </router-link>
    </li>
  </ul>
</template>
