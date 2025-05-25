import { createApp } from "vue";
import AppMenu from "./components/AppMenu.vue";
import { router } from "./routes";

const app = createApp(AppMenu).use(router);
app.mount("#app");
