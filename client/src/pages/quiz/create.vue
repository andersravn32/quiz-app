<script setup>
import { onMounted, ref } from "vue";
import useAccount from "../../composables/useAccount";
import { useRouter } from "vue-router";

const router = useRouter();
const account = useAccount();

onMounted(() => {
  if (router.currentRoute.value.meta.auth && !account.value) {
    return router.push("/signin");
  }

  if (!(account.value.role == 1)) {
    return router.push("/dashboard");
  }
});

const error = ref(null);

const loading = ref(false);

const quiz = ref({
  title: "",
  category: "",
  questions: [],
  public: false,
});

const quizQuestion = ref("");

const categories = await fetch("http://127.0.0.1:3000/category", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("accessToken"),
  },
}).then((res) => res.json());

const create = async () => {
  // Update loading state
  loading.value = true;

  const request = await fetch("http://127.0.0.1:3000/quiz", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
    body: JSON.stringify(quiz.value),
  }).then((res) => res.json());

  // Update loading state
  loading.value = false;

  if (request.error) {
    return (error.value = request.error);
  }

  if (!request.data) {
    return;
  }

  return router.push("/dashboard");
};
</script>

<template>
  <section v-if="account" id="page-quiz-create" class="container">
    <hgroup>
      <h1>Opret ny quiz</h1>
      <h3>
        <small>Her kan du oprette en ny quiz</small>
      </h3>
    </hgroup>

    <form id="form-create-quiz" @submit.prevent="create">
      <div class="grid">
        <label for="title">
          Titel
          <input
            v-model="quiz.title"
            type="text"
            placeholder="Titel"
            required
          />
        </label>
        <div>
          <label for="category">Kategori</label>
          <select v-model="quiz.category">
            <option value="" disabled selected>Vælg venligst</option>
            <option v-for="category in categories" :value="category._id">
              {{ category.title }}
            </option>
          </select>
        </div>
      </div>
      <div>
        <label for="title">
          Spørgsmål
          <input
            v-model="quizQuestion"
            type="text"
            placeholder="Indtast spørgsmål"
          />
        </label>
        <button
          @click.prevent="
            quiz.questions.push({ question: quizQuestion, options: [] });
            quizQuestion = '';
          "
        >
          Tilføj spørgsmål
        </button>
      </div>
      <div v-if="quiz.questions.length" class="questions">
        <article v-for="(question, index) in quiz.questions" class="question">
          <header>
            {{ question.question }}
            <a
              href="#close"
              aria-label="Close"
              class="close"
              @click="quiz.questions.splice(index, 1)"
              >Slet</a
            >
          </header>
          <div class="options">
            <div v-for="option in question.options" class="option">
              <label for="title">
                Svarmulighed
                <input
                  v-model="option.option"
                  type="text"
                  placeholder="Indtast svarmulighed"
                  required
                />
              </label>
              <label>
                <input v-model="option.correct" type="checkbox" role="switch" />
                Marker som korrekt svar
              </label>
            </div>
          </div>
          <p style="color: #c62828" v-if="error">* {{ error }}</p>
          <button
            @click.prevent="
              question.options.push({ option: null, correct: false })
            "
          >
            Tilføj svarmulighed
          </button>
        </article>
      </div>
      <label
        style="margin-bottom: 1rem"
        v-if="quiz.title.length && quiz.category && quiz.questions.length"
      >
        <input v-model="quiz.public" type="checkbox" role="switch" />
        Offentliggør quiz
      </label>
      <button
        v-if="quiz.title.length && quiz.category && quiz.questions.length"
        :aria-busy="loading"
      >
        {{ loading ? "Vent venligst" : "Opret quiz" }}
      </button>
    </form>
  </section>
</template>

<style>
.questions {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
}

.question header {
  display: flex;
  justify-content: space-between;
}

.option {
  background-color: #11191f;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
