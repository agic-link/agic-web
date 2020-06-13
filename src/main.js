import Vue from 'vue'
import ElementUI from 'element-ui';
/**
 * 全局样式
 */
import './assets/styles/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
/**
 * 入口组件
 */
import App from './App.vue';
/**
 * 路由
 */
import router from './router';
/**
 * 数据仓库
 */
import store from './store';
/**
 * 自定义指令
 */
import './directive';
/**
 * 自定义过滤器
 */
import './filter';
/**
 * 权限管理
 */
import Permission from './lib/permission';
/**
 * 日记管理
 */
import Log from './lib/log';
/**
 * 日记管理
 */
import Perf from './lib/perf';
/**
 * web3引入
 */
const Web3 = require( 'web3' );

Vue.use(ElementUI);
Vue.use(Permission, store);
Vue.use(Log, {
  url: '',
  delay: 30000,
  enable: false,
});
Vue.use(Perf, false);

Vue.prototype.$web3 = new Web3();

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
