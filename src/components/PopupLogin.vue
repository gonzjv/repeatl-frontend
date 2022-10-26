<script setup>
import { storeToRefs } from 'pinia';
import { useCourseStore } from '../store/course';
import { useDisplayStore } from '../store/display';
import { reactive, toRefs } from 'vue';
import { addUser } from '@/services/userService';

const displayStore = useDisplayStore();
const courseStore = useCourseStore();
const { isLoginPopupDisplay } =
  storeToRefs(displayStore);
const { currentSection, currentCollection } =
  storeToRefs(courseStore);

const state = reactive({
  isLoginMode: true,
  email: '',
  password: '',
  newUser: {},
});
const { isLoginMode, email, password, newUser } =
  toRefs(state);

const handleSubmit = async () => {
  if (isLoginMode.value) {
  }
  if (!isLoginMode.value) {
    const user = {
      email: email.value,
      password: password.value,
      role: 'user',
    };

    const createdUser = await addUser(user);
    if (createdUser) {
      newUser.value = createdUser;
    }
  }
};
</script>
<template>
  <div
    class="py-5 flex flex-col justify-center gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[12vh] left-[40vw] w-4/12 h-96 overflow-auto rounded-md"
  >
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-5 flex flex-col gap-7"
      action=""
    >
      <input
        v-model="email"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Эл. почта"
      />
      <input
        v-model="password"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Пароль"
      />
      <input
        v-if="!isLoginMode"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Пароль еще разок"
      />
      <button
        type="submit"
        class="bg-gradient-to-r from-cyan-400 via-yellow-200 to-pink-400 rounded-full h-10 text-slate-400 font-bold"
      >
        {{
          isLoginMode
            ? 'ВОЙТИ'
            : 'ЗАРЕГИСТРИРОВАТЬСЯ'
        }}
      </button>
    </form>
    <aside
      class="flex flex-col gap-5 justify-center items-center px-5"
    >
      <p
        class="text-emerald-400 font-light"
        v-if="newUser.email"
      >
        Добро пожаловать, {{ newUser.email }}.
        Можете смело нажать
      </p>
      <div class="flex gap-5 items-center">
        <p class="text-xs font-extralight">
          {{
            isLoginMode
              ? 'Не зарегистрированы?'
              : 'Уже зарегистрированы?'
          }}
        </p>
        <button
          class="text-sky-400"
          v-if="isLoginMode"
          @click="isLoginMode = false"
        >
          Регистрация
        </button>
        <button
          class="text-sky-400"
          v-if="!isLoginMode"
          @click="isLoginMode = true"
        >
          Вход
        </button>
      </div>
    </aside>
  </div>
</template>
