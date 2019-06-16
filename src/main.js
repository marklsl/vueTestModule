// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import ElementUI from 'element-ui' //新添加
import 'element-ui/lib/theme-chalk/index.css' //新添加
import VueX from 'vuex'
import * as Vue2Leaflet from 'vue2-leaflet'
import App from './App'
import router from './router'
import store from './store/store.js';
import 'leaflet/dist/leaflet.css';
import $ from 'jquery';

// 引用axios，并设置基础URL为后端服务api地址
let axios = require('axios')
axios.defaults.baseURL = 'http://localhost:8081/demo'
// 将API方法绑定到全局
Vue.prototype.$axios = axios

Vue.config.productionTip = false

Vue.use(VueX);
Vue.use(ElementUI);
Vue.use(Vue2Leaflet);

/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
