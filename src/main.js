import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './util/rem.js'
import i18n from './i18n/i18n.js'
import axios from 'axios'
const instance = axios.create({
    headers: {
        'content-type': 'application/json;charset=UTF-8',
    },
    timeout: 5000,
    withCredentials: true
})

import VueAxios from 'vue-axios'
Vue.use(VueAxios, instance)

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
