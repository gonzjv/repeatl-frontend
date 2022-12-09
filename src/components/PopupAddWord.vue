<script setup>
import { reactive, toRefs } from 'vue';
import { useUserStore } from '../store/user';
import { useControlBoardStore } from '../store/controlBoard';
import { useDisplayStore } from '../store/display';
import { storeToRefs } from 'pinia';
import {
  addPhrase,
  getPhrases,
  addPhraseFromFile,
} from '@/services/phraseService';
import {
  addWord,
  getWordArr,
} from '../services/wordService';

const userStore = useUserStore();
const { token } = userStore.userData;

const controlBoardStore = useControlBoardStore();
const { activeWordSection } = storeToRefs(
  controlBoardStore
);

const displayStore = useDisplayStore();

const state = reactive({
  inputLabel: '',
  inputNative: '',
  inputForeign: '',
});
const { inputLabel, inputNative, inputForeign } =
  toRefs(state);

const handleSubmit = async () => {
  const word = {
    label: inputLabel.value,
    native: inputNative.value,
    foreign: inputForeign.value,
  };
  const newWord = await addWord(
    token,
    word,
    activeWordSection.value.id
  );
  console.log('newOne', newWord);
  controlBoardStore.$patch({
    wordArr: await getWordArr(
      token,
      activeWordSection.value.id
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
      Создание слова
    </h2>
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-10 flex flex-col gap-7"
    >
      <input
        required
        v-model="inputLabel"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Ярлык слова"
      />
      <input
        required
        v-model="inputNative"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Слово на русском"
      />
      <input
        required
        v-model="inputForeign"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Слово на английском"
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
