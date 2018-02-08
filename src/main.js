import Vue from 'vue';
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/reset.css';

import App from './App.vue';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
