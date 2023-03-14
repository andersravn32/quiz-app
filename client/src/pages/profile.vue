<script setup>
import FormProfileEdit from "../components/FormProfileEdit.vue";
import useAccount from "../composables/useAccount";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import useData from "../composables/useData";

const router = useRouter();
const account = useAccount();
const data = useData();

data.answers.value.forEach((answer, index) => {
  // Match quiz to answer
  const quiz = data.quizzes.value.filter((quiz) => {
    return quiz._id == answer.quiz;
  })[0];

  // Get amount of correct answers
  let correct = 0;
  answer.answers.forEach((ans, index) => {
    if (quiz.questions[index].options[ans.answer].correct) {
      correct++;
    }
  });

  // Set new correct percentage value on individual answers in composable
  data.answers.value[index].correctPerc = Math.round(
    (correct / quiz.questions.length) * 100
  );
});

onMounted(async () => {
  if (router.currentRoute.value.meta.auth && !account.value) {
    return router.push("/signin");
  }

  if (data.requestRefresh.value) {
    await data.refresh();
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
      <h2>Statistik</h2>
      <h3>
        <small
          >Her kan du se generel statistik vedrørende de forskellige quizzes du
          har gennemført</small
        >
      </h3>
    </hgroup>
    <table v-if="data.answers.value.length" role="grid">
      <thead>
        <tr>
          <th scope="col">Quiz ID</th>
          <th scope="col">Quiz Titel</th>
          <th scope="col">Kategori</th>
          <th scope="col">Dato</th>
          <th scope="col">Rigtige</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="answer in data.answers.value">
          <th scope="row">{{ answer.quiz }}</th>
          <td>
            {{
              data.quizzes.value.filter((quiz) => {
                return quiz._id == answer.quiz;
              })[0].title
            }}
          </td>
          <td>
            {{
              data.categories.value.filter((category) => {
                return (
                  category._id ==
                  data.quizzes.value.filter((quiz) => {
                    return quiz._id == answer.quiz;
                  })[0].category
                );
              })[0].title
            }}
          </td>
          <td>{{ new Date(answer.created).toISOString().split("T")[0] }}</td>
          <td>{{ answer.correctPerc }} %</td>
        </tr>
      </tbody>
    </table>
    <p v-if="!data.answers.value.length">Fandt ingen besvarelser...</p>
    <hgroup>
      <h2>API info</h2>
      <h3>
        <small>Her finder du information vedrørende dine API nøgler</small>
      </h3>
    </hgroup>
  </section>
</template>
