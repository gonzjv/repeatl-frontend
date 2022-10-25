<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';
import {
  reactive,
  toRefs,
  onBeforeMount,
} from 'vue';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const { isLoginPopupDisplay } =
  storeToRefs(displayStore);
const { currentSection, currentCollection } =
  storeToRefs(courseStore);

const state = reactive({
  isLoginMode: true,
});

const { isLoginMode } = toRefs(state);
</script>
<template>
  <div
    class="py-5 flex flex-col gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[12vh] left-[40vw] w-4/12 h-96 overflow-auto rounded-md"
  >
    <form class="w-full p-5" action="">
      <input
        class="w-full"
        type="text"
        placeholder="Эл. почта"
      />
      <input
        class="w-full"
        type="text"
        placeholder="Пароль"
      />
      <input
        v-if="!isLoginMode"
        class="w-full"
        type="text"
        placeholder="Пароль еще разок"
      />
      <button>
        {{
          isLoginMode
            ? 'ВОЙТИ'
            : 'ЗАРЕГИСТРИРОВАТЬСЯ'
        }}
      </button>
    </form>
    <aside class="flex gap-5">
      <p class="text-xs font-extralight">
        Не зарегистрированы?
      </p>
      <button @click="isLoginMode = true">
        Регистрация
      </button>
    </aside>
  </div>
</template>
