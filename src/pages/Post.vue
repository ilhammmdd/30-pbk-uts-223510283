<template>
  <div class="user-post-container">
    <div class="user-selection">
      <h1>User</h1>
      <div class="select-container">
        <select v-model="selectedUser">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
      </div>
      <h1>Select User : {{ selectedUser }}</h1>
    </div>

    <div class="post-section">
      <h1>Post</h1>
      <ol>
        <li v-for="(post, index) in posts" :key="post.id" class="post-item">
          <span>{{ users.find((user) => user.id === post.userId).name }}</span> -
          <b>{{ post.title }}</b> - {{ post.body }}
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';

const users = ref([]);
const posts = ref([]);
const selectedUser = ref(null);

async function fetchUsers() {
  const url = 'https://jsonplaceholder.typicode.com/users';
  const response = await fetch(url);
  users.value = await response.json();
}

async function fetchPosts(userId) {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await fetch(url);
  const fetchedPosts = await response.json();
  posts.value = fetchedPosts.sort((a, b) => a.id - b.id);
}

fetchUsers();

watchEffect(() => {
  if (selectedUser.value) {
    fetchPosts(selectedUser.value);
  }
});
</script>

<style scoped>
h1 {
  text-align: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #ffffff;
}

.user-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #2c2c2c;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  text-align: center;
  margin-top: 40px;
}

.user-selection {
  margin-bottom: 10px;
  background-color: #393939;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.select-container {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}

select {
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #cccccc;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  background-color: #555555;
  color: #ffffff;
  transition: background-color 0.3s, color 0.3s;
}

select:hover {
  background-color: #777777;
  color: #ffffff;
}

.post-section {
  text-align: left;
  background-color: #393939;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.post-section h1 {
  text-align: center;
  margin-top: 0;
  color: #ffffff;
}

ol {
  list-style-type: none;
  padding: 0;
}

.post-item {
  background-color: #4f4f4f;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  color: #ffffff;
}

.post-item span {
  font-size: 18px;
  color: #d9d9d9;
}

.post-item b {
  font-size: 20px;
  color: #f4ce14;
  margin-bottom: 5px;
}
</style>
