<template>
  <div class="vote-page">
    <h1 class="page-title">Votaciones en Vivo</h1>
    
    <!-- Primera votación: Comidas -->
    <h2 class="section-title">Comidas del Día</h2>
    <div v-if="hasVoted('comidas')" class="vote-message">
      Has votado por: <span class="voted-option">{{ getVotedOptionName('comidas') }}</span>
    </div>
    <VoteBox 
      id="comidas" 
      :leftOption="votingOptions.comidas[0]" 
      :rightOption="votingOptions.comidas[1]"
      @vote="handleVote"
      :disabled="hasVoted('comidas')"
      :selectedOption="getSelectedOption('comidas')"
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
    <div v-if="hasVoted('bebidas')" class="vote-message">
      Has votado por: <span class="voted-option">{{ getVotedOptionName('bebidas') }}</span>
    </div>
    <VoteBox 
      id="bebidas" 
      :leftOption="votingOptions.bebidas[0]" 
      :rightOption="votingOptions.bebidas[1]"
      @vote="handleVote"
      :disabled="hasVoted('bebidas')"
      :selectedOption="getSelectedOption('bebidas')"
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
    <div v-if="hasVoted('postres')" class="vote-message">
      Has votado por: <span class="voted-option">{{ getVotedOptionName('postres') }}</span>
    </div>
    <VoteBox 
      id="postres" 
      :leftOption="votingOptions.postres[0]" 
      :rightOption="votingOptions.postres[1]"
      @vote="handleVote"
      :disabled="hasVoted('postres')"
      :selectedOption="getSelectedOption('postres')"
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
import { foodOptionsStore, saveOptionsState } from '../store/foodOptionsStore';
import AuthService from '../services/AuthService';

export default {
  name: 'LiveVoting',
  components: {
    VoteBox
  },
  data() {
    return {
      votingOptions: foodOptionsStore,
      userVotes: {}
    };
  },
  computed: {
    // Obtener el identificador único del usuario actual
    currentUserIdentifier() {
      const user = AuthService.getCurrentUser();
      return user ? user.correo : 'anonymous';
    },
    // Clave para guardar votos en localStorage
    userVotesKey() {
      return `userVotes_${this.currentUserIdentifier}`;
    }
  },
  created() {
    // Cargar votos previos del usuario actual
    this.loadUserVotes();
  },
  watch: {
    // Observar cambios en el usuario actual para recargar votos
    currentUserIdentifier() {
      this.loadUserVotes();
    }
  },
  methods: {
    loadUserVotes() {
      // Cargar votos específicos para el usuario actual
      const savedVotes = localStorage.getItem(this.userVotesKey);
      if (savedVotes) {
        this.userVotes = JSON.parse(savedVotes);
      } else {
        // Reiniciar votos si no hay datos para el usuario actual
        this.userVotes = {};
      }
    },
    
    hasVoted(category) {
      return this.userVotes[category] !== undefined;
    },
    
    getVotedOptionName(category) {
      if (!this.hasVoted(category)) return '';
      
      const voteInfo = this.userVotes[category];
      const optionIndex = voteInfo.selection === 'left' ? 0 : 1;
      return this.votingOptions[category][optionIndex].name;
    },
    
    getSelectedOption(category) {
      if (!this.hasVoted(category)) return null;
      return this.userVotes[category].selection;
    },
    
    handleVote(voteData) {
      const { id, selection } = voteData;
      const optionIndex = selection === 'left' ? 0 : 1;
      
      // Verificar si el usuario ya votó en esta categoría
      if (this.hasVoted(id)) {
        console.warn('Ya has votado en esta categoría');
        return;
      }
      
      // Registrar el voto en el store
      this.votingOptions[id][optionIndex].votes += 1;
      
      // Guardar el voto del usuario con su identificador único
      this.userVotes[id] = { 
        selection, 
        timestamp: new Date().toISOString(),
        optionName: this.votingOptions[id][optionIndex].name
      };
      
      // Persistir en localStorage con la clave específica del usuario
      localStorage.setItem(this.userVotesKey, JSON.stringify(this.userVotes));
      
      // Guardar el estado de las opciones (contadores)
      saveOptionsState();
      
      console.log('Voto registrado para usuario:', this.currentUserIdentifier, id, selection);
    }
  }
};
</script>

<style scoped>
.vote-page {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.page-title {
  text-align: center;
  color: #6a11cb;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-weight: bold;
}

.section-title {
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.8rem;
  color: #333;
  border-bottom: 2px solid #ddd;
  padding-bottom: 5px;
}

.vote-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  border: 1px solid #c8e6c9;
  text-align: center;
}

.voted-option {
  font-weight: bold;
  color: #6a11cb;
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 1.5rem;
  }
}
</style>
