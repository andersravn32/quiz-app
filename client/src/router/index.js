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
      meta: {
        auth: true,
      },
    },
    {
      path: "/profile",
      component: () => import("../pages/profile.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/quiz/create",
      component: () => import("../pages/quiz/create.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/quiz/:id",
      component: () => import("../pages/quiz/index.vue"),
      meta: {
        auth: true,
      },
    },
  ],
});

export default router;
