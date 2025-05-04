<template>
  <div class="single-vote-box">
    <h3 class="option-name">{{ option.name }}</h3>
    <img :src="option.image" :alt="option.name" class="option-image" />
    <p class="vote-count">Votos: {{ option.votes }}</p>
    <button class="vote-button" @click="vote">Votar</button>
  </div>
</template>

<script>
export default {
  name: 'SingleVoteBox',
  props: {
    id: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  },
  methods: {
    vote() {
      this.$emit('vote', { id: this.id, optionId: this.option.id });
    }
  }
};
</script>

<style scoped>
.single-vote-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
  border: 2px solid #6a11cb;
  border-radius: 10px;
  padding: 15px;
  width: 180px;
  background-color: #f0f0f0;
}

.option-name {
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
}

.option-image {
  width: 150px;
  height: auto;
  margin-bottom: 10px;
  border-radius: 8px;
}

.vote-count {
  font-weight: bold;
  color: #6a11cb;
  margin-bottom: 10px;
  font-size: 1.1rem;
}

.vote-button {
  background-color: #6a11cb;
  color: white;
  border: none;
  padding: 8px 20px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.vote-button:hover {
  background-color: #4a0fa9;
}
</style>
