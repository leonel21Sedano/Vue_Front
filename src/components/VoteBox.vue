<template>
  <div class="voting-container">
    <div class="team-column">
      <h3 class="option-name">
        <slot name="left-name"></slot>
      </h3>
      <div class="team-box left-team">
        <slot name="left-content"></slot>
      </div>
      <p class="vote-count">
        <slot name="left-votes"></slot>
      </p>
      <div class="box-button" @click="voteLeft">
        <div class="button"><span>Votar</span></div>
      </div>
    </div>
    
    <img src="../assets/vs.png" alt="VS" class="vs-image" />
    
    <div class="team-column">
      <h3 class="option-name">
        <slot name="right-name"></slot>
      </h3>
      <div class="team-box right-team">
        <slot name="right-content"></slot>
      </div>
      <p class="vote-count">
        <slot name="right-votes"></slot>
      </p>
      <div class="box-button" @click="voteRight">
        <div class="button"><span>Votar</span></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VoteBox',
  props: {
    id: {
      type: String,
      required: true
    },
    leftOption: {
      type: Object,
      default: () => ({})
    },
    rightOption: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    voteLeft() {
      this.$emit('vote', { id: this.id, selection: 'left', option: this.leftOption });
    },
    voteRight() {
      this.$emit('vote', { id: this.id, selection: 'right', option: this.rightOption });
    }
  }
};
</script>

<style scoped>
.voting-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 20px;
  margin-bottom: 40px;
}

.team-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.team-box {
  background-color: white;
  border-radius: 10px;
  height: 200px;
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.option-name {
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
  margin: 0;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
}

.vote-count {
  font-weight: bold;
  color: #6a11cb;
  margin: 0;
  font-size: 1.1rem;
}

.vs-image {
  height: auto;
  max-width: 150px;
  margin: 0 10px;
}

.box-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: gray;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 120px;
  text-align: center;
}

.button {
  background-color: #dddddd;
  border: 4px solid #fff;
  padding: 3px 8px;
}

.button span {
  font-size: 1.2em;
  letter-spacing: 1px;
}

.box-button:active {
  padding: 0;
  margin-bottom: 10px;
  transform: translateY(10px);
}
</style>
