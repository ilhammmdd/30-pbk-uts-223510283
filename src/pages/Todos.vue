<template>
    <div class="container" :class="{ 'fadeIn': fadeIn, 'fadeOut': fadeOut }">
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
      const savedActivities = localStorage.getItem('activities');
      if (savedActivities) {
        this.activities = JSON.parse(savedActivities);
      }
    },
    watch: {
      activities: {
        handler: function (activities) {
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
      }
    }
  };
  </script>