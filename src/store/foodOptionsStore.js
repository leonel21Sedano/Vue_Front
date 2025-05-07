import { reactive } from 'vue';

export const foodOptionsStore = reactive({
  comidas: [
    { id: 0, name: '', votes: 0, image: null },
    { id: 1, name: '', votes: 0, image: null }
  ],
  bebidas: [
    { id: 0, name: '', votes: 0, image: null },
    { id: 1, name: '', votes: 0, image: null }
  ],
  postres: [
    { id: 0, name: '', votes: 0, image: null },
    { id: 1, name: '', votes: 0, image: null }
  ]
});
