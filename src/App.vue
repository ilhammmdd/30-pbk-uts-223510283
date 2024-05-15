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
<div class="wrapper">
  <nav class="navbar">
  <button @click="selectedMenu = 'todos'">TODOS</button>
  <button @click="selectedMenu = 'post'">POST</button>
</nav>

<div v-show="selectedMenu == 'todos'">
  <div class="container" :class="{ 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
    <h1>Plan Your Activity</h1>
    <table>
      <thead>
        <tr>
          <th>Activity</th>
          <th>List</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(activity, index) in filteredActivities" :key="activity.id">
          <td><button @click="toggleCompletion(activity)">
              {{ activity.completed ? 'No' : 'Yes' }}
            </button>
          </td>
          <td>
            <span :class="{ 'completed': activity.completed }">{{ activity.title }}</span>
          </td>
          <td>
            <span v-if="activity.completed" class="completed">Completed</span>
            <span v-else>Not Completed</span>
          </td>
          <td>
            <button @click="deleteActivity(activity)">Remove</button>
          </td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent="addActivity">
      <input v-model="newActivity" type="text" placeholder="Create New Task" />
      <button type="submit">Add</button>
    </form>
    <label class="checkbox-label">
      <input type="checkbox" v-model="showOnlyIncomplete" />
      Show Unfinished Tasks
    </label>
  </div>
  </div>


  <div v-show="selectedMenu == 'post'">
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
</div>


  <footer class="footer" @mouseover="footerHover">
    ILHAM | 2024 | Universitas Islam Riau
  </footer>
</template>


<script>
export default {
  data() {
    return {
      activities: [],
      newActivity: '',
      showOnlyIncomplete: false,
      fadeIn: false,
      fadeOut: false,
      selectedMenu: 'todos'
    };
  },
  created() {
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      this.activities = JSON.parse(savedActivities);
    }
  },
  watch: {
    activities: {
      handler: function(activities) {
        localStorage.setItem('activities', JSON.stringify(activities));
      },
      deep: true
    }
  },
  computed: {
    filteredActivities() {
      if (this.showOnlyIncomplete) {
        return this.activities.filter(activity => !activity.completed);
      }
      return this.activities;
    }
  },
  methods: {
    addActivity() {
      if (this.newActivity.trim() !== '') {
        const newId = this.activities.length > 0 ? this.activities[this.activities.length - 1].id + 1 : 1;
        this.activities.push({
          id: newId,
          title: this.newActivity,
          completed: false
        });
        this.newActivity = '';
        this.fadeIn = true;
        setTimeout(() => {
          this.fadeIn = false;
        }, 1000);
      }
    },
    deleteActivity(activity) {
      const index = this.activities.indexOf(activity);
      if (index !== -1) {
        this.activities.splice(index, 1);
        
       
        this.fadeOut = true;
        setTimeout(() => {
          this.fadeOut = false;
        }, 1000);
      }
    },
    toggleCompletion(activity) {
      activity.completed = !activity.completed;
      
      
      const span = document.querySelector('.container');
      span.classList.add('animate');
      setTimeout(() => {
        span.classList.remove('animate');
      }, 1000);
    },
    footerHover() {
      
      const footer = document.querySelector('.footer');
      footer.classList.add('footerHover');
      setTimeout(() => {
        footer.classList.remove('footerHover');
      }, 500);
    }
  }
};
</script>
