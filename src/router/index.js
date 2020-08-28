import Vue from 'vue'
import VueRouter from 'vue-router'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'
import HomeBody from "@/components/HomeBody";
import Orders from "@/components/Orders";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomeBody
    },
    {
        path: '/PrivacyPolicy',
        name: 'PrivacyPolicy',
        component: PrivacyPolicy
    },
    {
        path: '/HomeBody',
        name: 'HomeBody',
        component: HomeBody
    },
    {
        path: '/Orders',
        name: 'Orders',
        component: Orders
    }

]

const router = new VueRouter({
    routes
})

export default router
