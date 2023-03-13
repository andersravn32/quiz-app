import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../pages/index.vue"),
    },
    {
      path: "/signin",
      component: () => import("../pages/signin.vue"),
    },
    {
      path: "/signup",
      component: () => import("../pages/signup.vue"),
    },
    {
        path: "/dashboard",
        component: () => import("../pages/dashboard.vue"),
    },
    {
        path: "/leaderboard",
        component: () => import("../pages/leaderboard.vue"),
    },
    {
        path: "/profile",
        component: () => import("../pages/profile.vue"),
    },
    {
        path: "/quizzes",
        component: () => import("../pages/quizzes.vue"),
    },
  ],
});

export default router;
