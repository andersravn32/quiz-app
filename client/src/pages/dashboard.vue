<script setup>
import { onMounted, ref } from "vue";
import useAccount from "../composables/useAccount";
import { useRouter } from "vue-router";
import useData from "../composables/useData";

const router = useRouter();
const account = useAccount();
const data = useData();

// Update data in composable
if (!data.quizzes.value.length || !data.categories.value.length) {
  await data.refresh();
}

data.quizzes.value.forEach(async (quiz, index) => {
  if (quiz.creatorFull){
    return;
  }
  
  const creatorFull = await fetch(
    `http://127.0.0.1:3000/profile/${quiz.creator}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  ).then((res) => res.json());

  data.quizzes.value[index].creatorFull = creatorFull.data;
});

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
    <div class="quizzes">
      <article
        v-for="(quiz, index) in data.quizzes.value"
        :key="index"
        class="quiz"
      >
        <header>{{ quiz.title }}</header>
        <div class="body">
          <p>
            Kategori:
            <span
              :data-tooltip="
                data.categories.value.filter((cat) => {
                  return cat._id == quiz.category;
                })[0].description
              "
              >{{
                data.categories.value.filter((cat) => {
                  return cat._id == quiz.category;
                })[0].title
              }}</span
            >
          </p>
          <p>Antal spørgsmål: {{ quiz.questions.length }}</p>
        </div>
        <button @click="router.push(`/quiz/${quiz._id}`)">Start quiz</button>
        <footer>
          <small>Oprettet af: </small>
          <div v-if="quiz.creatorFull" class="user">
            <span
              >{{ quiz.creatorFull.firstName }}
              {{ quiz.creatorFull.lastName }}</span
            >
            <span>@{{ quiz.creatorFull.identifier }}</span>
          </div>
        </footer>
      </article>
    </div>
  </section>
</template>

<style>
.quizzes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.quiz .body {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.quiz footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.user span:nth-of-type(1) {
  font-size: 0.875em;
}

.user span:nth-of-type(2) {
  opacity: 50%;
  font-size: 0.75em;
}
</style>
