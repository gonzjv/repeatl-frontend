<script setup>
import { reactive, toRefs } from 'vue';
import { addUser } from '@/services/userService';
import { loginUser } from '../services/userService';
import { useUserStore } from '../store/user';
import { useDisplayStore } from '../store/display';
import { ArrowLongDownIcon } from '@heroicons/vue/24/outline';
// import { useRouter } from 'vue-router';

// const router = useRouter();
const userStore = useUserStore();
const displayStore = useDisplayStore();

const state = reactive({
  isLoginMode: true,
  email: '',
  password: '',
  newUser: {},
  isLoginFail: false,
  isSignupSuccess: false,
});
const {
  isLoginMode,
  email,
  password,
  newUser,
  isLoginFail,
  isSignupSuccess,
} = toRefs(state);

const signIn = async () => {
  const user = {
    email: email.value,
    password: password.value,
  };

  const response = await loginUser(user);
  if (response.token) {
    userStore.$patch({
      userData: response,
      isUserLoggedIn: true,
    });

    response.role == 'admin' &&
      userStore.$patch({ isAdminHere: true });

    isLoginFail.value = false;
    displayStore.$patch({
      isPopupDisplay: false,
      isLoginPopupDisplay: false,
    });
    // router.push('/tasks');
  } else {
    isLoginFail.value = true;
  }
  console.log('userData', response);
};

const signUp = async () => {
  const user = {
    email: email.value,
    password: password.value,
    role: 'user',
  };

  const createdUser = await addUser(user);
  if (createdUser) {
    newUser.value = createdUser;
    isSignupSuccess.value = true;
  }
};

const handleSubmit = async () => {
  if (isLoginMode.value) {
    signIn();
  }
  if (!isLoginMode.value) {
    signUp();
  }
};
</script>
<template>
  <div
    class="py-5 flex flex-col justify-center gap-5 z-20 blur-0 bg-white shadow-lg absolute top-[12vh] left-[40vw] w-4/12 h-[500px] overflow-auto rounded-md"
  >
    <form
      @submit.prevent="handleSubmit"
      class="w-full p-10 flex flex-col gap-7"
      action=""
    >
      <input
        @input="isLoginFail = false"
        v-model="email"
        class="w-full bg-transparent border-2 border-sky-400 rounded-md h-10 p-2"
        type="text"
        placeholder="Эл. почта"
      />
      <input
        @input="isLoginFail = false"
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
        class="relative bg-gradient-to-r from-cyan-400 via-yellow-200 to-pink-400 rounded-full h-10 text-slate-400 font-bold"
      >
        {{
          isLoginMode
            ? 'ВОЙТИ'
            : 'ЗАРЕГИСТРИРОВАТЬСЯ'
        }}
        <p
          v-if="isLoginFail"
          class="absolute left-0 -top-7 font-extralight text-sm text-red-400"
        >
          Неверный емейл и/или пароль.
        </p>
      </button>
    </form>
    <aside
      class="flex flex-col gap-5 justify-center items-center px-5"
    >
      <div
        class="flex text-justify text-emerald-400 font-light w-full"
        v-if="isSignupSuccess"
      >
        <p class="w-2/3">
          Добро пожаловать, {{ newUser.email }}.
          Можете смело нажать
        </p>
        <ArrowLongDownIcon class="w-1/6" />
      </div>
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
          @click="
            isLoginMode = true;
            isSignupSuccess = false;
          "
        >
          Вход
        </button>
      </div>
    </aside>
  </div>
</template>
