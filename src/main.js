import { createApp } from 'vue';

import { Quasar } from 'quasar';
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import './assets/main.css'
import App from './App.vue';

import router from './router/router.js';

import { createPinia } from 'pinia';


const myApp = createApp(App);
const pinia = createPinia();

myApp.use(Quasar, {
  plugins: {}, 
});

myApp.use(pinia);
myApp.use(router);

myApp.mount('#app');