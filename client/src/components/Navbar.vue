<script setup>
import FormCreateCategory from "./FormCreateCategory.vue";

import { useRouter } from "vue-router";
import useAccount from "../composables/useAccount";
import useModal from "../composables/useModal";
import useData from "../composables/useData";

const router = useRouter();
const account = useAccount();
const modal = useModal();
const data = useData();

const signout = async () => {
  const request = await fetch("http://127.0.0.1:3000/auth/signout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => res.json());

  if (!request.message) {
    return;
  }

  // Reset localStorage
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");

  // Reset account state
  account.value = null;

  // Reset data state
  data.categories.value = [];
  data.quizzes.value = [];
  data.answers.value = [];
  data.requestRefresh.value = false;

  // Push to signin
  return router.push("/signin");
};
</script>

<template>
  <nav id="navbar" class="container">
    <ul>
      <li>
        <strong v-if="account" @click="router.push('/dashboard')"
          >Quiz app</strong
        >
        <strong v-if="!account">Quiz app</strong>
      </li>
    </ul>
    <ul v-if="account">
      <li><router-link :to="`/profile`">Min profil</router-link></li>
      <li v-if="account.role == 1">
        <details role="list" dir="rtl">
          <summary aria-haspopup="listbox" role="link">Administrator</summary>
          <ul role="listbox">
            <li>
              <router-link to="/quiz/create">Opret ny quiz</router-link>
            </li>
            <li>
              <a
                href="#"
                @click="
                  modal.setComponent(FormCreateCategory);
                  modal.toggle();
                "
                >Opret ny kategori</a
              >
            </li>
          </ul>
        </details>
      </li>
      <li><a href="#" @click="signout">Log ud</a></li>
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
  z-index: 99;
  top: 0;
  left: 0;
  right: 0;
  background-color: #11191f;
}
</style>
