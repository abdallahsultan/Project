
require('./bootstrap');

window.Vue = require('vue');

////vue router
import VueRouter from 'vue-router';
Vue.use(VueRouter);


////axios
import VueAxios from 'vue-axios';
import axios from 'axios';
Vue.use(VueAxios, axios);
import { Form, HasError, AlertError } from 'vform';

////progress bar
import VueProgressBar from 'vue-progressbar';
const options = {
  color: '#bffaf3',
  failedColor: '#874b4b',
  thickness: '5px',
  transition: {
    speed: '0.2s',
    opacity: '0.6s',
    termination: 300
  },
  autoRevert: true,
  location: 'top',
  inverse: false
}
Vue.use(VueProgressBar, options)


///sweatalert 
import Swal from 'sweetalert2'
window.Swal =Swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
window.Toast=Toast;
import ProfileComponent from './components/ProfileComponent.vue';
import DashboardComponent from './components/DashboardComponent.vue';
import UserComponent from './components/UserComponent.vue';




window.Form = Form;
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
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
  },
  {
      name: 'user',
      path: '/user',
      component: UserComponent
  }
];
Vue.filter('upText',function(text){
  return text.toUpperCase();
});
////fire
window.Fire = new Vue(); 
const router = new VueRouter({ 
   routes: routes
  });
  const app = new Vue({
    el:"#app",
    router
  });