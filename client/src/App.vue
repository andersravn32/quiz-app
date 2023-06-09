<script setup>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";
import useAccount from "./composables/useAccount";
import useData from "./composables/useData";
import { onMounted, ref } from "vue";

const account = useAccount();
const data = useData();
const ready = ref(false);

onMounted(async () => {
  // If localStorage is empty, set ready state
  if (!localStorage.getItem("refreshToken")) {
    return (ready.value = true);
  }

  // Fetch fresh user data from server
  const request = await fetch("http://127.0.0.1:3000/auth/refresh", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then((res) => res.json());

  // If refresh failed, reset localStorage and set ready value
  if (!request.accessToken) {
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("accessToken");
    return ready.value = true;
  }

  // If refresh was successful, set localStorage, useAccount composable and ready state
  localStorage.setItem("refreshToken", request.refreshToken);
  localStorage.setItem("accessToken", request.accessToken);
  account.value = request.user;

  // Update quiz data in composable
  await data.refresh();

  ready.value = true;
});
</script>
<template>
  <div>
    <Navbar v-if="ready" />
    <div v-if="ready" id="content">
      <router-view v-slot="{ Component }">
        <Suspense>
          <component :is="Component" />
        </Suspense>
      </router-view>
    </div>
    <Footer v-if="ready" />
    <Modal v-if="ready" />
  </div>
</template>

<style>
#content {
  margin-top: 72px;
}
</style>
