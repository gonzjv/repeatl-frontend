<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { answer, currentPhrase } =
  storeToRefs(courseStore);

const checkAnswer = () => {
  const answerLength =
    answer.value.split('').length;
  const phraseToCompare =
    currentPhrase.value.foreign;
  const phraseLength =
    phraseToCompare.split('').length;
  const stringToCompare = phraseToCompare
    .split('')
    .slice(0, answerLength)
    .join('');

  courseStore.$patch({
    isAnswerCorrect:
      answer.value == stringToCompare
        ? true
        : false,
    isAnswerFullfilled:
      answerLength == phraseLength ? true : false,
  });
};
</script>
<template>
  <input
    placeholder="Введите фразу..."
    @input="checkAnswer"
    v-model="answer"
    class="w-full bg-white shadow-lg rounded-lg p-3 border-2 border-transparent focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
    type="text"
  />
</template>
