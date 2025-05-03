<template>
  <form class="form" @submit.prevent="handleSubmit">
    <p class="heading">Registro</p>
    <input class="input" v-model="nombre" placeholder="Nombre" type="text" required>
    <input class="input" v-model="apellidos" placeholder="Apellidos" type="text" required>
    <input class="input" v-model="correo" placeholder="Correo" type="email" required>
    <input class="input" v-model="contraseña" placeholder="Contraseña" type="password" required>
    <input class="input" v-model="codigoEstudiante" placeholder="Código Estudiante" type="text" required>
    <button class="btn" type="submit">Registrar</button>
  </form>
</template>
  
<script>
export default {
  name: 'RegisterUser',
  data() {
    return {
      nombre: '',
      apellidos: '',
      correo: '',
      contraseña: '',
      codigoEstudiante: ''
    };
  },
  methods: {
    handleSubmit() {
      // Handle registration logic here
      const userData = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        correo: this.correo,
        contraseña: this.contraseña,
        codigoEstudiante: this.codigoEstudiante
      };
      console.log('User data:', userData);
      // Aquí puedes agregar la lógica para enviar los datos al backend
    }
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
</style>
