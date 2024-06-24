<template>
  <div class="album-details-container">
    <p class="title">Album</p>
    <div class="album-select">
      <select v-model="selectedAlbum" @change="selectAlbum" class="select-album">
        <option disabled value="">Select Album</option>
        <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.title }}</option>
      </select>
    </div>
    <div v-if="selectedAlbum" class="album-info">
      <h2 class="title">ID: {{ selectedAlbum }}</h2>
      <div v-if="photos.length" class="photos-grid">
        <div v-for="photo in photos" :key="photo.id" class="photo-item">
          <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail" alt="Thumbnail">
          <p class="photo-title">{{ photo.title }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAlbumStore } from '../stores/AlbumStore';

const router = useRouter();
const selectedAlbum = ref(null);
const albums = ref([]);
const photos = ref([]);

const albumStore = useAlbumStore();

const fetchAlbum = async () => {
  try {
    await albumStore.fetchAlbum();
    albums.value = albumStore.album;
  } catch (error) {
    console.error('Error fetching albums:', error);
  }
};

const fetchPhoto = async (albumId) => {
  try {
    await albumStore.fetchPhoto(albumId);
    photos.value = albumStore.photo;
  } catch (error) {
    console.error('Error fetching photos:', error);
  }
};

const selectAlbum = () => {
  if (selectedAlbum.value) {
    fetchPhoto(selectedAlbum.value);
    router.push({ name: 'AlbumDetail', params: { id: selectedAlbum.value } });
  }
};

const showPhoto = (url) => {
  window.open(url, '_blank');
};

onMounted(() => {
  fetchAlbum();
});

watch(selectedAlbum, (newAlbum) => {
  if (newAlbum) {
    fetchPhoto(newAlbum);
  }
});
</script>

<style scoped>
.album-details-container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 10px;
  background-color: #7D7C7C;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.title {
  color: #191717;
  font-family: sans-serif;
  font-size: 2rem;
  margin-bottom: 20px;
}

.album-select {
  margin-bottom: 20px;
}

.select-album {
  width: 100%;
  padding: 12px;
  border: 2px solid white;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 1rem;
  color: #555555;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

.select-album:focus {
  border-color: #191717;
  outline: none;
}

.album-info {
  margin-top: 20px;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.photo-item {
  background-color: #ffffff;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-out;
}

.photo-item:hover {
  transform: translateY(-5px);
}

.thumbnail {
  width: 100%;
  height: auto;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.thumbnail:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.photo-title {
  margin-top: 8px;
  font-size: 0.9rem;
  color: #555555;
}
</style>
