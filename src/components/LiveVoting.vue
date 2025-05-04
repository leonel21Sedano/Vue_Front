<template>
  <div class="vote-page">
    <h1 class="page-title">Votaciones en Vivo</h1>

    <!-- Primera votación: Comidas -->
    <h2 class="section-title">Comidas del Dia</h2>
    <div class="options-container">
      <SingleVoteBox
        v-for="(option, index) in votingOptions.comidas"
        :key="'comidas-' + index"
        id="comidas"
        :option="option"
        @vote="handleSingleVote"
      />
    </div>

    <!-- Segunda votación: Bebidas -->
    <h2 class="section-title">Bebidas del Dia</h2>
    <div class="options-container">
      <SingleVoteBox
        v-for="(option, index) in votingOptions.bebidas"
        :key="'bebidas-' + index"
        id="bebidas"
        :option="option"
        @vote="handleSingleVote"
      />
    </div>

    <!-- Tercera votación: Postres -->
    <h2 class="section-title">Postres del Dia</h2>
    <div class="options-container">
      <SingleVoteBox
        v-for="(option, index) in votingOptions.postres"
        :key="'postres-' + index"
        id="postres"
        :option="option"
        @vote="handleSingleVote"
      />
    </div>
  </div>
</template>

<script>
import SingleVoteBox from './SingleVoteBox.vue';

export default {
  name: 'LiveVoting',
  components: {
    SingleVoteBox
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
          { id: 0, name: 'Tacos', votes: 15, image: require('../assets/Delicious Tacos Al Pastor.jpeg') },
          { id: 1, name: 'Hamburguesa', votes: 12, image: require('../assets/Recette de hamburger et de frites Double Smash paresseux 🍔🍟 Ingrédients _ Pour les hamburgers Double Smash _ 1 lb de bœuf haché (mélange 80_20 recommandé) 🍖 Sel et poivre, au goût 🧂 4 tranches de fromage (amér.jpeg') }
        ],
        bebidas: [
          { id: 0, name: 'Agua Fresca', votes: 8, image: require('../assets/vs.png') },
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
    toggleList(listName) {
      this[listName] = !this[listName];
    },
    setHover(listName) {
      this.hoverList = listName;
    },
    clearHover() {
      this.hoverList = null;
    },
    handleSingleVote(voteData) {
      console.log('Voto registrado:', voteData);

      const { id, optionId } = voteData;
      const option = this.votingOptions[id].find(opt => opt.id === optionId);
      if (option) {
        option.votes += 1;
      }
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

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}
</style>
