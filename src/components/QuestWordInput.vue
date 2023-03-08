<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';

const courseStore = useCourseStore();
const { answer, currentWord } =
  storeToRefs(courseStore);
const checkAnswer = () => {
  const answerLength =
    answer.value.split('').length;
  const wordToCompare = currentWord.value.foreign;
  const phraseLength =
    wordToCompare.split('').length;
  const stringToCompare = wordToCompare
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
    class="p-3 shadow-lg w-full bg-white rounded-lg border-2 border-transparent focus-visible:outline-none focus:border-yellow-400 focus:border-2 transition duration-700"
    type="text"
  />
</template>
