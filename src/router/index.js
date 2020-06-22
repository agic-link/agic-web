import Vue from 'vue'
import Router from 'vue-router'

const Home =resolve => require(['@/views/home'], resolve);
const My =resolve => require(['@/views/my'], resolve);
const HomeA =resolve => require(['@/views/homeA'], resolve);


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HomeA',
      component: HomeA,
      meta: {
        notHead: true
      }
    },
    {
      path: '/my',
      name: 'My',
      component: My
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
