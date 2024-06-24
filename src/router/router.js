// router/index.js

import { createRouter, createWebHistory } from 'vue-router';
import Post from '../pages/Post.vue';
import Todos from '../pages/Todos.vue';
import Album from '../pages/Album.vue';

const routes = [
  {
    path: '/post',
    name: 'Post',
    component: Post,
  },
  {
    path: '/todos',
    name: 'Todos',
    component: Todos,
  },
  {
    path: '/album',
    name: 'Albums',
    component: Album,
  },
  {
    path: '/album/:id', 
    name: 'AlbumDetail',
    component: Album,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
