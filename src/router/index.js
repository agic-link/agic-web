import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PrivacyPolicy from '../components/PrivacyPolicy.vue'
import HomeBody from "@/components/HomeBody";
import Orders from "@/components/Orders";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/',
                name: 'HomeBody',
                component: HomeBody
            },
            {
                path: '/Orders',
                name: 'Orders',
                component: Orders
            }
        ]
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
