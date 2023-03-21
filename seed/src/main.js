import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import ordernum from './js/ordernum.js';
import intervaltime from './js/intervaltime.js';
import gettime from './js/gettime.js';
// import VueResource from 'vue-resource';
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from 'axios';
import VueAxios from 'vue-axios';
axios.defaults.headers.get["Content-type"] = "application/json"
Vue.use(ElementUI);
// Vue.use(VueResource);
Vue.use(VueAxios, axios);
// Vue.use(VueAxios);
// Vue.use(axios);
// Vue.config.globalProperties.$axios = axios;
Vue.prototype.$ordernum = ordernum
Vue.prototype.$intervaltime = intervaltime
Vue.prototype.$gettime = gettime
Vue.prototype.$axios= axios 
axios.defaults.baseURL = '/api'
axios.defaults.withCredentials=true;
Vue.config.productionTip = false

import Identify from "./components/Identify.vue"
Vue.component(Identify.name, Identify)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
