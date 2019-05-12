

import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';

import request from './libs/http';
import store from './store';

Vue.use(request)

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  
  render: h => h(App),
  router,
  store
}).$mount('#app');