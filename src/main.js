import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'

// 配置axios的基础路由
axios.default.baseURL='http://ttapi.research.itcast.cn/mp/v1_0/'

// 往Vue原型对象中添加成员，尽量使用$起名字
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
