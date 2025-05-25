import { createRouter, createWebHistory } from "vue-router";
import AppMenu from "./components/AppMenu.vue";
import HomeUser from "./components/HomeUser.vue";
import HomeGerente from "./components/HomeGerente.vue";
import ErrorNotFound from "./components/ErrorNotFound.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: AppMenu,
    },
    {
      path: "/user",
      component: HomeUser,
    },
    {
      path: "/gerente",
      component: HomeGerente,
    },
    {
      path: "/:catchAll(.*)",
      component: ErrorNotFound,
    },
  ],
});

export default router;
