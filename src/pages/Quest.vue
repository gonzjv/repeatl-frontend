<script setup>
import QuestNav from '../components/QuestNav.vue';
import QuestProgress from '../components/QuestProgress.vue';
import QuestPhraseWindow from '@/components/QuestPhraseWindow.vue';
import QuestInput from '../components/QuestInput.vue';
</script>

<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <QuestNav />
    <section class="flex gap-10 w-full">
      <QuestProgress />
      <div class="w-6/12 flex flex-col gap-10">
        <QuestPhraseWindow />
        <QuestInput />
      </div>
      <aside>help</aside>
    </section>
  </main>
</template>
