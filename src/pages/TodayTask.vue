<script setup>
import {
  onBeforeMount,
  toRefs,
  reactive,
} from 'vue';
import { useUserStore } from '../store/user';
import { getCompletedModelSectionArr } from '@/services/modelService';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { userData } = storeToRefs(userStore);

const state = reactive({
  completedSectionArr: [],
});

const { completedSectionArr } = toRefs(state);
onBeforeMount(async () => {
  completedSectionArr.value =
    await getCompletedModelSectionArr(
      userData.value.token,
      userData.value.id
    );
  console.log(
    'completedSectionArr',
    completedSectionArr.value
  );
});
</script>
<template>
  <main>
    <h2>Today task list</h2>
    <p>{{ userData }}</p>
    <p>{{ completedSectionArr }}</p>
  </main>
</template>
