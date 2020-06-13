import Vue from 'vue'
import Router from 'vue-router'

const Home =resolve => require(['@/views/home'], resolve);
const My =resolve => require(['@/views/my'], resolve);


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/my',
      name: 'My',
      component: My
    }
  ]
})
