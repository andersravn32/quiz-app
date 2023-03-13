<script setup>
import { ref } from "vue";

const emit = defineEmits(["close"]);

const category = ref({
  title: "",
  description: "",
  public: true,
});

const loading = ref(false);

const create = async () => {
  // Update loading state
  loading.value = true;

  // Request creation of new category from server
  const request = await fetch("http://127.0.0.1:3000/category", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(category.value),
  }).then((res) => res.json());

  // Update loading state
  loading.value = false;

  return emit("close");
};
</script>

<template>
  <header>
    <a
      href="#close"
      aria-label="Close"
      class="close"
      @click="emit('close')"
    ></a>
    Opret ny kategori
  </header>
  <form id="form-create-category" @submit.prevent="create">
    <label for="email">
      Titel på kategori
      <span v-if="category.title.length"
        >({{ 50 - category.title.length }} tegn tilbage.)</span
      >
      <input
        v-model="category.title"
        type="text"
        placeholder="Titel"
        required
      />
    </label>
    <label for="email"
      >Kategori beskrivelse
      <span v-if="category.description.length"
        >({{ 200 - category.description.length }} tegn tilbage.)</span
      ></label
    >
    <textarea
      v-model="category.description"
      type="email"
      placeholder="Beskrivelse"
      required
    ></textarea>
    <label>
      <input v-model="category.public" type="checkbox" role="switch" />
      Offentliggør kategori
    </label>
    <button :aria-busy="loading">
      {{ loading ? "Vent venligst" : "Opret kategori" }}
    </button>
  </form>
</template>

<style>
#form-create-category button {
  margin-top: 2rem;
}

#form-create-category textarea {
  resize: none;
  min-height: 125px;
}
</style>
