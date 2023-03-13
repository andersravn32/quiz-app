<script setup>
import useAccount from "../composables/useAccount";

import { ref } from "vue";

const account = useAccount();

const loading = ref(false);

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
    <div>
      <a href="#" role="button" :aria-busy="loading" @click="edit">
        {{ loading ? "Vent venligst" : "Gem profil" }}</a
      >
    </div>
    <div style="margin-top:.5rem;"><a style="color:#c62828;" href="#"><small>Slet min konto</small></a></div>
  </form>
</template>
