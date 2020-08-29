import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = {
  mode: 'history',
  routes: [
    {
      name: 'Main page',
      path: '/',
      component: () => import('@/view/Main')      
    }
  ]
}

export default new Router(routes)
