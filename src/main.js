import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import 'nprogress/nprogress.css'
import axios from 'axios'
// 引入第三方处理大数字的包
import JSONbig from 'json-bigint'

// 配置axios的基础路由
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0/'
axios.defaults.baseURL = 'http://toutiao.course.itcast.cn/mp/v1_0/'
// 使用JSONbig处理数据中超出范围javascript安全整数范围的数字
// JSONbig自己会分析数据中哪个数字超出使用范围了
// 由于后端的数据id超出了javascript的安全整数范围，会导致整数无法精确表示
// 可以使用json-big来处理，它会把超出范围的数字给处理好
// JSONbig.parse类似于JSON.parse都要把JSON格式字符串转换成javascript对象
// 如果data不是一个JSON格式字符串，它在转换时会出错
// 例如我们执行删除操作，后端返回一个204状态码，但是没有返回任何数据，也就是空字符串
// 那这里JSONbig.parse(空字符串)就报错了,
// 报错之后就不会执行后续代码，就进入不到响应拦截器里面，也就接收不到数据
axios.defaults.transformResponse = [function(data) {
  // data是未经处理的后端响应数据：json格式字符串
  try {
    // data数据可能不是标准的JSON格式字符串，
    // 否则会导致JSONbig.parse(data)转换失败报错
    return JSONbig.parse(data)
  } catch (err) {
    // 无法转换的数据直接原样返回
    return data
  }
}]
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
  // console.log(response)
  // >=200 && <400的状态码进入这里
  // 后端返回的数据会有对象格式的，也有不是对象格式的所以要严谨处理
  if (typeof response.data === 'object' && response.data.data) {
    // 如果返回的数据类型是对象并且这个对象中也有data这个成员
    return response.data.data
  } else {
    // 否则就直接返回data
    return response.data
  }
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
