<template>
  <div class="user-management">
    <h1>Administrar Usuarios</h1>
    <button class="add-button" @click="addUser">Agregar Usuario</button>
    <table class="user-table">
      <thead>
        <tr>
          <th>Nombre de Usuario</th>
          <th>Correo Electrónico</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="user.id">
          <td v-if="editIndex !== index">{{ user.username }}</td>
          <td v-else>
            <input v-model="editUser.username" />
          </td>
          <td v-if="editIndex !== index">{{ user.email }}</td>
          <td v-else>
            <input v-model="editUser.email" />
          </td>
          <td>
            <button v-if="editIndex !== index" @click="startEdit(index)">Editar</button>
            <button v-else @click="saveEdit(index)">Guardar</button>
            <button @click="deleteUser(index)">Eliminar</button>
            <button v-if="editIndex === index" @click="cancelEdit">Cancelar</button>
          </td>
        </tr>
        <tr v-if="users.length === 0">
          <td colspan="3">No hay usuarios registrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'UserManagement',
  data() {
    return {
      users: [
        { id: 1, username: 'usuario1', email: 'usuario1@example.com' },
        { id: 2, username: 'usuario2', email: 'usuario2@example.com' }
      ],
      editIndex: null,
      editUser: {
        username: '',
        email: ''
      }
    };
  },
  methods: {
    addUser() {
      const newUser = { id: Date.now(), username: '', email: '' };
      this.users.push(newUser);
      this.editIndex = this.users.length - 1;
      this.editUser = { ...newUser };
    },
    startEdit(index) {
      this.editIndex = index;
      this.editUser = { ...this.users[index] };
    },
    saveEdit(index) {
      if (!this.editUser.username.trim() || !this.editUser.email.trim()) {
        alert('Por favor, complete todos los campos.');
        return;
      }
      this.users.splice(index, 1, { ...this.editUser, id: this.users[index].id });
      this.editIndex = null;
      this.editUser = { username: '', email: '' };
    },
    cancelEdit() {
      this.editIndex = null;
      this.editUser = { username: '', email: '' };
    },
    deleteUser(index) {
      if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
        this.users.splice(index, 1);
        if (this.editIndex === index) {
          this.cancelEdit();
        }
      }
    }
  }
};
</script>

<style scoped>
.user-management {
  max-width: 800px;
  margin: 100px auto 50px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 20px;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
}

h1 {
  color: #6a11cb;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
}

.add-button {
  background-color: #6a11cb;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 20px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #4a0fa9;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  border: 1px solid #ddd;
  padding: 12px 15px;
  text-align: left;
}

.user-table th {
  background-color: #6a11cb;
  color: white;
  font-weight: 600;
}

.user-table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.user-table tr:hover {
  background-color: #e0d7f7;
}

.user-table button {
  background-color: #a72896;
  color: white;
  border: none;
  padding: 6px 12px;
  margin-right: 5px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;
}

.user-table button:hover {
  background-color: #7c1f6d;
}

.user-table input {
  width: 100%;
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
</style>
