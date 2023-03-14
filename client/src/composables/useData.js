import { ref } from "vue";

const quizzes = ref([]);
const categories = ref([]);
const answers = ref([]);
const requestRefresh = ref(false);

const refresh = async () => {
  // Update quizzes
  quizzes.value = await fetch("http://127.0.0.1:3000/quiz", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => res.json());

  // Update categories
  categories.value = await fetch("http://127.0.0.1:3000/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => res.json());

  // Update answers
  answers.value = await fetch("http://127.0.0.1:3000/answer", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("accessToken"),
    },
  }).then((res) => res.json());

  // Update requestRefresh
  requestRefresh.value = false;
};

export default () => {
  return { quizzes, categories, answers, requestRefresh, refresh };
};
