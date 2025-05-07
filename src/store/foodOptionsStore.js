/* eslint-disable */
import { reactive } from 'vue';

// Estado inicial para las opciones de votación
let initialState = {
  comidas: [
    { name: 'Opción 1', image: '/placeholder.jpg', votes: 0 },
    { name: 'Opción 2', image: '/placeholder.jpg', votes: 0 }
  ],
  bebidas: [
    { name: 'Opción 1', image: '/placeholder.jpg', votes: 0 },
    { name: 'Opción 2', image: '/placeholder.jpg', votes: 0 }
  ],
  postres: [
    { name: 'Opción 1', image: '/placeholder.jpg', votes: 0 },
    { name: 'Opción 2', image: '/placeholder.jpg', votes: 0 }
  ]
};

// Intentar cargar opciones guardadas desde localStorage
const savedOptions = localStorage.getItem('votingOptions');
if (savedOptions) {
  try {
    const parsedOptions = JSON.parse(savedOptions);
    if (parsedOptions && typeof parsedOptions === 'object') {
      initialState = parsedOptions;
    }
  } catch (e) {
    console.error('Error al cargar opciones guardadas:', e);
  }
}

// Exportar el store de opciones
export const foodOptionsStore = initialState;

// Función para guardar el estado en localStorage
export const saveOptionsState = () => {
  localStorage.setItem('votingOptions', JSON.stringify(foodOptionsStore));
};

// Función para reiniciar todos los votos
export const resetAllVotes = () => {
  Object.keys(foodOptionsStore).forEach(category => {
    foodOptionsStore[category].forEach(option => {
      option.votes = 0;
    });
  });
  saveOptionsState();
  
  // También eliminar todos los registros de votos de usuarios
  const keys = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith('userVotes_')) {
      keys.push(key);
    }
  }
  keys.forEach(key => localStorage.removeItem(key));
};
