import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    children: [
      {
        path: "",
        name: "packages",
        meta: {
          title: "package",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/PackageListView.vue"
          ),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/MainLayout.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
