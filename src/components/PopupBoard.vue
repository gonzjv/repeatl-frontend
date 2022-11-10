<script setup>
import { storeToRefs } from 'pinia';
import { useDisplayStore } from '../store/display';
import PopupAddCourse from '@/components/PopupAddCourse.vue';
import PopupAddCollection from '@/components/PopupAddCollection.vue';
import PopupAddModelSection from './PopupAddModelSection.vue';

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
</template>
