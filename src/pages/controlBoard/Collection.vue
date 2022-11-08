<script setup>
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { useControlBoardStore } from '../../store/controlBoard';

const controlBoardStore = useControlBoardStore();
const { activeCollection } = storeToRefs(
  controlBoardStore
);

const router = useRouter();

const handleGoBack = () => {
  router.back();
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
    <h2>ModelSubCollection</h2>
    <p>{{ activeCollection }}</p>
  </main>
</template>
