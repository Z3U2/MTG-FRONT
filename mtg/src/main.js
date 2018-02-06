// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.prototype.$url1 = 'http://localhost:3000/movies/'
Vue.prototype.$url2 = 'http://localhost:3000/categories/'
Vue.prototype.$urlSettings = {
  method: 'GET',
  headers: {
    Accept: 'application/json'
  }
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
