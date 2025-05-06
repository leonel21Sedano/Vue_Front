<template>
  <div class="user-management">
    <h1 class="main-title">Administrar Usuarios</h1>
    
    <!-- Modo de visualización tabs -->
    <div class="view-mode-tabs">
      <div 
        class="tab" 
        :class="{ 'active': viewMode === 'search' }" 
        @click="viewMode = 'search'"
      >
        <span>Buscar Usuario</span>
      </div>
      <div 
        class="tab" 
        :class="{ 'active': viewMode === 'list' }" 
        @click="viewMode = 'list'"
      >
        <span>Ver Todos</span>
      </div>
    </div>
    
    <!-- Sección de búsqueda de usuario -->
    <div v-if="viewMode === 'search'">
      <!-- Buscador de usuarios por código con botón de búsqueda -->
      <div class="search-container">
        <div class="search-input-container">
          <BrutalistSearchBar
            v-model="searchQuery"
            placeholder="BUSCAR POR CÓDIGO"
            label=""
            @keyup.enter="searchUser"
          />
        </div>
        <div class="search-button" @click="searchUser">
          <div class="button-inner"><span>Buscar</span></div>
        </div>
      </div>
      
      <!-- Mensaje de estado de búsqueda -->
      <div v-if="loading" class="status-message">
        <p>Buscando usuario...</p>
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
      
      <!-- Tabla de resultados (solo se muestra después de buscar) -->
      <div v-if="showResults" class="user-results">
        <div v-if="filteredUsers.length === 0" class="no-results">
          <p>No se encontró ningún usuario con ese código. ¿Deseas crear uno nuevo?</p>
          <div class="add-button" @click="addNewUser">
            <div class="button-inner"><span>Agregar Usuario</span></div>
          </div>
        </div>
        
        <div v-else class="user-details">
          <h2 class="user-details-title">Detalles del Usuario</h2>
          
          <div class="user-form" v-if="editMode">
            <div class="form-group">
              <label>Nombre:</label>
              <input v-model="editUserData.nombre" class="text-input" />
            </div>
            
            <div class="form-group">
              <label>Apellidos:</label>
              <input v-model="editUserData.apellidos" class="text-input" />
            </div>
            
            <div class="form-group">
              <label>Correo:</label>
              <input v-model="editUserData.correo" class="text-input" type="email" />
            </div>
            
            <div class="form-group">
              <label>Código:</label>
              <input v-model="editUserData.codigoEstudiante" class="text-input" />
            </div>
            
            <div class="form-group">
              <label>Contraseña:</label>
              <input v-model="editUserData.contraseña" class="text-input" type="password" placeholder="Nueva contraseña" />
            </div>
            
            <div class="form-group">
              <label>Rol:</label>
              <select v-model="editUserData.rol" class="text-input">
                <option value="ESTUDIANTE">ESTUDIANTE</option>
                <option value="ADMIN">ADMIN</option>
                <option value="ENCARGADO">ENCARGADO</option>
              </select>
            </div>
            
            <div class="form-buttons">
              <div class="user-table-button save-button" @click="saveEdit()">
                <div class="button-inner"><span>Guardar</span></div>
              </div>
              <div class="user-table-button cancel-button" @click="cancelEdit">
                <div class="button-inner"><span>Cancelar</span></div>
              </div>
            </div>
          </div>
          
          <div v-else class="user-card">
            <div class="user-info">
              <p><strong>Nombre:</strong> {{ filteredUsers[0].nombre }} {{ filteredUsers[0].apellidos }}</p>
              <p><strong>Correo:</strong> {{ filteredUsers[0].correo }}</p>
              <p><strong>Código:</strong> {{ filteredUsers[0].codigoEstudiante }}</p>
              <p><strong>Rol:</strong> {{ filteredUsers[0].rol }}</p>
            </div>
            
            <div class="card-actions">
              <div class="user-table-button" @click="editUser(filteredUsers[0])">
                <div class="button-inner"><span>Editar</span></div>
              </div>
              <div class="user-table-button delete-button" @click="deleteUser(filteredUsers[0].id)">
                <div class="button-inner"><span>Eliminar</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Sección de lista de todos los usuarios -->
    <div v-if="viewMode === 'list'" class="user-list-section">
      <h2 class="section-title">Todos los Usuarios Registrados</h2>
      
      <div class="add-user-container">
        <div class="add-button" @click="addNewUser">
          <div class="button-inner"><span>Agregar Nuevo Usuario</span></div>
        </div>
      </div>
      
      <div v-if="loading" class="status-message">
        <p>Cargando usuarios...</p>
      </div>
      <div v-if="errorMessage" class="error-message">
        <p>{{ errorMessage }}</p>
      </div>
      
      <!-- Formulario de edición cuando se está editando un usuario -->
      <div v-if="editMode" class="user-form">
        <h3 class="form-title">{{ isNewUser ? 'Nuevo Usuario' : 'Editar Usuario' }}</h3>
        <div class="form-group">
          <label>Nombre:</label>
          <input v-model="editUserData.nombre" class="text-input" />
        </div>
        
        <div class="form-group">
          <label>Apellidos:</label>
          <input v-model="editUserData.apellidos" class="text-input" />
        </div>
        
        <div class="form-group">
          <label>Correo:</label>
          <input v-model="editUserData.correo" class="text-input" type="email" />
        </div>
        
        <div class="form-group">
          <label>Código:</label>
          <input v-model="editUserData.codigoEstudiante" class="text-input" />
        </div>
        
        <div class="form-group">
          <label>Contraseña:</label>
          <input v-model="editUserData.contraseña" class="text-input" type="password" placeholder="Nueva contraseña" />
        </div>
        
        <div class="form-group">
          <label>Rol:</label>
          <select v-model="editUserData.rol" class="text-input">
            <option value="ESTUDIANTE">ESTUDIANTE</option>
            <option value="ADMIN">ADMIN</option>
            <option value="ENCARGADO">ENCARGADO</option>
          </select>
        </div>
        
        <div class="form-buttons">
          <div class="user-table-button save-button" @click="saveEdit()">
            <div class="button-inner"><span>Guardar</span></div>
          </div>
          <div class="user-table-button cancel-button" @click="cancelEdit">
            <div class="button-inner"><span>Cancelar</span></div>
          </div>
        </div>
      </div>
      
      <!-- Tabla de usuarios -->
      <div v-else-if="users.length > 0" class="users-table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Código</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>{{ user.nombre }} {{ user.apellidos }}</td>
              <td>{{ user.correo }}</td>
              <td>{{ user.codigoEstudiante }}</td>
              <td>{{ user.rol }}</td>
              <td class="actions-cell">
                <div class="user-table-button" @click="editUser(user)">
                  <div class="button-inner"><span>Editar</span></div>
                </div>
                <div class="user-table-button delete-button" @click="deleteUser(user.id)">
                  <div class="button-inner"><span>Eliminar</span></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div v-else class="no-users-message">
        <p>No hay usuarios registrados en el sistema.</p>
      </div>
    </div>
  </div>
</template>

<script>
import BrutalistSearchBar from './subcomponents/BrutalistSearchBar.vue';
import axios from 'axios'; // Importamos axios para usarlo en lugar de fetch

export default {
  components: {
    BrutalistSearchBar,
  },
  data() {
    return {
      users: [],
      filteredUsers: [],
      searchQuery: '',
      editUserData: {
        nombre: '',
        apellidos: '',
        correo: '',
        codigoEstudiante: '',
        contraseña: '',
        rol: 'ESTUDIANTE',
        activo: true
      },
      isNewUser: false,
      editMode: false,
      showResults: false,
      loading: false,
      errorMessage: '',
      viewMode: 'list', // 'search' o 'list'
    };
  },
  methods: {
    // Método completamente rediseñado para cargar usuarios usando axios
    fetchAllUsers() {
      this.loading = true;
      this.errorMessage = '';
      this.users = []; // Reiniciamos la lista para evitar datos antiguos
      
      console.log('Intentando cargar usuarios usando axios...');
      
      // Usamos axios en lugar de fetch para mejor manejo de la respuesta
      axios.get('/api/usuarios', {
        baseURL: 'http://localhost:8081', // URL base explícita para asegurar que apunta al backend
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000 // Timeout de 10 segundos
      })
      .then(response => {
        console.log('Respuesta de axios:', response.status);
        console.log('Datos recibidos:', response.data);
        
        const data = response.data;
        
        if (Array.isArray(data) && data.length > 0) {
          // Si recibimos un array directamente
          this.users = data;
          console.log(`${this.users.length} usuarios cargados correctamente`);
        } else if (data && typeof data === 'object') {
          // Buscar cualquier array dentro del objeto respuesta
          let foundUsers = false;
          for (const key in data) {
            if (Array.isArray(data[key]) && data[key].length > 0) {
              this.users = data[key];
              foundUsers = true;
              console.log(`Encontrados ${this.users.length} usuarios en la propiedad ${key}`);
              break;
            }
          }
          
          if (!foundUsers) {
            // Si no hay arrays, intentamos convertir el objeto a un array si tiene propiedades correctas
            if (data.id) {
              this.users = [data]; // Es un solo usuario
              console.log('Convertido objeto único a array de usuarios');
            } else {
              console.warn('No se encontraron usuarios en la respuesta');
            }
          }
        } else {
          console.error('Formato de respuesta no reconocido');
        }
      })
      .catch(error => {
        console.error('Error al cargar usuarios con axios:', error);
        
        if (error.response) {
          // El servidor respondió con un código de estado fuera del rango 2xx
          console.error('Error de respuesta:', error.response.status, error.response.data);
          this.errorMessage = `Error del servidor: ${error.response.status} - ${error.response.data?.mensaje || 'Error desconocido'}`;
        } else if (error.request) {
          // La solicitud se realizó pero no se recibió respuesta
          console.error('Error de solicitud sin respuesta');
          this.errorMessage = 'No se pudo conectar con el servidor. Verifique que el backend esté en ejecución.';
        } else {
          // Algo ocurrió durante la configuración de la solicitud
          console.error('Error de configuración:', error.message);
          this.errorMessage = `Error de conexión: ${error.message}`;
        }
        
        // Intentamos con método alternativo después de un error
        setTimeout(() => this.fetchWithDirectURL(), 500);
      })
      .finally(() => {
        this.loading = false;
      });
    },
    
    // Método alternativo que intenta con URL directa (sin proxy)
    fetchWithDirectURL() {
      if (this.users.length > 0) return; // No intentar si ya tenemos usuarios
      
      console.log('Intentando método alternativo con URL directa');
      
      axios.get('http://localhost:8081/api/usuarios', {
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        console.log('Respuesta alternativa:', response.data);
        if (Array.isArray(response.data)) {
          this.users = response.data;
        }
      })
      .catch(error => {
        console.error('También falló el método alternativo:', error);
        
        // Último intento: crear usuarios de prueba para desarrollo
        if (process.env.NODE_ENV === 'development') {
          console.log('Creando usuarios de prueba para desarrollo');
          this.users = [
            { 
              id: 1, 
              nombre: 'Usuario', 
              apellidos: 'De Prueba', 
              correo: 'usuario@test.com',
              codigoEstudiante: '123456789',
              rol: 'ADMIN',
              activo: true
            },
            { 
              id: 2, 
              nombre: 'Estudiante', 
              apellidos: 'Ejemplo', 
              correo: 'estudiante@test.com',
              codigoEstudiante: '987654321',
              rol: 'ESTUDIANTE',
              activo: true
            }
          ];
        }
      });
    },
    
    searchUser() {
      // Trim the search query to remove extra spaces
      const query = this.searchQuery.trim();
      
      // Validate the search input is not empty
      if (!query) {
        this.errorMessage = 'Por favor, ingrese un código para buscar';
        return;
      }
      
      console.log('Buscando código:', query);
      this.loading = true;
      this.errorMessage = '';
      this.showResults = false;
      
      // Using axios to search for the user by code
      axios.get(`/api/usuarios/codigo/${query}`, {
        baseURL: 'http://localhost:8081',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 10000
      })
        .then(response => {
          // Check if we got a valid response
          const userData = response.data;
          console.log('Datos del usuario recibidos:', userData);
          
          if (userData) {
            // Store the user in the filteredUsers array and show results
            this.filteredUsers = [userData];
            this.showResults = true;
            console.log('Usuario encontrado:', userData);
          } else {
            // Handle case where response is empty but not an error
            this.filteredUsers = [];
            this.showResults = true;
            console.warn('Respuesta vacía pero sin error');
          }
        })
        .catch(error => {
          console.error('Error al buscar usuario:', error);
          
          // Handle 404 error (user not found)
          if (error.response && error.response.status === 404) {
            this.filteredUsers = [];
            this.showResults = true;
            return;
          }
          
          // Other errors
          if (error.response) {
            this.errorMessage = error.response.data?.mensaje || 'Error al buscar el usuario';
          } else if (error.request) {
            this.errorMessage = 'No se recibió respuesta del servidor';
          } else {
            this.errorMessage = error.message || 'Error al buscar el usuario';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    saveEdit() {
      if (!this.editUserData.nombre.trim() || !this.editUserData.apellidos.trim() || 
          !this.editUserData.correo.trim() || !this.editUserData.codigoEstudiante.trim()) {
        this.errorMessage = 'Por favor, complete todos los campos obligatorios';
        return;
      }
      
      this.loading = true;
      this.errorMessage = '';
      
      const method = this.isNewUser ? 'POST' : 'PUT';
      const url = this.isNewUser 
        ? '/api/usuarios/' 
        : `/api/usuarios/${this.editUserData.id}`;
      
      const userData = {
        nombre: this.editUserData.nombre,
        apellidos: this.editUserData.apellidos,
        correo: this.editUserData.correo,
        codigoEstudiante: this.editUserData.codigoEstudiante,
        rol: this.editUserData.rol,
        activo: true
      };
      
      if (this.editUserData.contraseña && this.editUserData.contraseña.trim()) {
        userData.contraseña = this.editUserData.contraseña;
      }
      
      // Usando axios en lugar de fetch
      axios({
        method: method,
        url: url,
        baseURL: 'http://localhost:8081',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        data: userData,
        timeout: 10000
      })
        .then(response => {
          console.log('Respuesta al guardar usuario:', response);
          // La respuesta ya viene como objeto JSON con axios
          const data = response.data;
          
          // Determinar qué datos usar según el tipo de operación
          const savedUser = this.isNewUser ? (data.usuario || data) : data;
          
          if (this.isNewUser) {
            this.users.push(savedUser);
            console.log('Usuario creado exitosamente:', savedUser);
          } else {
            const index = this.users.findIndex(u => u.id === savedUser.id);
            if (index !== -1) {
              this.users.splice(index, 1, savedUser);
              console.log('Usuario actualizado en lista principal');
            }
            
            if (this.showResults) {
              const filteredIndex = this.filteredUsers.findIndex(u => u.id === savedUser.id);
              if (filteredIndex !== -1) {
                this.filteredUsers.splice(filteredIndex, 1, savedUser);
                console.log('Usuario actualizado en resultados de búsqueda');
              }
            }
          }
          
          // Salir del modo edición
          this.editMode = false;
        })
        .catch(error => {
          console.error('Error al guardar usuario:', error);
          
          // Manejo detallado de errores
          if (error.response) {
            // El servidor respondió con un error
            const errorData = error.response.data;
            this.errorMessage = errorData.mensaje || errorData.error || 
                               `Error del servidor: ${error.response.status}`;
            console.error('Detalle del error:', errorData);
          } else if (error.request) {
            // No se recibió respuesta
            this.errorMessage = 'No se recibió respuesta del servidor';
          } else {
            // Error de configuración
            this.errorMessage = error.message || 'Error al guardar los cambios';
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    deleteUser(userId) {
      if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        this.loading = true;
        this.errorMessage = '';
        
        // También vamos a actualizar deleteUser para usar axios
        axios({
          method: 'DELETE',
          url: `/api/usuarios/${userId}`,
          baseURL: 'http://localhost:8081',
          headers: {
            'Accept': 'application/json'
          },
          timeout: 10000
        })
          .then(response => {
            console.log('Usuario eliminado con ID:', userId, response.data);
            
            const index = this.users.findIndex(u => u.id === userId);
            if (index !== -1) {
              this.users.splice(index, 1);
            }
            
            if (this.showResults) {
              const filteredIndex = this.filteredUsers.findIndex(u => u.id === userId);
              if (filteredIndex !== -1) {
                this.filteredUsers.splice(filteredIndex, 1);
              }
              
              if (this.filteredUsers.length === 0) {
                this.showResults = false;
              }
            }
          })
          .catch(error => {
            console.error('Error al eliminar usuario:', error);
            
            if (error.response) {
              this.errorMessage = error.response.data?.mensaje || 
                                'Error al eliminar el usuario';
            } else {
              this.errorMessage = error.message || 'Error al eliminar el usuario';
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    
    editUser(user) {
      this.isNewUser = false;
      this.editMode = true;
      this.editUserData = { 
        id: user.id,
        nombre: user.nombre,
        apellidos: user.apellidos,
        correo: user.correo,
        codigoEstudiante: user.codigoEstudiante,
        contraseña: '',
        rol: user.rol,
        activo: user.activo
      };
    },
    
    addNewUser() {
      this.isNewUser = true;
      this.editMode = true;
      this.editUserData = {
        nombre: '',
        apellidos: '',
        correo: '',
        codigoEstudiante: '',
        contraseña: '',
        rol: 'ESTUDIANTE',
        activo: true
      };
    },
    
    cancelEdit() {
      this.editMode = false;
      this.editUserData = {};
    }
  },
  mounted() {
    this.fetchAllUsers();
    
    // Segunda carga después de un tiempo (por si el backend tarda en iniciar)
    setTimeout(() => {
      if (this.users.length === 0) {
        console.log('Intentando cargar usuarios nuevamente después de un retraso...');
        this.fetchAllUsers();
      }
    }, 3000);
  }
};
</script>

<style scoped>
.user-management {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  margin: 20px auto 50px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

.main-title {
  color: #6a11cb;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 600;
  padding-top: 20px;
}

.view-mode-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  gap: 15px;
  width: 100%;
  max-width: 500px;
}

.tab {
  background-color: #f0f0f0;
  border: 4px solid black;
  padding: 10px 20px;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;
  width: 180px;
  font-weight: bold;
}

.tab.active {
  background-color: #6a11cb;
  color: white;
  border-bottom-width: 8px;
  transform: translateY(-4px);
}

.tab:hover {
  background-color: #e0e0e0;
}

.tab.active:hover {
  background-color: #5a0cb3;
}

.user-list-section {
  width: 100%;
}

.section-title {
  color: #6a11cb;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.users-table-container {
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
}

.users-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: 4px solid black;
}

.users-table th,
.users-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.users-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.users-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.users-table tr:hover {
  background-color: #e6e6e6;
}

.actions-cell {
  display: flex;
  gap: 10px;
  justify-content: flex-start;
}

.no-users-message {
  text-align: center;
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.add-user-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.form-title {
  color: #6a11cb;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
}

.search-container {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 30px;
  margin-top: 10px;
  width: 100%;
  gap: 15px;
}

.search-input-container {
  flex: 1;
  max-width: 400px;
}

.search-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 120px;
  text-align: center;
  margin-bottom: 5px;
}

.search-button:hover {
  transform: translateY(-2px);
}

.search-button:active {
  padding: 0;
  margin-bottom: 15px;
  transform: translateY(10px);
}

.status-message {
  background-color: #e0f7fa;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: #0277bd;
  font-weight: bold;
}

.error-message {
  background-color: #ffebee;
  padding: 10px 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  text-align: center;
  color: #c62828;
  font-weight: bold;
}

.user-results {
  width: 100%;
  margin-top: 30px;
}

.no-results {
  text-align: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.no-results p {
  margin-bottom: 20px;
  color: #555;
  font-size: 1.1em;
}

.user-details {
  width: 100%;
}

.user-details-title {
  color: #6a11cb;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.user-card {
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.user-info p {
  margin: 10px 0;
  font-size: 1.1em;
  color: #444;
}

.card-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 15px;
}

.user-form {
  background-color: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #444;
}

.text-input {
  width: 100%;
  padding: 12px 15px;
  border-radius: 8px;
  border: 2px solid #c0a2e4;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.text-input:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
}

.form-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 25px;
}

.add-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 180px;
  text-align: center;
  margin: 20px auto;
}

.add-button:hover {
  transform: translateY(-2px);
}

.add-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(10px);
}

.button-inner {
  background-color: #dddddd;
  border: 4px solid #fff;
  padding: 3px 8px;
}

.button-inner span {
  font-size: 1.2em;
  letter-spacing: 1px;
  font-family: Arial, sans-serif;
}

.user-table-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #a72896;
  padding-bottom: 5px;
  transition: 0.1s ease-in-out;
  user-select: none;
  display: inline-block;
  margin-right: 8px;
  text-align: center;
  width: 120px;
}

.user-table-button.save-button {
  background-color: #4CAF50;
}

.user-table-button.delete-button {
  background-color: #f44336;
}

.user-table-button:hover {
  transform: translateY(-2px);
}

.user-table-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(5px);
}

.user-table-button .button-inner {
  background-color: #dddddd;
  border: 2px solid #fff;
  padding: 6px 10px;
}

.user-table-button .button-inner span {
  font-size: 0.9rem;
  color: #000;
  font-weight: bold;
}

@media (max-width: 600px) {
  .search-container {
    flex-direction: column;
    align-items: center;
  }
  
  .search-input-container {
    width: 100%;
    max-width: 100%;
  }
  
  .search-button {
    width: 150px;
    margin-top: 15px;
  }
  
  .view-mode-tabs {
    flex-direction: column;
    align-items: center;
  }
  
  .tab {
    width: 100%;
  }
  
  .actions-cell {
    flex-direction: column;
  }
}
</style>