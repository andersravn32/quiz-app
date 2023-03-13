<script setup>
import useAccount from "../composables/useAccount";

const account = useAccount();
</script>

<template>
  <nav id="navbar" class="container">
    <ul>
      <li>
        <strong>Quiz app</strong>
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
            <li><a>Opret ny quiz</a></li>
            <li><a>Opret ny kategori</a></li>
            <li><a>Administrer brugere</a></li>
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
