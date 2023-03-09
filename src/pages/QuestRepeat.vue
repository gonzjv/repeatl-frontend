<script setup>
import QuestNav from '../components/QuestNav.vue';
import QuestPhraseWindow from '../components/QuestPhraseWindow.vue';
import QuestProgress from '../components/QuestProgress.vue';
import QuestRepeatForm from '../components/QuestRepeatForm.vue';
import QuestWordStatus from '../components/QuestWordStatus.vue';
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
      <!-- <aside>help</aside> -->
      <QuestWordStatus />
    </section>
  </main>
</template>
