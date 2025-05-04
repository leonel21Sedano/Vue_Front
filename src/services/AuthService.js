import axios from 'axios';
// Al inicio del archivo, después de importar axios
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// Mantén el resto del interceptor como está
/* eslint-disable */

// Configuración base para todas las peticiones
const API_URL = '/api/auth/';

// Configura los interceptores para todas las peticiones
axios.interceptors.request.use(
  config => {
    config.headers = {
      ...config.headers,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para personalizar mensajes de error
axios.interceptors.response.use(
  response => response,
  error => {
    // Personalización de mensajes de error
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      // Manejo específico para errores de validación (400 Bad Request)
      if (status === 400) {
        // Para errores de validación de Spring Boot
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          // Capturar mensajes personalizados de validación
          const messages = [];
          
          // Buscar mensajes de error en diferentes formatos
          if (data.errors) {
            // Formato de errores anidados
            Object.values(data.errors).forEach(err => {
              if (typeof err === 'string') {
                messages.push(err);
              } else if (err.defaultMessage) {
                messages.push(err.defaultMessage);
              }
            });
          } else {
            // Formato de errores planos
            Object.entries(data).forEach(([_, message]) => {
              if (typeof message === 'string') {
                messages.push(message);
              }
            });
          }
          
          if (messages.length > 0) {
            error.message = messages.join('. ');
            return Promise.reject(error);
          }
        } else if (typeof data === 'string') {
          // Si el error viene como string directo
          error.message = data;
          return Promise.reject(error);
        }
      }
      
      // Personaliza mensajes según el código de estado HTTP
      switch (status) {
        case 400:
          error.message = "Datos inválidos. Por favor verifica la información ingresada.";
          break;
        case 401:
          error.message = "No estás autorizado. Por favor inicia sesión nuevamente.";
          break;
        case 403:
          error.message = "No tienes permisos para realizar esta acción.";
          break;
        case 404:
          error.message = "El recurso solicitado no se encontró.";
          break;
        case 409:
          error.message = "Este usuario o correo electrónico ya está registrado.";
          break;
        case 422:
          error.message = "Datos inválidos. Por favor verifica los campos del formulario.";
          break;
        case 500:
          error.message = "Error interno del servidor. Por favor intenta más tarde.";
          break;
        default:
          error.message = "Ocurrió un error inesperado. Por favor intenta nuevamente.";
      }
      
      // Prioridad para mensajes específicos del backend
      if (error.response.data) {
        if (typeof error.response.data === 'string') {
          error.message = error.response.data;
        } else if (error.response.data.mensaje) {
          error.message = error.response.data.mensaje;
        } else if (error.response.data.message) {
          error.message = error.response.data.message;
        }
      }
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      error.message = "No se pudo conectar con el servidor. Verifica tu conexión a internet.";
    } else {
      // Error en la configuración de la solicitud
      error.message = "Error al procesar la solicitud. Por favor intenta nuevamente.";
    }
    
    return Promise.reject(error);
  }
);

class AuthService {
  /**
   * Registra un nuevo estudiante
   * @param {Object} userData Datos del estudiante
   * @returns {Promise} Promesa con la respuesta del servidor
   */
  registro(userData) {
    return axios.post(API_URL + 'registro/estudiante', userData);
  }

  /**
   * Inicia sesión con las credenciales proporcionadas
   * @param {string} correo Correo del usuario
   * @param {string} contraseña Contraseña del usuario
   * @returns {Promise} Promesa con la respuesta del servidor
   */
  login(correo, contraseña) {
    return axios.post(API_URL + 'login', {
      correo,
      contraseña
    }).then(response => {
      // Si hay un token en la respuesta, guarda el usuario en localStorage
      if (response.data.token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
  }

  /**
   * Cierra la sesión del usuario
   */
  logout() {
    localStorage.removeItem('user');
  }

  /**
   * Obtiene el usuario actual desde localStorage
   * @returns {Object|null} Datos del usuario o null si no hay ninguno
   */
  getCurrentUser() {
    const userJson = localStorage.getItem('user');
    return userJson ? JSON.parse(userJson) : null;
  }
}

export default new AuthService();