import { createRouter, createWebHistory } from 'vue-router';
import LoginUsers from '../components/LoginUsers.vue';
import LiveVoting from '../components/LiveVoting.vue'; // Actualiza la ruta al nuevo nombre del archivo
import RegisterUser from '../components/RegisterUser.vue';
import LandingPage from '../components/LandingPage.vue';
import UserManagement from '../components/UserManagement.vue';
import PostFood from '../components/PostFood.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginUsers },
  { path: '/live', component: LiveVoting }, // Usamos el nuevo nombre de componente
  { path: '/post-food', component: PostFood },
  { path: '/register', component: RegisterUser },
  { path: '/users', component: UserManagement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;