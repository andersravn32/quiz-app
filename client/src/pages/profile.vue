<script setup>
import FormProfileEdit from "../components/FormProfileEdit.vue";
import useAccount from "../composables/useAccount";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const account = useAccount();

onMounted(() => {
  if (router.currentRoute.value.meta.auth && !account.value) {
    return router.push("/signin");
  }
});
</script>

<template>
  <section v-if="account" id="page-profile" class="container">
    <h1>Min profil</h1>

    <hgroup>
      <h2>Generel info</h2>
      <h3>
        <small>Her kan du ændre generel information vedrørende din konto</small>
      </h3>
    </hgroup>
    <FormProfileEdit />

    <hgroup>
      <h2>API info</h2>
      <h3>
        <small>Her finder du information vedrørende dine API nøgler</small>
      </h3>
    </hgroup>
  </section>
</template>
