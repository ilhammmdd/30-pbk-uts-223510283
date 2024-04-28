<template>
<div class="wrapper">
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
    <label>
      <input type="checkbox" v-model="showOnlyIncomplete" />
      Show Unfinished Tasks
    </label>
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
      fadeOut: false
    };
  },
  created() {
    // Load activities from localStorage when the component is created
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      this.activities = JSON.parse(savedActivities);
    }
  },
  watch: {
    // Save activities to localStorage whenever it changes
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
        
        // Tambahkan animasi fadeIn
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
        
        // Tambahkan animasi fadeOut
        this.fadeOut = true;
        setTimeout(() => {
          this.fadeOut = false;
        }, 1000);
      }
    },
    toggleCompletion(activity) {
      activity.completed = !activity.completed;
      
      // Tambahkan animasi saat toggle
      const span = document.querySelector('.container');
      span.classList.add('animate');
      setTimeout(() => {
        span.classList.remove('animate');
      }, 1000);
    },
    footerHover() {
      // Tambahkan animasi pada footer
      const footer = document.querySelector('.footer');
      footer.classList.add('footerHover');
      setTimeout(() => {
        footer.classList.remove('footerHover');
      }, 500);
    }
  }
};
</script>
