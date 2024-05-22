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

<template>
  <div>
    <h1 class="tulis">User</h1>
    <div style="display: flex; justify-content: center;">
      <select v-model="selectedUser" style="text-align: center;">
        <option v-for="user in users" :key="user.id" :value="user.id" style="text-align: center;">{{ user.name }}</option>
      </select>
    </div>
    <h1 class="tulis">Select User : {{ selectedUser }}</h1><br>
    <h1 class="tulis">Post</h1>
    <ol>
      <li v-for="(post, index) in posts" :key="post.id" class="tulis">
        <span>{{ }}</span> {{ users.find((user) => user.id === post.userId).name }} -
        <b>{{ post.title }}</b> - {{ post.body }}
      </li>
    </ol>
  </div>
</template>