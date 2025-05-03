import { createRouter, createWebHistory } from 'vue-router';
import LoginUsers from '../components/LoginUsers.vue';
import HelloWorld from '../components/HelloWorld.vue';
import NewPage from '../components/NewPage.vue';
import RegisterUser from '../components/RegisterUser.vue';
import LandingPage from '../components/LandingPage.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginUsers },
  { path: '/hello', component: HelloWorld },
  { path: '/new-page', component: NewPage },
  { path: '/register', component: RegisterUser },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;