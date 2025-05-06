<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="heading">Login</p>
    
    <!-- Mensajes de estado -->
    <div v-if="errorMessage" class="message error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="message success-message">{{ successMessage }}</div>
    
    <input class="input" v-model="correo" placeholder="Correo electrónico" type="email" required :disabled="loading">
    <input class="input" v-model="contraseña" placeholder="Contraseña" type="password" required :disabled="loading"> 
    
    <button class="btn" type="submit" :disabled="loading">
      {{ loading ? 'Procesando...' : 'Iniciar Sesión' }}
    </button>
    
    <p class="register-link">¿No tienes cuenta? <a href="#" @click.prevent="goToRegister">Regístrate</a></p>
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

export default {
  name: 'LoginUsers',
  // Añadimos la definición de emits
  emits: ['login-success'],
  setup(props, { emit }) {
    const router = useRouter();
    
    // These variables store the login credentials entered by the user
    const correo = ref('');
    const contraseña = ref('');
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    
    const handleSubmit = async () => {
      loading.value = true;
      errorMessage.value = '';
      successMessage.value = '';
      
      try {
        // Mostramos los datos que estamos enviando
        console.log('Datos enviados:', { correo: correo.value, contraseña: contraseña.value });
        
        // This is where the credentials are passed to the authentication service
        const response = await AuthService.login(correo.value, contraseña.value);
        
        // Mostrar mensaje de éxito
        successMessage.value = '¡Inicio de sesión exitoso!';
        
        // Emitir evento al componente padre con la respuesta
        emit('login-success', response);
        
        // Redireccionar según el rol del usuario
        setTimeout(() => {
          if (response.rol === 'ADMIN') {
            router.push('/users');
          } else if (response.rol === 'ENCARGADO') {
            router.push('/post-food');
          } else {
            router.push('/live');
          }
        }, 1000);
        
      } catch (error) {
        console.error('Error durante el login:', error);
        console.error('Detalles del error:', error.response?.data);
        
        // Usar el mensaje personalizado del interceptor
        errorMessage.value = error.message;
      } finally {
        loading.value = false;
      }
    };
    
    const goToRegister = () => {
      router.push('/register');
    };
    
    return {
      correo,
      contraseña,
      loading,
      errorMessage,
      successMessage,
      handleSubmit,
      goToRegister
    };
  }
};
</script>

<style scoped>
/* Mantenemos todo el estilo original */
.form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    padding: 2.5em;
    border-radius: 25px;
    transition: .4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 2px;
    width: 300px;
    margin: 0 auto;
}

.form:hover {
    transform: translateX(-0.5em) translateY(-0.5em);
    border: 1px solid #171717;
    box-shadow: 10px 10px 0px #666666;
}

.heading {
    color: black;
    padding-bottom: 2em;
    text-align: center;
    font-weight: bold;
    font-size: 1.5em;
    margin: 0;
}

.input {
    border-radius: 5px;
    border: 1px solid whitesmoke;
    background-color: whitesmoke;
    outline: none;
    padding: 0.7em;
    transition: .4s ease-in-out;
}

.input:hover {
    box-shadow: 6px 6px 0px #969696,
               -3px -3px 10px #ffffff;
}

.input:focus {
    background: #ffffff;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
}

.form .btn {
    margin-top: 2em;
    align-self: center;
    padding: 0.7em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 10px;
    border: none;
    color: black;
    transition: .4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
    background-color: #f0f0f0;
    cursor: pointer;
}

.form .btn:hover {
    box-shadow: 6px 6px 0px #969696,
               -3px -3px 10px #ffffff;
    transform: translateX(-0.5em) translateY(-0.5em);
}

.form .btn:active {
    transition: .2s;
    transform: translateX(0em) translateY(0em);
    box-shadow: none;
}

.register-link {
    text-align: center;
    margin-top: 1em;
    font-size: 0.9em;
    color: #555;
}

.register-link a {
    color: #7c3aed;
    text-decoration: none;
    font-weight: bold;
}

.register-link a:hover {
    text-decoration: underline;
}

/* Estilos para los mensajes de error y éxito (similares a RegisterUser) */
.message {
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  text-align: center;
  font-size: 0.9em;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}
</style>