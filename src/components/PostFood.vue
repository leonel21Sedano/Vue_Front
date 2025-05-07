<template>
  <div class="post-food-page">
    <h1 class="page-title">Administrar Votaciones</h1>

    <!-- Sección de comidas -->
    <div class="section">
      <h2 class="section-title">Comidas del Día</h2>
      
      <div class="voting-preview">
        <VoteBox 
          id="comidas" 
          :leftOption="foodOptions.comidas[0]" 
          :rightOption="foodOptions.comidas[1]"
        >
          <template #left-name>{{ foodOptions.comidas[0].name || 'Opción 1' }}</template>
          <template #left-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.comidas[0].image" :src="foodOptions.comidas[0].image" :alt="foodOptions.comidas[0].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #left-votes>Votos: {{ foodOptions.comidas[0].votes }}</template>
          
          <template #right-name>{{ foodOptions.comidas[1].name || 'Opción 2' }}</template>
          <template #right-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.comidas[1].image" :src="foodOptions.comidas[1].image" :alt="foodOptions.comidas[1].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #right-votes>Votos: {{ foodOptions.comidas[1].votes }}</template>
        </VoteBox>
      </div>
      
      <div class="options-form">
        <div class="option-inputs">
          <h3>Opción 1</h3>
          <input type="text" v-model="foodOptions.comidas[0].name" placeholder="Nombre del alimento" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'comidas', 0)" accept="image/*" class="file-input">
        </div>
        
        <div class="option-inputs">
          <h3>Opción 2</h3>
          <input type="text" v-model="foodOptions.comidas[1].name" placeholder="Nombre del alimento" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'comidas', 1)" accept="image/*" class="file-input">
        </div>
      </div>
    </div>
    
    <!-- Sección de bebidas -->
    <div class="section">
      <h2 class="section-title">Bebidas del Día</h2>
      
      <div class="voting-preview">
        <VoteBox 
          id="bebidas" 
          :leftOption="foodOptions.bebidas[0]" 
          :rightOption="foodOptions.bebidas[1]"
        >
          <template #left-name>{{ foodOptions.bebidas[0].name || 'Opción 1' }}</template>
          <template #left-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.bebidas[0].image" :src="foodOptions.bebidas[0].image" :alt="foodOptions.bebidas[0].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #left-votes>Votos: {{ foodOptions.bebidas[0].votes }}</template>
          
          <template #right-name>{{ foodOptions.bebidas[1].name || 'Opción 2' }}</template>
          <template #right-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.bebidas[1].image" :src="foodOptions.bebidas[1].image" :alt="foodOptions.bebidas[1].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #right-votes>Votos: {{ foodOptions.bebidas[1].votes }}</template>
        </VoteBox>
      </div>
      
      <div class="options-form">
        <div class="option-inputs">
          <h3>Opción 1</h3>
          <input type="text" v-model="foodOptions.bebidas[0].name" placeholder="Nombre de la bebida" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'bebidas', 0)" accept="image/*" class="file-input">
        </div>
        
        <div class="option-inputs">
          <h3>Opción 2</h3>
          <input type="text" v-model="foodOptions.bebidas[1].name" placeholder="Nombre de la bebida" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'bebidas', 1)" accept="image/*" class="file-input">
        </div>
      </div>
    </div>
    
    <!-- Sección de postres -->
    <div class="section">
      <h2 class="section-title">Postres del Día</h2>
      
      <div class="voting-preview">
        <VoteBox 
          id="postres" 
          :leftOption="foodOptions.postres[0]" 
          :rightOption="foodOptions.postres[1]"
        >
          <template #left-name>{{ foodOptions.postres[0].name || 'Opción 1' }}</template>
          <template #left-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.postres[0].image" :src="foodOptions.postres[0].image" :alt="foodOptions.postres[0].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #left-votes>Votos: {{ foodOptions.postres[0].votes }}</template>
          
          <template #right-name>{{ foodOptions.postres[1].name || 'Opción 2' }}</template>
          <template #right-image>
            <div class="image-upload-container">
              <img v-if="foodOptions.postres[1].image" :src="foodOptions.postres[1].image" :alt="foodOptions.postres[1].name" class="preview-image"/>
              <div v-else class="upload-placeholder">
                <span>Imagen</span>
              </div>
            </div>
          </template>
          <template #right-votes>Votos: {{ foodOptions.postres[1].votes }}</template>
        </VoteBox>
      </div>
      
      <div class="options-form">
        <div class="option-inputs">
          <h3>Opción 1</h3>
          <input type="text" v-model="foodOptions.postres[0].name" placeholder="Nombre del postre" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'postres', 0)" accept="image/*" class="file-input">
        </div>
        
        <div class="option-inputs">
          <h3>Opción 2</h3>
          <input type="text" v-model="foodOptions.postres[1].name" placeholder="Nombre del postre" class="text-input">
          <input type="file" @change="handleImageUpload($event, 'postres', 1)" accept="image/*" class="file-input">
        </div>
      </div>
    </div>
    
    <div class="submit-container">
      <div class="box-button" @click="guardarOpciones">
        <div class="button-inner"><span>Guardar Opciones</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import VoteBox from './VoteBox.vue';

import { foodOptionsStore } from '../store/foodOptionsStore';

export default {
  name: 'PostFood',
  components: {
    VoteBox
  },
  setup() {
    return { foodOptions: foodOptionsStore };
  },
  methods: {
    handleImageUpload(event, category, index) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          foodOptionsStore[category][index].image = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    guardarOpciones() {
      // Validación simple
      const allOptionsValid = Object.values(foodOptionsStore).every(category => {
        return category.every(option => option.name.trim() !== '');
      });
      
      if (!allOptionsValid) {
        alert('Por favor completa todos los nombres de las opciones.');
        return;
      }
      
      alert('Opciones guardadas correctamente. Se publicarán en la página de votaciones.');
      console.log('Opciones guardadas:', foodOptionsStore);
    }
  }
};
</script>

<style scoped>
.post-food-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 50px;
  padding: 30px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  border-radius: 20px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
  box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
}

.page-title {
  color: #6a11cb;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 2.2rem;
  text-align: center;
}

.section {
  width: 100%;
  margin-bottom: 40px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 30px;
}

.section-title {
  color: #444;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  align-self: flex-start;
  border-bottom: 2px solid #6a11cb;
  padding-bottom: 5px;
  margin-bottom: 20px;
}

.voting-preview {
  margin-bottom: 20px;
}

.options-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
}

.option-inputs {
  flex: 1;
  min-width: 250px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.option-inputs h3 {
  margin-top: 0;
  color: #6a11cb;
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  margin-bottom: 15px;
}

.text-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 2px solid #c0a2e4;
  border-radius: 8px;
  font-size: 1rem;
  font-family: Arial, sans-serif;
  transition: all 0.3s ease;
  outline: none;
}

.text-input:focus {
  border-color: #6a11cb;
  box-shadow: 0 0 0 3px rgba(106, 17, 203, 0.2);
}

.file-input {
  width: 100%;
  margin-bottom: 10px;
}

.image-upload-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  color: #888;
  font-size: 1.2rem;
}

.submit-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.box-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 180px;
  text-align: center;
}

.box-button:hover {
  transform: translateY(-2px);
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

.box-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(10px);
}
</style>
