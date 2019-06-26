import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'

// 配置axios的基础路由
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
// 往Vue原型对象中添加成员，尽量使用$起名字
Vue.prototype.$http = axios
Vue.use(ElementUI)
Vue.config.productionTip = false
/*
请求拦截器
*/
axios.interceptors.request.use(config => {
  const userInfo = JSON.parse(window.localStorage.getItem('user_info'))
  // 登陆了才给那些需要token的接口统一添加token令牌
  // 登录接口不需要添加token令牌
  if (userInfo) {
    config.headers.Authorization = `Bearer ${userInfo.token}`
  }
  // 允许通过
  return config
}, error => {
  return Promise.reject(error)
})
/*
响应拦截器
*/
axios.interceptors.response.use(response => {
  console.log(response)
  // >=200 && <400的状态码进入这里
  return response.data.data
}, error => {
  // >=400的状态码会到这里
  console.dir(error)
  const status = error.response.status
  if (status === 401) {
    // 务必删除本地存储的用户信息数据
    window.localStorage.removeItem('user_info')
    // 跳转到登录页面
    router.push({
      name: 'login'
    })
  }
  return Promise.reject(error)
})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
