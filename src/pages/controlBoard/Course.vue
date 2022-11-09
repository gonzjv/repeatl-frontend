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
import { onBeforeMount } from 'vue';
import {
  deleteCollection,
  getCollections,
} from '../../services/collectionService';
import { useUserStore } from '../../store/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const displayStore = useDisplayStore();
const controlBoardStore = useControlBoardStore();
const { collections, activeCourse } = storeToRefs(
  controlBoardStore
);
const userStore = useUserStore();
const { token } = userStore.userData;

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
        class="flex flex-col gap-5 w-1/2 shadow-md p-5"
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
              {{ collection.name }}
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
      <div class="flex w-1/2 p-5">
        <button
          @click="
            displayStore.$patch({
              isBoardPopupDisplay: true,
              isPopupDisplay: true,
              popupElement: 'addCollection',
            })
          "
          class="shadow-lg active:shadow-md flex gap-3 bg-fuchsia-400 h-12 p-3 rounded-lg text-white"
        >
          <PlusCircleIcon class="w-5" />
          <p>Создать коллекцию</p>
        </button>
      </div>
    </section>
  </main>
</template>
