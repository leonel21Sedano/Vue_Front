<template>
  <div class="vote-page">
    <h1 class="page-title">Votaciones en Vivo</h1>
    
    <!-- Primera votación: Comidas -->
    <h2 class="section-title">Comidas del Dia</h2>
    <VoteBox 
      id="comidas" 
      :leftOption="votingOptions.comidas[0]" 
      :rightOption="votingOptions.comidas[1]"
      @vote="handleVote"
    >
      <template #left-name>{{ votingOptions.comidas[0].name }}</template>
      <template #left-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #left-votes>Votos: {{ votingOptions.comidas[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.comidas[1].name }}</template>
      <template #right-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #right-votes>Votos: {{ votingOptions.comidas[1].votes }}</template>
    </VoteBox>
    
    <!-- Segunda votación: Bebidas -->
    <h2 class="section-title">Bebidas del Dia</h2>
    <VoteBox 
      id="bebidas" 
      :leftOption="votingOptions.bebidas[0]" 
      :rightOption="votingOptions.bebidas[1]"
      @vote="handleVote"
    >
      <template #left-name>{{ votingOptions.bebidas[0].name }}</template>
      <template #left-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #left-votes>Votos: {{ votingOptions.bebidas[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.bebidas[1].name }}</template>
      <template #right-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #right-votes>Votos: {{ votingOptions.bebidas[1].votes }}</template>
    </VoteBox>
    
    <!-- Tercera votación: Postres -->
    <h2 class="section-title">Postres del Dia</h2>
    <VoteBox 
      id="postres" 
      :leftOption="votingOptions.postres[0]" 
      :rightOption="votingOptions.postres[1]"
      @vote="handleVote"
    >
      <template #left-name>{{ votingOptions.postres[0].name }}</template>
      <template #left-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #left-votes>Votos: {{ votingOptions.postres[0].votes }}</template>
      
      <template #right-name>{{ votingOptions.postres[1].name }}</template>
      <template #right-content>
        <!-- Aquí irá la imagen en el futuro -->
      </template>
      <template #right-votes>Votos: {{ votingOptions.postres[1].votes }}</template>
    </VoteBox>
  </div>
</template>

<script>
import VoteBox from './VoteBox.vue';

export default {
  name: 'LiveVoting',
  components: {
    VoteBox
  },
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
      
      // Datos para las votaciones
      votingOptions: {
        comidas: [
          { name: 'Tacos', votes: 15 },
          { name: 'Hamburguesa', votes: 12 }
        ],
        bebidas: [
          { name: 'Agua Fresca', votes: 8 },
          { name: 'Refresco', votes: 10 }
        ],
        postres: [
          { name: 'Flan', votes: 7 },
          { name: 'Pastel', votes: 11 }
        ]
      }
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
    handleVote(voteData) {
      console.log('Voto registrado:', voteData);
      
      // Incrementa el contador de votos para la opción elegida
      const { id, selection } = voteData;
      const optionIndex = selection === 'left' ? 0 : 1;
      this.votingOptions[id][optionIndex].votes += 1;
      
      // Aquí se podría agregar lógica para enviar el voto al backend
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

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 15px;
}

.option-content h3 {
  margin-bottom: 10px;
  color: #333;
}

.option-content p {
  font-weight: bold;
  color: #6a11cb;
}
</style>
