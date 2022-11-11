<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useControlBoardStore } from '../../store/controlBoard';
import {
  DocumentTextIcon,
  ArrowLeftIcon,
  XMarkIcon,
  PlusCircleIcon,
  ChatBubbleOvalLeftEllipsisIcon,
} from '@heroicons/vue/24/outline';
import { useUserStore } from '../../store/user';
import { useDisplayStore } from '../../store/display';
import { useRouter } from 'vue-router';
import {
  getPhrases,
  deletePhrase,
} from '../../services/phraseService';

const controlBoardStore = useControlBoardStore();
const { activeModel, phrases } = storeToRefs(
  controlBoardStore
);

const userStore = useUserStore();
const { token } = userStore.userData;

const displayStore = useDisplayStore();

const router = useRouter();

onBeforeMount(async () => {
  phrases.value = await getPhrases(
    token,
    activeModel.value.id
  );
});

const handleGoBack = () => {
  router.back();
};

const handleDeleteClick = async (phrase) => {
  const deletedPhrase = await deletePhrase(
    token,
    phrase.id
  );
  phrases.value = await getPhrases(
    token,
    activeModel.value.id
  );
};
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
        <p>назад к моделям</p>
      </button>
      <h2 class="text-xl">
        Модель {{ activeModel.label }}
      </h2>
    </nav>
    <section class="w-full flex">
      <div
        class="flex flex-col gap-5 w-1/2 shadow-md p-5"
      >
        <h3
          class="py-2 flex gap-2 justify-start max-w-fit text-xl border-b-2 border-yellow-300"
        >
          <ChatBubbleOvalLeftEllipsisIcon
            class="w-5"
          />
          Фразы:
        </h3>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
            :key="phrase.name"
            v-for="phrase in phrases"
          >
            <button
              class="flex gap-3 shadow-lg p-3 rounded-lg active:shadow-md"
            >
              <p>
                {{ phrase.label }}
              </p>
              <p class="font-extralight">
                {{ phrase.native }}
              </p>
              <p class="text-sky-400">
                {{ phrase.foreign }}
              </p>
            </button>
            <button
              @click="handleDeleteClick(phrase)"
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
              popupElement: 'addPhrase',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать фразу</p>
        </button>
      </div>
    </section>
  </main>
</template>
