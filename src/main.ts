import App from "./App.vue";
import { createApp } from "vue";
import { router } from "@/router";
import { pinia, vuetify, i18n } from "@/plugins";
import "./styles/main.scss";

createApp(App).use(pinia).use(router).use(vuetify).use(i18n).mount("#app");
