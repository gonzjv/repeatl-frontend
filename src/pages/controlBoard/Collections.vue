<script setup>
import { storeToRefs } from 'pinia';
import { useControlBoardStore } from '../../store/controlBoard';
import {
  ArrowLeftIcon,
  SquaresPlusIcon,
  Squares2X2Icon,
  XMarkIcon,
} from '@heroicons/vue/24/outline';
import { useDisplayStore } from '../../store/display';

const displayStore = useDisplayStore();
const controlBoardStore = useControlBoardStore();
const { collections } = storeToRefs(
  controlBoardStore
);

const handleDeleteClick = async (course) => {
  //   const deletedCollection = await delete(
  //     token,
  //     course
  //   );
  //   courses.value = await getCourses(token);
};

const handleCollectionClick = async (
  courseId
) => {
  //   controlBoardStore.$patch({
  //     collections: await getCollections(
  //       courseId,
  //       token
  //     ),
  //   });
  //   router.push('/controlBoard/collections');
};
</script>
<template>
  <main class="flex flex-col gap-10">
    <nav class="w-full flex justify-start">
      <router-link
        class="text-sky-400 flex gap-3 hover:font-extrabold"
        to="/controlBoard/courses"
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
          class="py-2 flex gap-2 justify-start w-2/12 text-xl border-b-2 border-yellow-300"
        >
          <Squares2X2Icon class="w-5" />
          Коллекции:
        </h2>
        <ul class="flex flex-col gap-3">
          <li
            class="flex justify-start items-center gap-5 border-l-2 border-transparent hover:border-yellow-300 hover:border-l-2"
            v-for="collection in collections"
          >
            <button
              @click="
                handleCollectionClick(
                  collection.id
                )
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
          <SquaresPlusIcon class="w-5" />
          <p>Создать коллекцию</p>
        </button>
      </div>
    </section>
  </main>

  <main>
    <section>
      <h2>Коллекции</h2>
      <ul>
        <li v-for="collection in collections">
          {{ collection }}
        </li>
      </ul>
    </section>
    <section></section>
  </main>
</template>
