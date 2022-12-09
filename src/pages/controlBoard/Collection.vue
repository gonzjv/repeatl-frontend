<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useControlBoardStore } from '../../store/controlBoard';
import { useUserStore } from '../../store/user';
import {
  ArrowLeftIcon,
  XMarkIcon,
  PlusCircleIcon,
  FolderOpenIcon,
} from '@heroicons/vue/24/outline';
import {
  deleteModelSection,
  getModelSections,
} from '@/services/modelService';
import { useDisplayStore } from '../../store/display';
import {
  deleteWordSection,
  getWordSections,
} from '../../services/wordService';

const controlBoardStore = useControlBoardStore();
const {
  activeCollection,
  modelSections,
  wordSections,
} = storeToRefs(controlBoardStore);

const userStore = useUserStore();
const { token } = userStore.userData;

const displayStore = useDisplayStore();

const router = useRouter();

onBeforeMount(async () => {
  modelSections.value = await getModelSections(
    token,
    activeCollection.value.id
  );
  wordSections.value = await getWordSections(
    token,
    activeCollection.value.id
  );
});

const handleGoBack = () => {
  router.back();
};

const handleDeleteModelSection = async (
  modelSection
) => {
  const deletedCollection =
    await deleteModelSection(token, modelSection);

  modelSections.value = await getModelSections(
    token,
    activeCollection.value.id
  );
};

const handleWordSectionDelete = async (
  wordSection
) => {
  const deletedCollection =
    await deleteWordSection(token, wordSection);

  wordSections.value = await getWordSections(
    token,
    activeCollection.value.id
  );
};

const handleModelSectionClick = (
  modelSection
) => {
  controlBoardStore.$patch({
    activeModelSection: modelSection,
  });
  router.push('/controlBoard/modelSection');
};

const handleWordSectionClick = (wordSection) => {
  controlBoardStore.$patch({
    activeWordSection: wordSection,
  });
  router.push('/controlBoard/wordSection');
};
</script>
<template>
  <main class="flex flex-col gap-10">
    <nav class="w-full flex justify-start">
      <button
        @click="handleGoBack"
        class="text-sky-400 flex gap-3 hover:font-extrabold"
      >
        <ArrowLeftIcon class="w-5" />
        <p>назад в коллекции</p>
      </button>
    </nav>
    <section class="w-full flex">
      <dl
        class="flex flex-col gap-5 w-1/2 shadow-md p-5 rounded-lg"
      >
        <div class="flex flex-col w-full gap-5">
          <h2
            class="py-2 flex gap-2 justify-start max-w-fit text-xl border-b-2 border-yellow-300"
          >
            <FolderOpenIcon class="w-5" />
            Разделы моделей:
          </h2>
          <ul class="flex flex-col gap-3">
            <li
              class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
              :key="modelSection.name"
              v-for="modelSection in modelSections"
            >
              <button
                @click="
                  handleModelSectionClick(
                    modelSection
                  )
                "
                class="shadow-lg p-3 rounded-lg active:shadow-md"
              >
                {{ modelSection.number }}
              </button>
              <button
                @click="
                  handleDeleteModelSection(
                    modelSection
                  )
                "
              >
                <XMarkIcon
                  class="w-5 hover:text-red-600"
                />
              </button>
            </li>
          </ul>
        </div>
        <div class="flex flex-col w-full gap-5">
          <dt
            class="py-2 flex gap-2 justify-start max-w-fit text-xl border-b-2 border-yellow-300"
          >
            <FolderOpenIcon class="w-5" />
            Разделы слов:
          </dt>
          <ul class="flex flex-col gap-3">
            <li
              class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
              :key="wordSection.name"
              v-for="wordSection in wordSections"
            >
              <button
                @click="
                  handleWordSectionClick(
                    wordSection
                  )
                "
                class="shadow-lg p-3 rounded-lg active:shadow-md"
              >
                {{ wordSection.number }}
              </button>
              <button
                @click="
                  handleWordSectionDelete(
                    wordSection
                  )
                "
              >
                <XMarkIcon
                  class="w-5 hover:text-red-600"
                />
              </button>
            </li>
          </ul>
        </div>
      </dl>
      <div class="flex flex-col gap-10 w-1/2 p-5">
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addModelSection',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 max-w-max p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать раздел моделей</p>
        </button>
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addWordSection',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 max-w-max p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать раздел слов</p>
        </button>
      </div>
    </section>
  </main>
</template>
