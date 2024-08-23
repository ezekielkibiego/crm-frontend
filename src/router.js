// src/router.js
import { createRouter, createWebHistory } from 'vue-router';
import Customers from './views/Customers.vue';
import Leads from './views/Leads.vue';
import Interactions from './views/Interactions.vue';

const routes = [
  { path: '', component: Customers },
  { path: '/leads', component: Leads},
  { path: '/interactions', component: Interactions},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
