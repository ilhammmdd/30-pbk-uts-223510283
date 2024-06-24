import { defineStore } from 'pinia';

export const useAlbumStore = defineStore('albums', {
  state: () => ({
    album: [],
    photo: [],
  }),
  actions: {
    async fetchAlbum() {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/albums');
        if (!response.ok) {
          throw new Error('Failed');
        }
        this.album = await response.json();
      } catch (error) {
        console.error('Error, tidak dapat mengambil album', error);
      }
    },
    async fetchPhoto(albumId) {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`);
        if (!response.ok) {
          throw new Error('Failed');
        }
        this.photo = await response.json();
      } catch (error) {
        console.error('Error, tidak dapat mengambil foto', error);
      }
    }
  }
});
