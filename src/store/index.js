/*
Vuex容器：集中式状态管理
这里的数据和组件无关
  读取：在任何组件汇总都可以通过this.$store.state.xxx来访问容器中的数据
       state中的数据也是响应式的，数据改变驱动视图更新
  修改：不要直接在组件中使用this.$store.state.xxx=xxx修改容器数据
      正确修改方式：
      1.在容器中定义motations函数
      2.在组件中提交motation完成对状态的修改
*/
// 1.安装vuex
// 2.配置
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
// 3. 创建容器对象
const store = new Vuex.Store({
  // state中存储容器中的数据，类似于组件中的data
  // 函数自己定义，函数默认接收一个参数state，也就是容器中的state
  state: {
    user: JSON.parse(window.localStorage.getItem('user_info'))
  },
  // mutation类似于组件中的methods
  mutations: {
    changeUser(state, data) {
      // 修改容器中的用户信息
      // console.log('changeuser', data)
      // 把data中的数据成员拷贝到state.user中
      Object.assign(state.user, data)
      // 把修改后的用户信息保存到本地存储
      window.localStorage.setItem('user_info', JSON.stringify(state.user))
    }
  }
})
// 4.导出容器对象
export default store
/* 5. 在main.js中引入store
 import store from 'store'
 new Vue({
   ...
   store
   ...
 })
*/
