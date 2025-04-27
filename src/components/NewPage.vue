<template>
  <div class="new-page">
    <h1></h1>

  <div class="lists-container">
      <div class="list-section">
        <div class="list-header" @click="toggleList('showComidas')">
          <span>Comidas</span>
          <span>{{ showComidas ? '▲' : '▼' }}</span>
        </div>
        <button @click="modificarBebidas" class="modify-button">Modificar comidas</button>
        <div v-if="showComidas" class="list-content">
          <ul>
            <li v-for="item in comidas" :key="item">
              <label class="custom-checkbox">
                <input type="checkbox" :value="item" v-model="selectedComidas" />
                <div class="checkbox-box"></div>
                <span>{{ item }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="list-section">
        <div class="list-header" @click="toggleList('showBebidas')">
          <span>Bebidas</span>
          <span>{{ showBebidas ? '▲' : '▼' }}</span>
        </div>
        <button @click="modificarBebidas" class="modify-button">Modificar bebidas</button>
        <div v-if="showBebidas" class="list-content">
          <ul>
            <li v-for="item in bebidas" :key="item">
              <label class="custom-checkbox">
                <input type="checkbox" :value="item" v-model="selectedBebidas" />
                <div class="checkbox-box"></div>
                <span>{{ item }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="list-section">
        <div class="list-header" @click="toggleList('showPostres')">
          <span>Postres</span>
          <span>{{ showPostres ? '▲' : '▼' }}</span>
        </div>
        <button @click="modificarPostres" class="modify-button">Modificar postres</button>
        <div v-if="showPostres" class="list-content">
          <ul>
            <li v-for="item in postres" :key="item">
              <label class="custom-checkbox">
                <input type="checkbox" :value="item" v-model="selectedPostres" />
                <div class="checkbox-box"></div>
                <span>{{ item }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <div class="list-section">
        <div class="list-header" @click="toggleList('showAlmuerzos')">
          <span>Almuerzos</span>
          <span>{{ showAlmuerzos ? '▲' : '▼' }}</span>
        </div>
        <button @click="modificarAlmuerzos" class="modify-button">Modificar almuerzos</button>
        <div v-if="showAlmuerzos" class="list-content">
          <ul>
            <li v-for="item in almuerzos" :key="item">
              <label class="custom-checkbox">
                <input type="checkbox" :value="item" v-model="selectedAlmuerzos" />
                <div class="checkbox-box"></div>
                <span>{{ item }}</span>
              </label>
            </li>
          </ul>
        </div>
      </div>
    </div>


<div class="box-button" @click="guardarSeleccion">
  <div class="button"><span>Guardar selección</span></div>
</div>
  </div>
</template>

<script>
export default {
  name: 'NewPage',
  data() {
    return {
      showComidas: false,
      showBebidas: false,
      showPostres: false,
      selectedComidas: [],
      selectedBebidas: [],
      selectedPostres: [],
      showAlmuerzos: false,
      selectedAlmuerzos: [],
      
      comidas: ['Tacos', 'Enchiladas', 'Quesadillas'],
      bebidas: ['Agua', 'Jugo de naranja', 'Café'],
      postres: ['Flan', 'Churros', 'Helado'],
      almuerzos: ['Ensalada César', 'Sándwich de pollo', 'Pasta al pesto'],
      hoverList: null,
    };
  },
  methods: {
    goBack() {
      this.$router.push('/');
    },
    toggleList(listName) {
      this[listName] = !this[listName];
    },
    setHover(listName) {
      this.hoverList = listName;
    },
    clearHover() {
      this.hoverList = null;
    },
    guardarSeleccion() {
      const seleccion = {
        comidas: this.selectedComidas,
        bebidas: this.selectedBebidas,
        postres: this.selectedPostres,
        almuerzos: this.selectedAlmuerzos,
      };
      alert('Selección guardada: ' + JSON.stringify(seleccion, null, 2));
    },
    modificarComidas() {
      const nuevaComida = prompt('Ingrese una nueva comida para agregar:');
      if (nuevaComida && nuevaComida.trim() !== '') {
        this.comidas.push(nuevaComida.trim());
      }
    },
    modificarBebidas() {
      const nuevaBebida = prompt('Ingrese una nueva bebida para agregar:');
      if (nuevaBebida && nuevaBebida.trim() !== '') {
        this.bebidas.push(nuevaBebida.trim());
      }
    },
    modificarPostres() {
      const nuevoPostre = prompt('Ingrese un nuevo postre para agregar:');
      if (nuevoPostre && nuevoPostre.trim() !== '') {
        this.postres.push(nuevoPostre.trim());
      }
    },
    modificarAlmuerzos() {
      const nuevoAlmuerzo = prompt('Ingrese un nuevo almuerzo para agregar:');
      if (nuevoAlmuerzo && nuevoAlmuerzo.trim() !== '') {
        this.almuerzos.push(nuevoAlmuerzo.trim());
      }
    },
  },
};
</script>

<style scoped>
.new-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 200px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
}

.lists-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
}

.list-section {
  margin-bottom: 20px;
}

.list-header {
  font-size: 20px;
  font-weight: bold;
  color: #444;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-header span {
  user-select: none;
}

.list-content {
  margin-top: 10px;
}

.list-content ul {
  list-style-type: none;
  padding-left: 0;
}

.list-content li {
  margin-bottom: 8px;
  font-size: 16px;
  color: #555;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkbox-box {
  width: 32px;
  height: 32px;
  background-color: white;
  border: 2px solid #7c3aed; /* purple-500 */
  border-radius: 8px;
  transition: all 0.3s ease-in-out;
  position: relative;
  margin-right: 10px;
  box-sizing: border-box;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-box {
  background: linear-gradient(to bottom right, #7c3aed, #ec4899); /* from purple-500 to pink-500 */
  border: none;
  transform: rotate(12deg);
}

.checkbox-box::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cG9seWxpbmUgcG9pbnRzPSIyMCA2IDkgMTcgNCAxMiI+PC9wb2x5bGluZT48L3N2Zz4=");
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.custom-checkbox input[type="checkbox"]:checked + .checkbox-box::after {
  opacity: 1;
}

.back-button, .save-button, .modify-button {
  color: #090909;
  padding: 0.7em 1.7em;
  font-size: 18px;
  border-radius: 0.5em;
  background: #e8e8e8;
  cursor: pointer;
  border: 1px solid #e8e8e8;
  transition: all 0.3s;
  box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
  margin-top: 10px;
}

.back-button:active, .save-button:active, .modify-button:active {
  color: #666;
  box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #0056b3;
}
.save-button {
  background-color: #a72896;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
  transition: background-color 0.3s ease;
}

.save-button:hover {
  background-color: #1e7e34;
}
.button {
  width: 150px;
  padding: 0;
  border: none;
  transform: rotate(5deg);
  transform-origin: center;
  font-family: "Gochi Hand", cursive;
  text-decoration: none;
  font-size: 15px;
  cursor: pointer;
  padding-bottom: 3px;
  border-radius: 5px;
  box-shadow: 0 2px 0 #494a4b;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background-color: #a33b8d;
}

.button span {
  background: #f1f5f8;
  display: block;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  border: 2px solid #494a4b;
}

.button:active {
  transform: translateY(5px);
  padding-bottom: 0px;
  outline: 0;
}
</style>
