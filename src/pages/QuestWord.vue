<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import QuestNav from '../components/QuestNav.vue';
import QuestWordProgress from '../components/QuestWordProgress.vue';
import QuestWordWindow from '../components/QuestWordWindow.vue';
import QuestWordForm from '../components/QuestWordForm.vue';
import QuestWordStatus from '../components/QuestWordStatus.vue';

const courseStore = useCourseStore();
const { currentSection } =
  storeToRefs(courseStore);
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
      <QuestWordStatus />
    </section>
  </main>
</template>
