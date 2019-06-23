import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      /*
      路由的名字，和组件名没关系，就是path的别名
      好处就是，加入你的path是/x/x/x，我们跳转的时候就可以
      $router.push('/x/x/x)
      $router.push({ name:'xxx' })
      @表示src的目录 绝对路径的别名
      */
      name: 'home',
      path: '/',
      component: () => import('@/views/home')
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'layout',
      path: '/layout',
      component: () => import('@/views/layout')
    }

  ]
})
