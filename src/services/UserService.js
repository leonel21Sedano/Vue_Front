import axios from 'axios';

const API_URL = '/api/usuarios/';

// Configurar el interceptor para incluir el token JWT en todas las peticiones
axios.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
      console.log("Token JWT:", user.token);  
      console.log("Rol del usuario:", user.rol);
      config.headers.Authorization = `Bearer ${user.token}`;
    } else {
      console.log("No hay token JWT disponible");
    }
    return config;
  },
  error => Promise.reject(error)
);

class UserService {
  /**
   * Obtiene todos los usuarios
   * @returns {Promise} Lista de usuarios
   */
  getAllUsers() {
    return axios.get(API_URL);
  }

  /**
   * Busca un usuario por su código de estudiante
   * @param {string} codigo Código del estudiante
   * @returns {Promise} Usuario encontrado
   */
  getUserByCode(codigo) {
    return axios.get(`${API_URL}codigo/${codigo}`);
  }

  /**
   * Crea un nuevo usuario
   * @param {Object} userData Datos del usuario
   * @returns {Promise} Usuario creado
   */
  createUser(userData) {
    return axios.post(API_URL, userData);
  }

  /**
   * Actualiza un usuario existente
   * @param {number} id ID del usuario
   * @param {Object} userData Datos actualizados
   * @returns {Promise} Usuario actualizado
   */
  updateUser(id, userData) {
    return axios.put(`${API_URL}${id}`, userData);
  }

  /**
   * Elimina un usuario
   * @param {number} id ID del usuario
   * @returns {Promise} Confirmación de eliminación
   */
  deleteUser(id) {
    return axios.delete(`${API_URL}${id}`);
  }
}

export default new UserService();