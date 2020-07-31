import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Element from 'element-ui'
import enLocale from './en.js'
import zhLocale from './zh.js'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(VueI18n)
const i18n = new VueI18n({
    locale: localStorage.getItem('locale') || (navigator.language === 'zh-CN' ? 'zh' : 'en' || 'zh'),
    messages: {
        zh: zhLocale,
        en: enLocale
    },
})

Vue.use(Element, {
    i18n: (key, value) => i18n.t(key, value)
})

export default i18n