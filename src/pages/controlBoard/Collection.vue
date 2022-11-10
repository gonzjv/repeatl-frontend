<script setup>
import { storeToRefs } from 'pinia';
import { onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useControlBoardStore } from '../../store/controlBoard';
import { useUserStore } from '../../store/user';
import {
  ArrowLeftIcon,
  RectangleStackIcon,
  XMarkIcon,
  PlusCircleIcon,
  FolderOpenIcon,
} from '@heroicons/vue/24/outline';
import {
  deleteModelSection,
  getModelSections,
} from '@/services/modelService';
import { useDisplayStore } from '../../store/display';

const controlBoardStore = useControlBoardStore();
const { activeCollection, modelSections } =
  storeToRefs(controlBoardStore);

const userStore = useUserStore();
const { token } = userStore.userData;

const displayStore = useDisplayStore();

const router = useRouter();

// const { modelSections } =
//   activeCollection.value.modelSubCollection;

onBeforeMount(async () => {
  modelSections.value = await getModelSections(
    token,
    activeCollection.value.modelSubCollection.id
  );
});

const handleGoBack = () => {
  router.back();
};

const handleDeleteClick = async (
  modelSection
) => {
  const deletedCollection =
    await deleteModelSection(token, modelSection);

  modelSections.value = await getModelSections(
    token,
    activeCollection.value.modelSubCollection.id
  );
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
      <div
        class="flex flex-col gap-5 w-1/2 shadow-md p-5"
      >
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
                handleCollectionClick(
                  modelSection
                )
              "
              class="shadow-lg p-3 rounded-lg active:shadow-md"
            >
              {{ modelSection.label }}
            </button>
            <button
              @click="
                handleDeleteClick(modelSection)
              "
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
              popupElement: 'addModelSection',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать раздел</p>
        </button>
      </div>
    </section>
    <h2>ModelSubCollection</h2>
    <p>{{ activeCollection }}</p>
  </main>
</template>
