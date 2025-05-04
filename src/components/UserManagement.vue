<template>
  <div class="user-management">
    <h1 class="main-title">Administrar Usuarios</h1>
    
    <!-- Buscador de usuarios por código -->
    <div class="search-container">
      <BrutalistSearchBar
        v-model="searchQuery"
        placeholder="BUSCAR POR CÓDIGO"
        label="Edicion de Usuarios"
        @input="filterUsers"
      />
    </div>
    
    <div class="add-button" @click="addUser">
      <div class="button-inner"><span>Agregar Usuario</span></div>
    </div>
    <table class="user-table">
      <thead>
        <tr>
          <th>Nombre de Usuario</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.id">
          <td v-if="editIndex !== index">{{ user.username }}</td>
          <td v-else>
            <input v-model="editUser.username" />
          </td>
          <td v-if="editIndex !== index">{{ user.email }}</td>
          <td v-else>
            <input v-model="editUser.email" />
          </td>
          <td>
            <div v-if="editIndex !== index" class="user-table-button" @click="startEdit(index)">
              <div class="button-inner"><span>Editar</span></div>
            </div>
            <div v-else class="user-table-button" @click="saveEdit(index)">
              <div class="button-inner"><span>Guardar</span></div>
            </div>
            <div class="user-table-button" @click="deleteUser(index)">
              <div class="button-inner"><span>Eliminar</span></div>
            </div>
            <div v-if="editIndex === index" class="user-table-button" @click="cancelEdit">
              <div class="button-inner"><span>Cancelar</span></div>
            </div>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="3">No hay usuarios registrados o que coincidan con la búsqueda.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BrutalistSearchBar from './subcomponents/BrutalistSearchBar.vue';

export default {
  name: 'UserManagement',
  components: {
    BrutalistSearchBar
  },
  data() {
    return {
      users: [
        { id: 1, username: 'usuario1', email: 'usuario1@example.com', code: 'A12345' },
        { id: 2, username: 'usuario2', email: 'usuario2@example.com', code: 'B67890' }
      ],
      editIndex: null,
      editUser: {
        username: '',
        email: '',
        code: ''
      },
      searchQuery: '',
      filteredUsers: []
    };
  },
  created() {
    this.filteredUsers = [...this.users];
  },
  methods: {
    addUser() {
      const newUser = { id: Date.now(), username: '', email: '', code: '' };
      this.users.push(newUser);
      this.filterUsers();
      this.editIndex = this.filteredUsers.length - 1;
      this.editUser = { ...newUser };
    },
    startEdit(index) {
      this.editIndex = index;
      this.editUser = { ...this.filteredUsers[index] };
    },
    saveEdit(index) {
      if (!this.editUser.username.trim() || !this.editUser.email.trim()) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      
      // Encontrar el índice del usuario en el array original
      const originalIndex = this.users.findIndex(u => u.id === this.filteredUsers[index].id);
      
      if (originalIndex !== -1) {
        this.users.splice(originalIndex, 1, { ...this.editUser, id: this.users[originalIndex].id });
        this.filterUsers();
      }
      
      this.editIndex = null;
      this.editUser = { username: '', email: '', code: '' };
    },
    cancelEdit() {
      this.editIndex = null;
      this.editUser = { username: '', email: '', code: '' };
    },
    deleteUser(index) {
      if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        // Encontrar el índice del usuario en el array original
        const originalIndex = this.users.findIndex(u => u.id === this.filteredUsers[index].id);
        
        if (originalIndex !== -1) {
          this.users.splice(originalIndex, 1);
          this.filterUsers();
        }
        
        if (this.editIndex === index) {
          this.cancelEdit();
        }
      }
    },
    filterUsers() {
      if (!this.searchQuery) {
        this.filteredUsers = [...this.users];
      } else {
        const query = this.searchQuery.toLowerCase();
        this.filteredUsers = this.users.filter(user => 
          user.code && user.code.toLowerCase().includes(query)
        );
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
  margin-bottom: 60px;
  font-family: 'Poppins', sans-serif;
  font-size: 2.2rem;
  font-weight: 600;
  padding-top: 20px;
}

.search-container {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  margin-top: 10px;
  width: 100%;
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
  margin-bottom: 25px;
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

.user-table button {
  display: none;
}

.user-table input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 2px solid #c0a2e4;
  font-size: 1rem;
  transition: all 0.3s ease;
  outline: none;
}

.user-table input:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
}
</style>
