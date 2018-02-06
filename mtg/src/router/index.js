import Vue from 'vue'
import Router from 'vue-router'
import Vuetify from 'vuetify'
import Home from '@/components/Home'
import MovieDetail from '@/components/MovieDetail'
import New from '@/components/New'
import Query from '@/components/Query'

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
      name: 'page',
      component: Home
    },
    {
      path: '/movie/:id',
      name: 'movie',
      component: MovieDetail
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/category/:id',
      name: 'category',
      component: Query
    },
    {
      path: '/search/:name',
      name: 'name',
      component: Query
    }
  ]
})
