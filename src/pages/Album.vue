<template>
  <div class="album-details-container">
    <h2 class="title">Album</h2>
    <select v-model="selectedAlbum" @change="selectAlbum" class="select-album">
      <option disabled value="">Choose Album</option>
      <option v-for="album in albums" :key="album.id" :value="album.id">{{ album.id }} - {{ album.title }}</option>
    </select>
    <h2 class="title">(ID: {{ selectedAlbum }})</h2>
    <div v-if="photos.length" class="photos-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" class="thumbnail" alt="Thumbnail">
        <p class="photo-title">{{ photo.title }}</p>
      </div>
    </div>
    <div v-else class="no-photos">
      <p>No photos available</p>
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

const footerHover = () => {
  const footer = document.querySelector('.footer');
  footer.classList.toggle('footerHover');
};
</script>

<style scoped>
.album-details-container {
  font-family: 'Arial', sans-serif;
  max-width: 1000px;
  margin: 50px auto;
  padding: 40px;
  border-radius: 20px;
  background-color: #393939;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-position: center;
}

.title {
  color: #f1c40f;
  text-align: center;
  font-weight: bold;
  font-size: 2.5rem;
  margin-bottom: 30px;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.select-album {
  width: 100%;
  padding: 15px;
  margin-bottom: 30px;
  border: 2px solid #cccccc;
  border-radius: 15px;
  background-color: #333333;
  font-size: 1rem;
  color: #ffffff;
  transition: border-color 0.3s, background-color 0.3s, color 0.3s;
}

.select-album:focus {
  border-color: #2980b9;
  outline: none;
  background-color: #444444;
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 25px;
  margin-top: 30px;
}

.photo-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #333333;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.thumbnail {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #3498db;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.3s, border-color 0.3s;
}

.thumbnail:hover {
  transform: scale(1.1);
  border-color: #2980b9;
}

.photo-title {
  margin-top: 10px;
  font-size: 0.9rem;
  text-align: center;
  color: #ffffff;
}

.no-photos {
  text-align: center;
  margin-top: 30px;
}

.no-photos p {
  font-size: 1.2rem;
  color: #e74c3c;
  text-shadow: 0 0 1px #000;
}

.footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 15px 0;
  background-color: #2c3e50;
  color: #ecf0f1;
  transition: background-color 0.5s ease;
}

.footer.footerHover {
  background-color: #3498db;
  color: white;
}

.footer:hover {
  cursor: pointer;
}
</style>
