import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

// Configuración para evitar problemas de CORS con axios
axios.defaults.withCredentials = false;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// Configurar axios para incluir el token de autenticación en cada petición
axios.interceptors.request.use(
  (config) => {
    // Obtener el token del localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    
    // Solo añadir el token si existe
    if (user && user.token) {
      // Usar el formato correcto de Bearer token
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

createApp(App).use(router).mount('#app');
