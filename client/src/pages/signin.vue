<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAccount from "../composables/useAccount";

const router = useRouter();

const account = useAccount();

const loading = ref(false);

const user = ref({
  email: null,
  password: null,
});

const signin = async () => {
  // Update loading state
  loading.value = true;

  // Request signup
  const request = await fetch("http://127.0.0.1:3000/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user.value),
  }).then((res) => res.json());

  // Update loading state
  loading.value = false;

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
  <section id="page-signin" @submit.prevent="signin">
    <form class="container">
      <h1>Log på</h1>
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
      <button :aria-busy="loading">
        {{ loading ? "Vent venligst" : "Log på" }}
      </button>
      <p>
        Har du ingen konto? <router-link to="/signup">Opret mig</router-link>
      </p>
    </form>
  </section>
</template>
