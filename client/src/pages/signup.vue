<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAccount from "../composables/useAccount";

const router = useRouter();

const account = useAccount();

const loading = ref(false);

const error = ref(null);

const user = ref({
  firstName: null,
  lastName: null,
  identifier: null,
  email: null,
  password: null,
});

const signup = async () => {
  // Update loading state
  loading.value = true;

  // Request signup
  const request = await fetch("http://127.0.0.1:3000/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user.value),
  }).then((res) => res.json());

  // Update loading state
  loading.value = false;

  if (request.error) {
    error.value = request.error;
  }

  // If signup wasnt successful
  if (!request.accessToken) {
    return;
  }

  localStorage.setItem("refreshToken", request.refreshToken);
  localStorage.setItem("accessToken", request.accessToken);

  account.value = request.user;

  return router.push("/dashboard");
};
</script>

<template>
  <section id="page-signup" @submit.prevent="signup">
    <form class="container">
      <h1>Opret ny konto</h1>
      <div class="grid">
        <label for="firstname">
          Fornavn
          <input
            v-model="user.firstName"
            type="text"
            placeholder="Fornavn"
            required
          />
        </label>

        <label for="lastname">
          Efternavn
          <input
            v-model="user.lastName"
            type="text"
            placeholder="Efternavn"
            required
          />
        </label>
      </div>
      <label for="identifier">
        Brugernavn
        <input
          v-model="user.identifier"
          type="text"
          placeholder="Brugernavn"
          required
        />
      </label>
      <label for="email">
        Email
        <input v-model="user.email" type="email" placeholder="Email" required />
      </label>
      <label for="password">
        Password
        <input
          v-model="user.password"
          type="password"
          placeholder="Password"
          required
        />
      </label>
      <p style="color: #c62828" v-if="error">* {{ error }}</p>
      <button :aria-busy="loading">
        {{ loading ? "Vent venligst" : "Opret konto" }}
      </button>
      <p>
        Har du allerede en konto? <router-link to="/signin">Log på</router-link>
      </p>
    </form>
  </section>
</template>
