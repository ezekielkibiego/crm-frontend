import { createRouter, createWebHistory } from 'vue-router';
import CustomerList from '../components/CustomerList.vue';
import CustomerForm from '../components/CustomerForm.vue';
import LeadList from '../components/LeadList.vue';
import LeadForm from '../components/LeadForm.vue';
import InteractionForm from '../components/InteractionForm.vue';

const routes = [
  { path: '/', component: CustomerList },
  { path: '/customers/new', component: CustomerForm },
  { path: '/leads', component: LeadList },
  { path: '/leads/new', component: LeadForm },
  { path: '/interactions/new', component: InteractionForm },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
