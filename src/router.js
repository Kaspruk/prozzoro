import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './spa/Home'
import store from "./store";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/timers',
    name: 'timers',
    component: () => import(/* webpackChunkName: "timers" */ './spa/timers/Timers')
  },
  {
    path: '/create-timer',
    name: 'createTimer',
    component: () => import(/* webpackChunkName: "create-timer" */ './spa/timers/CreateTimer'),
    beforeEnter: (to, from, next) => {
      if(store.state.timers.length < 3) next();
      else next({name: 'timers'})
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
