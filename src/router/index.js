import { createRouter, createWebHistory } from 'vue-router';
import LoginUsers from '../components/LoginUsers.vue';
import LiveVoting from '../components/LiveVoting.vue'; // Actualiza la ruta al nuevo nombre del archivo
import NewPage from '../components/NewPage.vue';
import RegisterUser from '../components/RegisterUser.vue';
import LandingPage from '../components/LandingPage.vue';
import UserManagement from '../components/UserManagement.vue';

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginUsers },
  { path: '/live', component: LiveVoting }, // Usamos el nuevo nombre de componente
  { path: '/new-page', component: NewPage },
  { path: '/register', component: RegisterUser },
  { path: '/users', component: UserManagement },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;