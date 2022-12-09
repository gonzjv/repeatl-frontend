<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useControlBoardStore } from '../../store/controlBoard';
import {
  DocumentTextIcon,
  ArrowLeftIcon,
  XMarkIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../../store/user';
import { useDisplayStore } from '../../store/display';
import { useRouter } from 'vue-router';
import {
  deleteWord,
  getWordArr,
} from '../../services/wordService';

const controlBoardStore = useControlBoardStore();
const { activeWordSection, wordArr } =
  storeToRefs(controlBoardStore);

const userStore = useUserStore();
const { token } = userStore.userData;

const displayStore = useDisplayStore();

const router = useRouter();

onBeforeMount(async () => {
  wordArr.value = await getWordArr(
    token,
    activeWordSection.value.id
  );
});

const handleGoBack = () => {
  router.back();
};

const handleDeleteClick = async (word) => {
  await deleteWord(token, word.id);
  wordArr.value = await getWordArr(
    token,
    activeWordSection.value.id
  );
};

// const handleModelClick = (model) => {
//   controlBoardStore.$patch({
//     activeModel: model,
//   });
//   router.push('/controlBoard/model');
// };
</script>
<template>
  <main class="flex flex-col gap-10">
    <nav
      class="w-full flex justify-start items-center gap-10"
    >
      <button
        @click="handleGoBack"
        class="text-sky-400 flex gap-3 hover:font-extrabold"
      >
        <ArrowLeftIcon class="w-5" />
        <p>назад в разделы</p>
      </button>
      <h2 class="text-xl">
        Раздел {{ activeWordSection.number }}
      </h2>
    </nav>
    <section class="w-full flex">
      <div
        class="flex flex-col gap-5 w-1/2 shadow-md p-5 rounded-lg"
      >
        <h3
          class="py-2 flex gap-2 justify-start max-w-fit text-xl border-b-2 border-yellow-300"
        >
          <DocumentTextIcon class="w-5" />
          Слова:
        </h3>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
            :key="word.id"
            v-for="word in wordArr"
          >
            <button
              @click="handleModelClick(word)"
              class="flex gap-3 shadow-lg p-3 rounded-lg active:shadow-md"
            >
              <p class="font-extralight">
                {{ word.native }}
              </p>
              <p class="text-sky-400">
                {{ word.foreign }}
              </p>
            </button>
            <button
              @click="handleDeleteClick(word)"
            >
              <XMarkIcon
                class="w-5 hover:text-red-600"
              />
            </button>
          </li>
        </ul>
      </div>
      <div class="flex w-1/2 p-5">
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addWord',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать слово</p>
        </button>
      </div>
    </section>
  </main>
</template>
