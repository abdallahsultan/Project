
require('./bootstrap');

window.Vue = require('vue');

import VueRouter from 'vue-router';
Vue.use(VueRouter);

import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);

import ProfileComponent from './components/ProfileComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';

const routes = [
  {
      name: 'profile',
      path: '/profile',
      component: ProfileComponent
  },
  {
      name: 'dashboard',
      path: '/dashboard',
      component: DashboardComponent
  }
];

const router = new VueRouter({ 
   routes: routes
  });
  const app = new Vue({
    el:"#app",
    router
  });