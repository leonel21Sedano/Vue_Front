<template>
  <div class="post-food-page">
    <h1 class="page-title">Administrar Votaciones</h1>

    <!-- Acciones generales -->
    <div class="actions-container">
      <button @click="saveOptions" class="save-button">Guardar Cambios</button>
      <button @click="resetAllVotes" class="reset-button">Reiniciar Votaciones</button>
    </div>
    
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>

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
  </div>
</template>

<script>
import VoteBox from './VoteBox.vue';
import { foodOptionsStore, saveOptionsState } from '../store/foodOptionsStore';

export default {
  name: 'PostFood',
  components: {
    VoteBox
  },
  data() {
    return {
      foodOptions: foodOptionsStore,
      successMessage: ''
    };
  },
  methods: {
    saveOptions() {
      // Validación simple
      const allOptionsValid = Object.values(this.foodOptions).every(category => {
        return category.every(option => option.name.trim() !== '');
      });
      
      if (!allOptionsValid) {
        alert('Por favor completa todos los nombres de las opciones.');
        return;
      }

      // Reiniciar los contadores de votos para todas las opciones
      this.resetAllVotes(false);
      
      // Guardar las opciones en localStorage
      saveOptionsState();
      
      // Mostrar mensaje de éxito
      this.successMessage = 'Cambios guardados y votaciones reiniciadas correctamente';
      
      // Ocultar mensaje después de unos segundos
      setTimeout(() => {
        this.successMessage = '';
      }, 3000);
    },
    
    resetAllVotes(showMessage = true) {
      // Reiniciar los contadores de votos
      Object.keys(this.foodOptions).forEach(category => {
        this.foodOptions[category].forEach(option => {
          option.votes = 0;
        });
      });
      
      // Eliminar todos los registros de votos de usuarios
      this.clearAllUserVotes();
      
      // Actualizar el estado global
      saveOptionsState();
      
      // Mostrar mensaje de éxito (solo si se solicita)
      if (showMessage) {
        this.successMessage = 'Votaciones reiniciadas correctamente';
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      }
    },
    
    clearAllUserVotes() {
      // Eliminar todos los registros de votos guardados en localStorage
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('userVotes_')) {
          keys.push(key);
        }
      }
      
      // Eliminar cada clave de userVotes
      keys.forEach(key => localStorage.removeItem(key));
    },
    
    handleImageUpload(event, category, index) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        this.foodOptions[category][index].image = e.target.result;
      };
      reader.readAsDataURL(file);
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

.actions-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 30px;
  gap: 20px;
}

.save-button, .reset-button {
  padding: 12px 24px;
  font-size: 1.1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: bold;
  min-width: 200px;
  text-align: center;
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.save-button {
  background-color: #4CAF50;
  color: white;
}

.save-button:hover {
  background-color: #388E3C;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

.reset-button {
  background-color: #F44336;
  color: white;
}

.reset-button:hover {
  background-color: #D32F2F;
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0,0,0,0.15);
}

.save-button:active, .reset-button:active {
  transform: translateY(1px);
  box-shadow: 0 2px 3px rgba(0,0,0,0.1);
}

.success-message {
  background-color: #E8F5E9;
  color: #2E7D32;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  border: 1px solid #C8E6C9;
  width: 100%;
}

@media (max-width: 768px) {
  .actions-container {
    flex-direction: column;
    align-items: center;
  }
  
  .save-button, .reset-button {
    width: 100%;
    margin-bottom: 10px;
  }
}
</style>
