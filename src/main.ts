import App from "./App.vue";
import { createApp } from "vue";
import { worker } from "@/mocks/browser";
import { router } from "@/router";
import { pinia, vuetify, i18n } from "@/plugins";
import "./styles/main.scss";

if (process.env.NODE_ENV === "development") {
  worker.start();
}
createApp(App).use(pinia).use(router).use(vuetify).use(i18n).mount("#app");
