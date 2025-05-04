<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="heading">Registro</p>
    
    <!-- Mensajes de estado -->
    <div v-if="errorMessage" class="message error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="message success-message">{{ successMessage }}</div>
    
    <input class="input" v-model="nombre" placeholder="Nombre" type="text" required :disabled="loading">
    <input class="input" v-model="apellidos" placeholder="Apellidos" type="text" required :disabled="loading">
    <input class="input" v-model="correo" placeholder="Correo" type="email" required :disabled="loading">
    <input class="input" v-model="contraseña" placeholder="Contraseña" type="password" required :disabled="loading" minlength="6">
    <input class="input" v-model="codigoEstudiante" placeholder="Código Estudiante" type="text" required :disabled="loading" pattern="[0-9]{9}">
    
    <button class="btn" type="submit" :disabled="loading">
      {{ loading ? 'Procesando...' : 'Registrar' }}
    </button>
  </form>
</template>
  
<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import AuthService from '../services/AuthService';

export default {
  name: 'RegisterUser',
  setup() {
    const router = useRouter();
    
    // Mantener las variables reactivas con los mismos nombres
    const nombre = ref('');
    const apellidos = ref('');
    const correo = ref('');
    const contraseña = ref('');
    const codigoEstudiante = ref('');
    
    // Variables para estados de UI
    const loading = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');

    const handleSubmit = async () => {
      loading.value = true;
      errorMessage.value = '';
      successMessage.value = '';
      
      try {
        const userData = {
          nombre: nombre.value,
          apellidos: apellidos.value,
          correo: correo.value,
          contraseña: contraseña.value,
          codigoEstudiante: codigoEstudiante.value
        };
        
        // Debug - muestra lo que estamos enviando al servidor
        console.log('Enviando datos:', JSON.stringify(userData));
        
        // Llamar al servicio de registro
        await AuthService.registro(userData);
        
        // Mostrar mensaje de éxito
        successMessage.value = '¡Registro exitoso! Redirigiendo al login...';
        
        // Redireccionar al login después de un breve delay
        setTimeout(() => {
          router.push('/login');
        }, 2000);
        
      } catch (error) {
        console.error('Error durante el registro:', error);
        
        // Siempre usamos el mensaje personalizado del interceptor
        errorMessage.value = error.message;
        
        // Pero aún así registramos detalles completos para depuración
        if (error.response) {
          console.error('Estado:', error.response.status);
          console.error('Datos:', error.response.data);
        }
      } finally {
        loading.value = false;
      }
    };

    return {
      nombre,
      apellidos,
      correo,
      contraseña,
      codigoEstudiante,
      loading,
      errorMessage,
      successMessage,
      handleSubmit
    };
  }
};
</script>
  
<style scoped>
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
