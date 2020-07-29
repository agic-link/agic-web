import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './util/rem.js'
import i18n from './i18n/i18n.js'

Vue.config.productionTip = false

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app')
