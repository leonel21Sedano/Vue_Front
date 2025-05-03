<template>
  <div class="new-page">
    <h1>Votaciones</h1>

    <div class="lists-container">
      <div class="list-section">
        <div class="list-header" @click="toggleList('showComidas')">
          <span>Comidas</span>
          <span>{{ showComidas ? '▲' : '▼' }}</span>
        </div>
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
      comidas: ['Tacos', 'Enchiladas', 'Quesadillas'],
      bebidas: ['Agua', 'Jugo de naranja', 'Café'],
      postres: ['Flan', 'Churros', 'Helado'],
      hoverList: null,
    };
  },
  methods: {
    toggleList(listName) {
      this[listName] = !this[listName];
    },
    setHover(listName) {
      this.hoverList = listName;
    },
    clearHover() {
      this.hoverList = null;
    },
  },
};
</script>

<style scoped>
.new-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 15px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.new-page h1 {
  color: #6a11cb;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
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
</style>
