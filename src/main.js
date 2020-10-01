import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBfeTvwNimtCYo3CO1t2zp9Q0vY5Q7-Ggs"
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
