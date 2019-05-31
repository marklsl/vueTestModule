// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueX from 'vuex'
import * as Vue2Leaflet from 'vue2-leaflet'
import App from './App'
import router from './router'
import store from './store/store.js';
import 'leaflet/dist/leaflet.css';

Vue.config.productionTip = false
Vue.use(VueX);
Vue.use(Vue2Leaflet);
Vue.config.productionTip = false;

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
