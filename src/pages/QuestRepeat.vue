<script setup>
import QuestNav from '../components/QuestNav.vue';
import QuestPhraseWindow from '../components/QuestPhraseWindow.vue';
import QuestProgress from '../components/QuestProgress.vue';
import QuestRepeatBtnNext from '../components/QuestRepeatBtnNext.vue';
import QuestRepeatForm from '../components/QuestRepeatForm.vue';
import QuestStatus from '../components/QuestStatus.vue';
</script>

<template>
  <main
    class="flex flex-col w-full items-start gap-10"
  >
    <QuestNav route="/modelList" />
    <section class="flex gap-10 w-full">
      <QuestProgress />
      <div class="w-6/12 flex flex-col gap-10">
        <QuestPhraseWindow />
        <QuestRepeatForm />
      </div>
      <div
        class="flex flex-col justify-between gap-10"
      >
        <QuestStatus />
        <QuestRepeatBtnNext />
      </div>
    </section>
  </main>
</template>
