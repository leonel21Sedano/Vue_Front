<template>
  <div class="voting-container">
    <div class="team-column">
      <h3 class="option-name">
        <slot name="left-name"></slot>
      </h3>
      <div class="team-box">
        <slot name="left-image">
          <div class="placeholder-image"></div>
        </slot>
      </div>
      <p class="vote-count">
        <slot name="left-votes"></slot>
      </p>
      <div 
        class="box-button" 
        :class="{ 'disabled': disabledSide === 'left' || disabledSide === 'right' }" 
        @click="disabledSide ? null : voteLeft()"
      >
        <div class="button-inner">
          <span>{{ getButtonText('left') }}</span>
        </div>
      </div>
    </div>
    
    <img src="../assets/vs.png" alt="VS" class="vs-image" />
    
    <div class="team-column">
      <h3 class="option-name">
        <slot name="right-name"></slot>
      </h3>
      <div class="team-box">
        <slot name="right-image">
          <div class="placeholder-image"></div>
        </slot>
      </div>
      <p class="vote-count">
        <slot name="right-votes"></slot>
      </p>
      <div 
        class="box-button" 
        :class="{ 'disabled': disabledSide === 'right' || disabledSide === 'left' }" 
        @click="disabledSide ? null : voteRight()"
      >
        <div class="button-inner">
          <span>{{ getButtonText('right') }}</span>
        </div>
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
    },
    disabledSide: {
      type: String,
      default: null,
      validator: (value) => value === null || value === 'left' || value === 'right'
    }
  },
  methods: {
    voteLeft() {
      if (this.disabledSide) return;
      this.$emit('vote', { id: this.id, selection: 'left', option: this.leftOption });
    },
    voteRight() {
      if (this.disabledSide) return;
      this.$emit('vote', { id: this.id, selection: 'right', option: this.rightOption });
    },
    getButtonText(side) {
      if (!this.disabledSide) return "Votar";
      if (this.disabledSide === side) return "Votado ✓";
      return "Cerrado";
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
  overflow: hidden;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
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
  font-family: 'Poppins', sans-serif;
}

.vote-count {
  font-weight: bold;
  color: #6a11cb;
  margin: 0;
  font-size: 1.1rem;
  font-family: Arial, sans-serif;
}

.vs-image {
  height: auto;
  max-width: 150px;
  margin: 0 10px;
}

.box-button {
  cursor: pointer;
  border: 4px solid black;
  background-color: #6a11cb;
  padding-bottom: 10px;
  transition: 0.1s ease-in-out;
  user-select: none;
  width: 120px;
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

.box-button.disabled {
  opacity: 0.7;
  cursor: not-allowed;
  background-color: #a0a0a0;
}

.box-button.disabled:hover {
  transform: none;
}

.box-button.disabled:active {
  padding-bottom: 10px;
  margin-bottom: 0;
  transform: none;
}
</style>
