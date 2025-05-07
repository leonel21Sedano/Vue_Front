<template>
  <div class="vote-page">
    <h1 class="page-title">Votaciones en Vivo</h1>
    
    <div v-if="message" class="vote-message" :class="message.type">
      {{ message.text }}
    </div>
    
    <!-- Primera votación: Comidas -->
    <h2 class="section-title">Comidas del Día</h2>
    <VoteBox 
      id="comidas" 
      :leftOption="votingOptions.comidas[0]" 
      :rightOption="votingOptions.comidas[1]"
      @vote="handleVote"
      :disabledSide="getUserVotedOption('comidas')"
    >
      <template #left-name>{{ votingOptions.comidas[0].name }}</template>
      <template #left-image>
        <img :src="votingOptions.comidas[0].image" :alt="votingOptions.comidas[0].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #left-votes>Votos: {{ votingOptions.comidas[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.comidas[1].name }}</template>
      <template #right-image>
        <img :src="votingOptions.comidas[1].image" :alt="votingOptions.comidas[1].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #right-votes>Votos: {{ votingOptions.comidas[1].votes }}</template>
    </VoteBox>
    
    <!-- Segunda votación: Bebidas -->
    <h2 class="section-title">Bebidas del Día</h2>
    <VoteBox 
      id="bebidas" 
      :leftOption="votingOptions.bebidas[0]" 
      :rightOption="votingOptions.bebidas[1]"
      @vote="handleVote"
      :disabledSide="getUserVotedOption('bebidas')"
    >
      <template #left-name>{{ votingOptions.bebidas[0].name }}</template>
      <template #left-image>
        <img :src="votingOptions.bebidas[0].image" :alt="votingOptions.bebidas[0].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #left-votes>Votos: {{ votingOptions.bebidas[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.bebidas[1].name }}</template>
      <template #right-image>
        <img :src="votingOptions.bebidas[1].image" :alt="votingOptions.bebidas[1].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #right-votes>Votos: {{ votingOptions.bebidas[1].votes }}</template>
    </VoteBox>
    
    <!-- Tercera votación: Postres -->
    <h2 class="section-title">Postres del Día</h2>
    <VoteBox 
      id="postres" 
      :leftOption="votingOptions.postres[0]" 
      :rightOption="votingOptions.postres[1]"
      @vote="handleVote"
      :disabledSide="getUserVotedOption('postres')"
    >
      <template #left-name>{{ votingOptions.postres[0].name }}</template>
      <template #left-image>
        <img :src="votingOptions.postres[0].image" :alt="votingOptions.postres[0].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #left-votes>Votos: {{ votingOptions.postres[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.postres[1].name }}</template>
      <template #right-image>
        <img :src="votingOptions.postres[1].image" :alt="votingOptions.postres[1].name" style="width: 100%; height: 100%; object-fit: cover;" />
      </template>
      <template #right-votes>Votos: {{ votingOptions.postres[1].votes }}</template>
    </VoteBox>
  </div>
</template>

<script>
import VoteBox from './VoteBox.vue';
import { foodOptionsStore } from '../store/foodOptionsStore';
import { ref } from 'vue';

export default {
  name: 'LiveVoting',
  components: {
    VoteBox
  },
  setup() {
    const message = ref(null);

    // Carga los votos previos del usuario del localStorage al iniciar
    const userVotes = {};
    try {
      const savedVotes = localStorage.getItem('userVotes');
      if (savedVotes) {
        Object.assign(userVotes, JSON.parse(savedVotes));
      }
    } catch (error) {
      console.error('Error al cargar votos guardados:', error);
    }

    return { 
      votingOptions: foodOptionsStore,
      userVotes,
      message
    };
  },
  methods: {
    handleVote(voteData) {
      const { id, selection } = voteData;
      
      // Verificar si el usuario ya votó en esta categoría
      if (this.getUserVotedOption(id)) {
        this.showMessage(`Ya has votado en esta categoría`, 'error');
        return;
      }
      
      // Incrementar el voto
      const optionIndex = selection === 'left' ? 0 : 1;
      foodOptionsStore[id][optionIndex].votes += 1;
      
      // Guardar que el usuario ha votado en esta categoría
      this.userVotes[id] = selection;
      this.saveUserVotes();
      
      // Mostrar mensaje de confirmación
      this.showMessage(`¡Voto registrado para ${foodOptionsStore[id][optionIndex].name}!`, 'success');
      
      console.log('Voto registrado:', voteData);
    },
    
    // Guardar los votos del usuario en localStorage
    saveUserVotes() {
      try {
        localStorage.setItem('userVotes', JSON.stringify(this.userVotes));
      } catch (error) {
        console.error('Error al guardar votos:', error);
      }
    },
    
    // Verifica si el usuario ya votó en una categoría y devuelve qué lado votó
    getUserVotedOption(category) {
      return this.userVotes[category] || null;
    },
    
    // Mostrar mensaje temporal
    showMessage(text, type = 'success') {
      this.message = { text, type };
      setTimeout(() => {
        this.message = null;
      }, 3000);
    }
  }
};
</script>

<style scoped>
.vote-page {
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

.page-title {
  color: #6a11cb;
  margin-bottom: 30px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 2.2rem;
  text-align: center;
}

.section-title {
  color: #444;
  margin: 10px 0 20px 0;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  align-self: flex-start;
  border-bottom: 2px solid #6a11cb;
  padding-bottom: 5px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.vote-message {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 10px;
  text-align: center;
  font-weight: bold;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

.vote-message.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border: 1px solid #c8e6c9;
}

.vote-message.error {
  background-color: #ffebee;
  color: #c62828;
  border: 1px solid #ffcdd2;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
