<script setup>
import { reactive, toRefs } from 'vue';
import { useUserStore } from '../store/user';
import { useControlBoardStore } from '../store/controlBoard';
import { useDisplayStore } from '../store/display';
import { storeToRefs } from 'pinia';
import {
  addWordSection,
  getWordSections,
} from '../services/wordService';

const userStore = useUserStore();
const { token } = userStore.userData;

const controlBoardStore = useControlBoardStore();
const { activeCollection } = storeToRefs(
  controlBoardStore
);

const displayStore = useDisplayStore();

const state = reactive({
  inputNumber: '',
});
const { inputNumber } = toRefs(state);

const handleSubmit = async () => {
  const wordSection = {
    number: inputNumber.value,
  };
  const newWordSection = await addWordSection(
    token,
    wordSection,
    activeCollection.value.id
  );
  console.log('newOne', newWordSection);
  controlBoardStore.$patch({
    wordSections: await getWordSections(
      token,
      activeCollection.value.id
    ),
  });
  displayStore.$patch({
    isPopupDisplay: false,
    isBoardPopupDisplay: false,
  });
};
</script>
<template>
  <section
    class="py-5 flex flex-col justify-center items-center gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[12vh] left-[40vw] w-4/12 h-[500px] overflow-auto rounded-md"
  >
    <h2
      class="text-xl border-b-2 border-yellow-300 w-1/2 p-2"
    >
      Создание раздела слов
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-10 flex flex-col gap-7"
    >
      <input
        required
        v-model="inputNumber"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Ярлык фразы"
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
