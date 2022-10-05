<script setup></script>
<template>
  <header
    class="flex w-10/12 items-center justify-center"
  >
    <nav>
      <router-link to="/">Главная</router-link>
      |
      <router-link to="/tasks"
        >Выбор заданий</router-link
      >
      |
      <router-link to="/todayTasks"
        >Задания на сегодня</router-link
      >
    </nav>
  </header>
</template>
