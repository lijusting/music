import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import './assets/css/remove-default.scss'
import store from './store/index'
Vue.config.productionTip = false;
Vue.use(ElementUI)
import router from './router/index'
import './utils/rem'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
