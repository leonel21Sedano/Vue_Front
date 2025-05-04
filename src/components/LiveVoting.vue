<template>
  <div class="vote-page">
    <h1 class="page-title">Votaciones en Vivo</h1>
    
    <!-- Primera votación: Comidas -->
    <h2 class="section-title">Comidas del Día</h2>
    <VoteBox 
      id="comidas" 
      :leftOption="votingOptions.comidas[0]" 
      :rightOption="votingOptions.comidas[1]"
      @vote="handleVote"
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

export default {
  name: 'LiveVoting',
  components: {
    VoteBox
  },
  data() {
    return {
      // Datos para las votaciones
      votingOptions: {
        comidas: [
          { id: 0, name: 'Tacos', votes: 15, image: require('../assets/Delicious Tacos Al Pastor.jpeg') },
          { id: 1, name: 'Hamburguesa', votes: 12, image: require('../assets/Hamburguesa.jpeg') }
        ],
        bebidas: [
          { id: 0, name: 'Agua Fresca', votes: 8, image: require('../assets/logo.png') },
          { id: 1, name: 'Refresco', votes: 10, image: require('../assets/logo.png') }
        ],
        postres: [
          { id: 0, name: 'Flan', votes: 7, image: require('../assets/logo.png') },
          { id: 1, name: 'Pastel', votes: 11, image: require('../assets/logo.png') }
        ]
      }
    };
  },
  methods: {
    handleVote(voteData) {
      console.log('Voto registrado:', voteData);
      
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
</style>
