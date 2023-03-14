<script setup>
import { ref } from "vue";
const error = ref(null);
const keys = ref([]);

keys.value = await fetch("http://127.0.0.1:3000/auth/api", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
}).then((res) => res.json());

const createKey = async () => {
  const request = await fetch("http://127.0.0.1:3000/auth/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => res.json());

  if (request.error) {
    error.value = request.error;
  }

  if (!request.message) {
    return;
  }

  keys.value.push(request.key);
};

const deleteKey = async (key) => {
  const request = await fetch("http://127.0.0.1:3000/auth/api", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify({
      token: key,
    }),
  }).then((res) => res.json());

  if (request.error) {
    error.value = request.error;
  }

  if (!request.message) {
    return;
  }

  keys.value = keys.value.filter((k) => {
    return k != key;
  });
};
</script>

<template>
  <div>
    <table v-if="keys.length">
      <thead>
        <tr>
          <th scope="col">Nøgle</th>
          <th scope="col">Handling</th>
        </tr>
      </thead>
      <tbody>
        <tr class="key" v-for="key in keys">
          <td><input type="text" :value="key" disabled /></td>
          <td>
            <a ref="#" @click.prevent="deleteKey(key)">Slet</a>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="!keys.length">Fandt ingen API nøgler</p>
    <p style="color: #c62828" v-if="error">{{ error }}</p>
    <a href="#" role="button" @click.prevent="createKey">Opret ny nøgle</a>
  </div>
</template>
