<script setup>
import { onMounted } from "vue";
import useAccount from "../composables/useAccount";
import { useRouter } from "vue-router";

const router = useRouter();
const account = useAccount();

onMounted(() => {
  if (router.currentRoute.value.meta.auth && !account.value) {
    return router.push("/signin");
  }
});
</script>

<template>
  <section v-if="account" id="page-dashboard" class="container">
    <h1>Dashboard</h1>
    <hgroup>
      <h2>Velkommen {{ account.firstName }}!</h2>
      <h3>
        <small>Nedenfor kan du se de quizzer som du kan tage.</small>
      </h3>
    </hgroup>
    <div class="grid"></div>
  </section>
</template>
