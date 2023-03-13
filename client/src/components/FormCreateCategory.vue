<script setup>
import { ref } from "vue";

const emit = defineEmits(["close"]);

const category = ref({
  title: null,
  description: null,
  public: true,
});

const loading = ref(false);

const create = async () => {
    // Update loading state
    loading.value = true;

    

    // Update loading state
    loading.value = false;
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
      <input
        v-model="category.title"
        type="text"
        placeholder="Titel"
        required
      />
    </label>
    <label for="email">Kategori beskrivelse</label>
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
