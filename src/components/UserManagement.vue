<template>
  <div class="user-management">
    <h1 class="main-title">Administrar Usuarios</h1>
    
    <!-- Buscador de usuarios por código -->
    <div class="search-container">
      <BrutalistSearchBar
        v-model="searchQuery"
        placeholder="BUSCAR POR CÓDIGO"
        label="Edicion de Usuarios"
      />
      <div class="search-button" @click="searchUser">
        <div class="button-inner"><span>Buscar</span></div>
      </div>
    </div>
    
    <!-- Mensaje de error o loading -->
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="loading" class="loading-message">Cargando...</div>
    
    <!-- Botón de agregar usuario (siempre visible) -->
    <div class="add-button-container">
      <div class="add-button" @click="addUser">
        <div class="button-inner"><span>Agregar Usuario</span></div>
      </div>
    </div>
    
    <!-- Solo mostrar la tabla si hay resultados -->
    <div v-if="showResults">
      <table class="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Código</th>
            <th>Rol</th>
            <th>Contraseña</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(user, index) in filteredUsers" :key="user.id">
            <!-- Nombre -->
            <td v-if="editIndex !== index">{{ user.nombre }}</td>
            <td v-else>
              <input v-model="editUser.nombre" placeholder="Nombre" />
            </td>
            
            <!-- Apellidos -->
            <td v-if="editIndex !== index">{{ user.apellidos }}</td>
            <td v-else>
              
              <input v-model="editUser.apellidos" placeholder="Apellidos" />
            </td>
            
            <!-- Correo -->
            <td v-if="editIndex !== index">{{ user.correo }}</td>
            <td v-else>
              <input v-model="editUser.correo" type="email" placeholder="Correo" />
            </td>
            
            <!-- Código -->
            <td v-if="editIndex !== index">{{ user.codigoEstudiante }}</td>
            <td v-else>
              <input v-model="editUser.codigoEstudiante" placeholder="Código" />
            </td>
            
            <!-- Rol -->
            <td v-if="editIndex !== index">{{ user.rol }}</td>
            <td v-else>
              <select v-model="editUser.rol">
                <option value="ESTUDIANTE">Estudiante</option>
                <option value="ENCARGADO">Encargado</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </td>
            
            <!-- Contraseña (solo mostrar al crear usuario) -->
            <td v-if="editIndex === index && !filteredUsers[index].id">
              <input v-model="editUser.contraseña" type="password" placeholder="Contraseña" />
            </td>
            <td v-else-if="editIndex === index">
              <input v-model="editUser.contraseña" type="password" placeholder="Nueva contraseña (opcional)" />
            </td>
            <td v-else>
              <span class="password-placeholder">••••••••</span>
            </td>
            
            <!-- Acciones -->
            <td>
              <div v-if="editIndex !== index" class="user-table-button" @click="startEdit(index)">
                <div class="button-inner"><span>Editar</span></div>
              </div>
              <div v-else class="user-table-button" @click="saveEdit(index)">
                <div class="button-inner"><span>Guardar</span></div>
              </div>
              <div class="user-table-button delete-button" @click="deleteUser(index)">
                <div class="button-inner"><span>Eliminar</span></div>
              </div>
              <div v-if="editIndex === index" class="user-table-button cancel-button" @click="cancelEdit">
                <div class="button-inner"><span>Cancelar</span></div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Instrucciones cuando no hay búsqueda o resultados -->
    <div v-else class="no-results">
      <p>Ingresa el código de un usuario para buscarlo</p>
      <p class="example-text">Ejemplo: A12345</p>
    </div>
  </div>
</template>

<script>
import BrutalistSearchBar from './subcomponents/BrutalistSearchBar.vue';
import UserService from '../services/UserService.js';

export default {
  name: 'UserManagement',
  components: {
    BrutalistSearchBar
  },
  data() {
    return {
      filteredUsers: [], // Usuarios encontrados en la búsqueda
      editIndex: null,
      editUser: {
        nombre: '',
        apellidos: '',
        correo: '',
        codigoEstudiante: '',
        contraseña: '',
        rol: 'ESTUDIANTE',
        activo: true
      },
      searchQuery: '',
      showResults: false,
      errorMessage: '',
      loading: false
    };
  },
  methods: {
    async searchUser() {
      this.errorMessage = '';
      
      if (!this.searchQuery.trim()) {
        this.errorMessage = 'Por favor ingresa un código para buscar';
        this.showResults = false;
        return;
      }
      
      this.loading = true;
      
      try {
        const response = await UserService.getUserByCode(this.searchQuery);
        // Si la respuesta es exitosa, mostramos el usuario
        if (response.data) {
          this.filteredUsers = [response.data];
          this.showResults = true;
        }
      } catch (error) {
        console.error('Error al buscar usuario:', error);
        this.errorMessage = error.message || `No se encontró ningún usuario con el código "${this.searchQuery}"`;
        this.filteredUsers = [];
        this.showResults = false;
      } finally {
        this.loading = false;
      }
    },
    
    addUser() {
      const newUser = { 
        id: null, 
        nombre: '', 
        apellidos: '', 
        correo: '', 
        codigoEstudiante: '', 
        contraseña: '',
        rol: 'ESTUDIANTE',
        activo: true
      };
      
      // Añadir a los resultados actuales y comenzar edición
      this.filteredUsers = [newUser];
      this.showResults = true;
      this.editIndex = 0; // Editar el primer elemento (el único en este caso)
      this.editUser = { ...newUser };
    },
    
    startEdit(index) {
      this.editIndex = index;
      this.editUser = { ...this.filteredUsers[index] };
      // Asegurarse de eliminar la contraseña para no sobreescribirla accidentalmente
      this.editUser.contraseña = '';
    },
    
    async saveEdit(index) {
      if (!this.validateUserForm(this.filteredUsers[index].id !== null)) {
        return;
      }
      
      this.loading = true;
      this.errorMessage = '';
      
      try {
        let response;
        
        // Si el usuario tiene ID, es una actualización
        if (this.filteredUsers[index].id) {
          response = await UserService.updateUser(
            this.filteredUsers[index].id, 
            this.editUser
          );
          
          // Actualizar en la lista local
          this.filteredUsers.splice(index, 1, response.data);
        } 
        // Si no tiene ID, es un nuevo usuario
        else {
          response = await UserService.createUser(this.editUser);
          
          // Reemplazar el usuario temporal con el recién creado
          this.filteredUsers.splice(index, 1, response.data);
        }
        
        this.editIndex = null;
        this.editUser = {
          nombre: '',
          apellidos: '',
          correo: '',
          codigoEstudiante: '',
          contraseña: '',
          rol: 'ESTUDIANTE',
          activo: true
        };
      } catch (error) {
        console.error('Error al guardar usuario:', error);
        this.errorMessage = error.message || 'Error al guardar los cambios';
      } finally {
        this.loading = false;
      }
    },
    
    validateUserForm(isEdit) {
      if (!this.editUser.nombre.trim()) {
        this.errorMessage = 'El nombre es obligatorio';
        return false;
      }
      if (!this.editUser.apellidos.trim()) {
        this.errorMessage = 'Los apellidos son obligatorios';
        return false;
      }
      if (!this.editUser.correo.trim()) {
        this.errorMessage = 'El correo es obligatorio';
        return false;
      }
      if (!this.editUser.codigoEstudiante.trim()) {
        this.errorMessage = 'El código de estudiante es obligatorio';
        return false;
      }
      if (!isEdit && !this.editUser.contraseña.trim()) {
        this.errorMessage = 'La contraseña es obligatoria para nuevos usuarios';
        return false;
      }
      return true;
    },
    
    cancelEdit() {
      this.editIndex = null;
      this.editUser = {
        nombre: '',
        apellidos: '',
        correo: '',
        codigoEstudiante: '',
        contraseña: '',
        rol: 'ESTUDIANTE',
        activo: true
      };
    },
    
    async deleteUser(index) {
      if (!confirm('¿Está seguro de que desea eliminar este usuario?')) {
        return;
      }
      
      const userId = this.filteredUsers[index].id;
      
      // Si el usuario no tiene ID (es un nuevo usuario que no se ha guardado), simplemente lo eliminamos de la lista
      if (!userId) {
        this.filteredUsers.splice(index, 1);
        
        if (this.filteredUsers.length === 0) {
          this.showResults = false;
        }
        
        return;
      }
      
      this.loading = true;
      this.errorMessage = '';
      
      try {
        await UserService.deleteUser(userId);
        
        // Eliminar de la lista local
        this.filteredUsers.splice(index, 1);
        
        // Si no quedan resultados, ocultar la tabla
        if (this.filteredUsers.length === 0) {
          this.showResults = false;
        }
      } catch (error) {
        console.error('Error al eliminar usuario:', error);
        this.errorMessage = error.message || 'Error al eliminar el usuario';
      } finally {
        this.loading = false;
      }
      
      // Si estábamos editando este usuario, cancelar la edición
      if (this.editIndex === index) {
        this.cancelEdit();
      } else if (this.editIndex > index) {
        // Ajustar el índice de edición si eliminamos un elemento anterior
        this.editIndex--;
      }
    }
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
  margin-bottom: 40px;
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 600;
  padding-top: 20px;
}

/* Contenedor modificado para la barra de búsqueda */
.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;
  width: 100%;
  gap: 30px; /* Mayor espacio entre elementos */
  align-items: flex-end;
  position: relative; /* Posición relativa para el contenedor */
}

/* Estilos ajustados para el botón de búsqueda */
.search-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 5px;
  transition: 0.1s ease-in-out;
  user-select: none;
  text-align: center;
  margin-bottom: 5px;
  height: 38px; /* Altura ajustada */
  min-width: 100px; /* Ancho mínimo */
  display: flex;
  align-items: center;
  justify-content: center; /* Centrar contenido */
  position: relative; /* Añade posición */
  z-index: 1; /* Asegura que esté por encima */
  margin-left: 20px; /* Margen adicional */
}

.search-button:hover {
  transform: translateY(-2px);
}

.search-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(5px);
}

/* Contenedor dedicado para el botón de agregar */
.add-button-container {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 25px;
}

.error-message {
  background-color: #ffebee;
  color: #c62828;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #ffcdd2;
  width: 100%;
  text-align: center;
}

.loading-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  border: 1px solid #c8e6c9;
  width: 100%;
  text-align: center;
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

.user-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.08);
}

.user-table th,
.user-table td {
  padding: 15px 20px;
  text-align: left;
  border-bottom: 1px solid #eaeaea;
}

.user-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
}

.user-table tr:last-child td {
  border-bottom: none;
}

.user-table tr:nth-child(even) {
  background-color: #f7f3ff;
}

.user-table tr:hover {
  background-color: #e0d7f7;
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
  margin-bottom: 5px;
}

.delete-button {
  background-color: #e53935;
}

.cancel-button {
  background-color: #757575;
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
  padding: 2px 5px;
}

.user-table-button .button-inner span {
  font-size: 0.9rem;
  color: #000;
}

.user-table input,
.user-table select {
  width: 100%;
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #c0a2e4;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  outline: none;
}

.user-table input:focus,
.user-table select:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
}

.user-table select {
  min-width: 140px; /* Ancho mínimo para el selector */
  height: 38px; /* Altura fija para mejor visualización */
  appearance: menulist; /* Asegurar que muestre la flecha desplegable */
}

.no-results {
  margin-top: 50px;
  text-align: center;
  padding: 30px;
  background-color: #f5f5f5;
  border-radius: 10px;
  border: 2px dashed #ccc;
  width: 80%;
}

.no-results p {
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 10px;
}

.example-text {
  color: #6a11cb;
  font-weight: bold;
  font-size: 1.4rem !important;
}

.password-placeholder {
  color: #777;
  letter-spacing: 2px;
  font-weight: bold;
}
</style>
