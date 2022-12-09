<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';
import PopupAddCourse from '@/components/PopupAddCourse.vue';
import PopupAddCollection from '@/components/PopupAddCollection.vue';
import PopupAddModelSection from './PopupAddModelSection.vue';
import PopupAddModel from './PopupAddModel.vue';
import PopupAddPhrase from './PopupAddPhrase.vue';
import PopupAddWordSection from './PopupAddWordSection.vue';
import PopupAddWord from './PopupAddWord.vue';

const displayStore = useDisplayStore();
const { popupElement } =
  storeToRefs(displayStore);
</script>
<template>
  <PopupAddCourse
    v-if="popupElement == 'addCourse'"
  />
  <PopupAddCollection
    v-if="popupElement == 'addCollection'"
  />
  <PopupAddModelSection
    v-if="popupElement == 'addModelSection'"
  />
  <PopupAddModel
    v-if="popupElement == 'addModel'"
  />
  <PopupAddPhrase
    v-if="popupElement == 'addPhrase'"
  />
  <PopupAddWordSection
    v-if="popupElement == 'addWordSection'"
  />
  <PopupAddWord
    v-if="popupElement == 'addWord'"
  />
</template>
