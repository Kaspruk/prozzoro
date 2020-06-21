import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from "./config/plugins/vuetify";
import './assets/main.sass'

import setPrototypes from "./config/prototypes";
import setFilters from "./config/filters";

setPrototypes(Vue);
setFilters(Vue);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
