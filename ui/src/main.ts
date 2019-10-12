import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import BootstrapVue from 'bootstrap-vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faOpencart } from '@fortawesome/free-brands-svg-icons';
import { faPlusSquare, faMinusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import axios from 'axios';
import VueAxios from 'vue-axios';

library.add(faOpencart, faPlusSquare, faMinusSquare);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(BootstrapVue);
Vue.use(VueAxios, axios);

export default new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
