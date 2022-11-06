<script setup>
import { reactive, toRefs } from 'vue';
import { useUserStore } from '../store/user';
import { addCourse } from '@/services/courseService.js';
import { useControlBoardStore } from '../store/controlBoard';
import { getCourses } from '../services/courseService';
import { useDisplayStore } from '../store/display';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { token } = userStore.userData;

const controlBoardStore = useControlBoardStore();
const displayStore = useDisplayStore();

const state = reactive({
  collectionName: '',
});
const { collectionName } = toRefs(state);

const handleSubmit = async () => {
  // const course = { name: collectionName.value };
  // const newCourse = await (
  //   token,
  //   course
  // );
  // console.log('newCourse', newCourse);
  // controlBoardStore.$patch({
  //   courses: await getCourses(token),
  // });
  // displayStore.$patch({
  //   isPopupDisplay: false,
  //   isBoardPopupDisplay: false,
  // });
};
</script>
<template>
  <section
    class="py-5 flex flex-col justify-center items-center gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[12vh] left-[40vw] w-4/12 h-[500px] overflow-auto rounded-md"
  >
    <h2
      class="text-xl border-b-2 border-yellow-300 w-1/2 p-2"
    >
      Создание коллекции
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-10 flex flex-col gap-7"
    >
      <input
        required
        v-model="courseName"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Название курса"
      />
      <button
        type="submit"
        class="relative bg-gradient-to-r from-cyan-400 via-yellow-200 to-pink-400 rounded-full h-10 text-slate-400 font-bold"
      >
        ДОБАВИТЬ
      </button>
    </form>
  </section>
</template>
