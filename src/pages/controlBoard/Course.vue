<script setup>
import { storeToRefs } from 'pinia';
import { useControlBoardStore } from '../../store/controlBoard';
import {
  ArrowLeftIcon,
  RectangleStackIcon,
  XMarkIcon,
  PlusCircleIcon,
} from '@heroicons/vue/24/outline';
import { useDisplayStore } from '../../store/display';
import {
  onBeforeMount,
  reactive,
  toRefs,
} from 'vue';
import {
  deleteCollection,
  getCollections,
} from '../../services/collectionService';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';
import { addDataFromFile } from '../../services/courseService';
import { DocumentTextIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

const displayStore = useDisplayStore();
const controlBoardStore = useControlBoardStore();
const { collections, activeCourse } = storeToRefs(
  controlBoardStore
);
const userStore = useUserStore();
const { token } = userStore.userData;

const state = reactive({
  inputFile: null,
});
const { inputFile } = toRefs(state);

onBeforeMount(async () => {
  controlBoardStore.$patch({
    collections: await getCollections(
      activeCourse.value.id,
      token
    ),
  });
});

const handleDeleteClick = async (collection) => {
  const deletedCollection =
    await deleteCollection(token, collection);
  collections.value = await getCollections(
    activeCourse.value.id,
    token
  );
};

const handleCollectionClick = async (
  collection
) => {
  controlBoardStore.$patch({
    activeCollection: collection,
  });
  router.push('/controlBoard/collection');
};

const handleFileChange = async () => {
  console.log('file', inputFile.value.files[0]);
  await addDataFromFile(
    token,
    inputFile.value.files[0],
    activeCourse.value.id
  );
  collections.value = await getCollections(
    activeCourse.value.id,
    token
  );
};
</script>
<template>
  <main class="flex flex-col gap-10">
    <nav class="w-full flex justify-start">
      <router-link
        class="text-sky-400 flex gap-3 hover:font-extrabold"
        to="/controlBoard/courseList"
      >
        <ArrowLeftIcon class="w-5" />
        <p>назад к курсам</p>
      </router-link>
    </nav>
    <section class="w-full flex">
      <div
        class="flex flex-col gap-5 w-1/2 shadow-md p-5 rounded-lg"
      >
        <h2
          class="py-2 flex gap-2 justify-start max-w-fit text-xl border-b-2 border-yellow-300"
        >
          <RectangleStackIcon class="w-5" />
          Коллекции:
        </h2>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
            :key="collection.name"
            v-for="collection in collections"
          >
            <button
              @click="
                handleCollectionClick(collection)
              "
              class="shadow-lg p-3 rounded-lg active:shadow-md"
            >
              {{ collection.number }}
            </button>
            <button
              @click="
                handleDeleteClick(collection)
              "
            >
              <XMarkIcon
                class="w-5 hover:text-red-600"
              />
            </button>
          </li>
        </ul>
      </div>
      <div
        class="flex w-1/2 p-5 flex-col gap-10 items-start"
      >
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addCollection',
            })
          "
          class="max-w-max shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать коллекцию</p>
        </button>
        <div
          class="shadow-md flex flex-col items-start gap-7 bg-sky-50 p-7 rounded-lg"
        >
          <label class="flex gap-3" for="csvFile">
            <DocumentTextIcon class="w-6" />

            Добавить данные в коллекцию из файла
            .csv</label
          >
          <input
            class=""
            ref="inputFile"
            @change="handleFileChange"
            type="file"
            name="csvFile"
          />
        </div>
      </div>
    </section>
  </main>
</template>
