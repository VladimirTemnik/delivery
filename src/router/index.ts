import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "requests",
  },
  {
    path: "/requests",
    children: [
      {
        path: "",
        name: "requests",
        meta: {
          title: "requests",
          main: true,
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/AllRequestsView.vue"
          ),
      },
    ],
  },
  {
    path: "/:id?",
    children: [
      {
        path: "",
        redirect: (to) => {
          return { path: `/${to.params.id}/requests` };
        },
      },
      {
        path: "requests",
        name: "user-requests",
        meta: {
          title: "requests",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/UserRequestsView.vue"
          ),
      },
      {
        path: "create",
        name: "create",
        meta: {
          title: "create",
          protected: false,
        },
        children: [
          {
            path: "order",
            name: "order",
            meta: {
              title: "order",
              protected: false,
            },
            component: () =>
              import(/* webpackChunkName: "about" */ "../views/OrderView.vue"),
          },
          {
            path: "delivery",
            name: "delivery",
            meta: {
              title: "delivery",
              protected: false,
            },
            component: () =>
              import(
                /* webpackChunkName: "about" */ "../views/DeliveryView.vue"
              ),
          },
        ],
        component: () =>
          import(/* webpackChunkName: "about" */ "../views/CreateView.vue"),
      },
    ],
    component: () =>
      import(/* webpackChunkName: "about" */ "../layouts/MainLayout.vue"),
  },
  {
    path: "/requests",
    children: [
      {
        path: "/requests",
        name: "Requests",
        meta: {
          title: "Requests",
          protected: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "about" */ "../views/AllRequestsView.vue"
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
