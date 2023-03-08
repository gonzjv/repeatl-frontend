<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useUserStore } from '../store/user';
import QuestNav from '../components/QuestNav.vue';
import QuestWordProgress from '../components/QuestWordProgress.vue';
import QuestWordWindow from '../components/QuestWordWindow.vue';
import QuestWordForm from '../components/QuestWordForm.vue';

const courseStore = useCourseStore();
const { currentSection, isFirstRepeatActive } =
  storeToRefs(courseStore);

const userStore = useUserStore();

const { wordSectionState } =
  storeToRefs(userStore);
</script>

<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <QuestNav route="/wordList" />
    <h2 class="text-xl">
      {{ currentSection.label }}
    </h2>
    <section class="flex gap-10 w-full">
      <QuestWordProgress />
      <div class="w-6/12 flex flex-col gap-10">
        <QuestWordWindow />
        <QuestWordForm />
      </div>
      <aside>
        <div
          class="shadow-lg rounded-lg p-3 flex gap-2 items-center justify-between"
        >
          <p
            v-if="
              wordSectionState.isIntroActive &&
              !isFirstRepeatActive
            "
          >
            Ознакомление
          </p>
          <p v-if="isFirstRepeatActive">
            Первое повторение
          </p>
          <p
            v-if="
              wordSectionState.isSecondRepeatActive
            "
          >
            Второе повторение
          </p>
        </div>
      </aside>
    </section>
  </main>
</template>
