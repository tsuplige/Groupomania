import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/messages',
    name: 'Messages',
    // route level code-splitting
    // this generates a separate chunk (messages.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "messages" */ '../views/Message.vue')
  },
  {
    path: '/signup',
    name: 'Inscription',
    // route level code-splitting
    // this generates a separate chunk (messages.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "messages" */ '../views/Inscription.vue')
  },
  {
    path: '/comment/:id',
    name: 'Comment',
    // route level code-splitting
    // this generates a separate chunk (messages.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "messages" */ '../views/Comment.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
