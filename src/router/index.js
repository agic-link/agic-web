import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
]

const router = new VueRouter({
  routes
})

export default router
