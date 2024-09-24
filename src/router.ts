import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './views/HomePage.vue';
import CountryPage from './views/CountryPage.vue';

const routes = [
  { path: '/', name: 'Home', component: HomePage },
  { path: '/country/:code/:year?', name: 'Country', component: CountryPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
