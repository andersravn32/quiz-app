<script setup>
import { onMounted, ref } from "vue";
import useAccount from "../../composables/useAccount";
import useData from "../../composables/useData";
import { useRouter } from "vue-router";

const router = useRouter();
const account = useAccount();
const data = useData();

// Update data in composable
if (!data.quizzes.value.length|| !data.categories.value.length){
    await data.refresh();
}

// Set current quiz
const quiz = data.quizzes.value.filter((quiz) => {
  return quiz._id == router.currentRoute.value.params.id;
})[0];

// Define answer object
const answer = ref({
  quiz: quiz._id,
  answers: [],
});

// Set answer structure
quiz.questions.forEach(() => {
  answer.value.answers.push({ answer: null });
});

// Set current question
const currentQuestion = ref(-1);

const next = () => {
  if (currentQuestion.value == quiz.questions.length) {
    return;
  }
  return currentQuestion.value++;
};

const previous = () => {
  if (currentQuestion.value == 0) {
    return;
  }

  return currentQuestion.value--;
};

const save = async () => {
  console.log(answer.value);
};

onMounted(() => {
  if (router.currentRoute.value.meta.auth && !account.value) {
    return router.push("/signin");
  }
});
</script>

<template>
  <section class="container" id="page-quiz">
    <div class="start" v-if="currentQuestion < 0">
      <hgroup>
        <h1>{{ quiz.title }}</h1>
        <h3>
          <small
            >Ved at trykke på nedenstående knap vil du påbegynde din valgte
            quiz.</small
          ><br />
          <small
            >Bemærk: Dine svar gemmes først når du har afsluttet quizzen.</small
          >
        </h3>
      </hgroup>
      <button @click="next()">Start quiz</button>
    </div>

    <div
      v-if="currentQuestion >= 0"
      v-for="(question, questionIndex) in quiz.questions"
      :key="questionIndex"
    >
      <article class="question" v-if="currentQuestion == questionIndex">
        <header>
          {{ question.question }}
        </header>
        <div class="body">
          <button
            v-for="(option, optionIndex) in question.options"
            :key="optionIndex"
            :class="{
              outline: answer.answers[questionIndex].answer == optionIndex,
            }"
            @click="answer.answers[questionIndex].answer = optionIndex"
          >
            {{ option.option }}
          </button>
        </div>
        <footer>
          <div class="grid">
            <button v-if="currentQuestion > 0" @click="previous()">
              Forrige spørgsmål
            </button>
            <button
              v-if="currentQuestion < quiz.questions.length"
              @click="next()"
            >
              Næste spørgsmål
            </button>
          </div>
          <progress
            :value="questionIndex"
            :max="quiz.questions.length"
          ></progress>
        </footer>
      </article>
    </div>
    <div class="start" v-if="currentQuestion == quiz.questions.length">
      <hgroup>
        <h1>Du er nu færdig</h1>
        <h3>
          <small>Tillykke, du har nu gennemført quizzen</small><br />
          <small>Gem dit resultat ved at trykke på nedenstående knap</small>
        </h3>
      </hgroup>
      <button @click="save">Afslut quiz</button>
    </div>
  </section>
</template>

<style>
.start {
  padding: 6rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
</style>
