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
