import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Home from '@/components/Home'
import MovieDetail from '@/components/MovieDetail'

Vue.use(Router)
Vue.use(Vuetify)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/page/1'
    },
    {
      path: '/page/:id',
      component: Home
    },
    {
      path: '/movie/:id',
      component: MovieDetail
    }
  ]
})
