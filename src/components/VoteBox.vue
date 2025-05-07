<template>
  <div class="vote-box" :class="{ 'disabled': disabled }">
    <!-- Opción izquierda -->
    <div class="vote-option left-option" :class="{ 'selected': isSelected('left') }" @click="!disabled && vote('left')">
      <div class="option-content">
        <div class="option-name"><slot name="left-name">Opción Izquierda</slot></div>
        <div class="option-image"><slot name="left-image"></slot></div>
        <div class="vote-count"><slot name="left-votes">0 votos</slot></div>
        <button v-if="!disabled" class="vote-button">Votar</button>
        <div v-else-if="isSelected('left')" class="voted-indicator">Tu elección ✓</div>
      </div>
    </div>
    
    <div class="versus">VS</div>
    
    <!-- Opción derecha -->
    <div class="vote-option right-option" :class="{ 'selected': isSelected('right') }" @click="!disabled && vote('right')">
      <div class="option-content">
        <div class="option-name"><slot name="right-name">Opción Derecha</slot></div>
        <div class="option-image"><slot name="right-image"></slot></div>
        <div class="vote-count"><slot name="right-votes">0 votos</slot></div>
        <button v-if="!disabled" class="vote-button">Votar</button>
        <div v-else-if="isSelected('right')" class="voted-indicator">Tu elección ✓</div>
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
    disabled: {
      type: Boolean,
      default: false
    },
    selectedOption: {
      type: String,
      default: null
    }
  },
  methods: {
    vote(selection) {
      if (this.disabled) return;
      
      this.$emit('vote', {
        id: this.id,
        selection
      });
    },
    isSelected(option) {
      return this.disabled && this.selectedOption === option;
    }
  }
};
</script>

<style scoped>
.vote-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  gap: 20px;
}

.vote-option {
  flex: 1;
  border: 4px solid black;
  background-color: white;
  padding: 15px;
  border-radius: 5px;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  cursor: pointer;
}

.vote-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.vote-box.disabled .vote-option {
  opacity: 0.85;
  cursor: default;
}

.vote-box.disabled .vote-option:hover {
  transform: none;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.15);
}

.vote-option.selected {
  background-color: #f0f7ff;
  border-color: #6a11cb;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.option-name {
  font-size: 1.4rem;
  font-weight: bold;
  text-align: center;
}

.option-image {
  width: 100%;
  height: 200px;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.vote-count {
  font-size: 1.1rem;
  font-weight: 500;
  color: #555;
}

.versus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  padding: 15px;
  color: #6a11cb;
}

.vote-button {
  background-color: #6a11cb;
  color: white;
  border: none;
  padding: 10px 25px;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.vote-button:hover {
  background-color: #5a0db1;
  transform: translateY(-2px);
}

.voted-indicator {
  background-color: #6a11cb;
  color: white;
  padding: 8px 20px;
  border-radius: 5px;
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
}

@media (max-width: 768px) {
  .vote-box {
    flex-direction: column;
  }
  
  .vote-option {
    width: 100%;
  }
  
  .versus {
    transform: rotate(90deg);
  }
}
</style>
