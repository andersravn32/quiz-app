<script setup>
import useAccount from "../composables/useAccount";

import { ref } from "vue";
import useData from "../composables/useData";
import { useRouter } from "vue-router";

const account = useAccount();
const data = useData();
const router = useRouter();

const error = ref(null);

const loading = ref(false);

const remove = async () => {
  if (!confirm("Du er ved at slette din konto, er du sikker?")) {
    return;
  }

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

  const deleteRequest = await fetch(
    `http://127.0.0.1:3000/profile/${account.value.identifier}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  ).then((res) => res.json());

  if (!deleteRequest.message) {
    return;
  }
  console.log(deleteRequest);
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

const user = ref({
  firstName: null,
  lastName: null,
  email: null,
  password: null,
});

const edit = async () => {
  // Update loading state
  loading.value = true;

  const request = await fetch(
    `http://127.0.0.1:3000/profile/${account.value.identifier}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
      body: JSON.stringify(user.value),
    }
  ).then((res) => res.json());

  if (request.error) {
    error.value = request.error;
  }

  if (!request.data) {
    return;
  }

  // Update loading state
  loading.value = false;
};
</script>

<template>
  <form id="form-profile-edit" class="container" @submit.prevent="edit">
    <div>
      <div class="grid">
        <label for="firstname">
          Fornavn
          <input
            v-model="user.firstName"
            type="text"
            :placeholder="account.firstName"
            required
          />
        </label>

        <label for="lastname">
          Efternavn
          <input
            v-model="user.lastName"
            type="text"
            :placeholder="account.lastName"
            required
          />
        </label>
      </div>
      <div class="grid">
        <label for="email">
          Email
          <input
            v-model="user.email"
            type="email"
            :placeholder="account.email"
          />
        </label>
        <label for="identifier">
          Brugernavn
          <input type="text" :placeholder="account.identifier" disabled />
        </label>
      </div>
      <div class="grid">
        <label for="password">
          Password
          <input
            v-model="user.password"
            type="password"
            placeholder="•••••••••••••••••••••••••••••••"
          />
        </label>
        <div></div>
      </div>
    </div>
    <p style="color: #c62828" v-if="error">* {{ error }}</p>
    <div>
      <a href="#" role="button" :aria-busy="loading" @click="edit">
        {{ loading ? "Vent venligst" : "Gem profil" }}</a
      >
    </div>
    <div style="margin-top: 0.5rem">
      <a style="color: #c62828" href="#" @click="remove"
        ><small>Slet min konto</small></a
      >
    </div>
  </form>
</template>
