<script setup>
import FormCreateCategory from "./FormCreateCategory.vue";
import FormCreateQuiz from "./FormCreateQuiz.vue";

import { useRouter } from "vue-router";
import useAccount from "../composables/useAccount";
import useModal from "../composables/useModal";

const router = useRouter();
const account = useAccount();
const modal = useModal();

</script>

<template>
  <nav id="navbar" class="container">
    <ul>
      <li>
        <strong v-if="account" @click="router.push('/dashboard')">Quiz app</strong>
        <strong v-if="!account">Quiz app</strong>
      </li>
    </ul>
    <ul v-if="account">
      <li><router-link to="/quizzes">Mine quizzer</router-link></li>
      <li><router-link to="/leaderboard">Leaderboard</router-link></li>
      <li><router-link :to="`/profile`">Min profil</router-link></li>
      <li v-if="account.role == 1">
        <details role="list" dir="rtl">
          <summary aria-haspopup="listbox" role="link">Administrator</summary>
          <ul role="listbox">
            <li><a href="#" @click="modal.setComponent(FormCreateQuiz); modal.toggle()">Opret ny quiz</a></li>
            <li><a href="#" @click="modal.setComponent(FormCreateCategory); modal.toggle()">Opret ny kategori</a></li>
            <li><a href="#">Administrer brugere</a></li>
          </ul>
        </details>
      </li>
    </ul>
    <ul v-if="!account">
      <li><router-link to="/signin">Log på</router-link></li>
      <li><router-link to="/signup" role="button">Opret konto</router-link></li>
    </ul>
  </nav>
</template>

<style>
#navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>
