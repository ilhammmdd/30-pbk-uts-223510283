<template>
  <div class="wrapper">
    <nav class="navbar">
      <button @click="selectedMenu = 'todos'">TODOS</button>
      <button @click="selectedMenu = 'post'">POST</button>
    </nav>
    <div v-show="selectedMenu == 'todos'">
      <Todos />
    </div>
    <div v-show="selectedMenu == 'post'">
      <Posts />
    </div>
    <footer class="footer" @mouseover="footerHover">
      ILHAM | 2024 | Universitas Islam Riau
    </footer>
  </div>
</template>

<script>
import Todos from './components/Todos.vue';
import Posts from './components/Post.vue';

export default {
  components: {
    Todos,
    Posts
  },
  data() {
    return {
      selectedMenu: 'todos'
    };
  },
  methods: {
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