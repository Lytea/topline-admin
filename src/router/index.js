import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    // {
    //   /*
    //   路由的名字，和组件名没关系，就是path的别名
    //   好处就是，加入你的path是/x/x/x，我们跳转的时候就可以
    //   $router.push('/x/x/x)
    //   $router.push({ name:'xxx' })
    //   @表示src的目录 绝对路径的别名
    //   */
    //   name: 'home',
    //   path: '/',
    //   component: () => import('@/views/home')
    // },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '',
          component: () => import('@/views/home')
        },
        {
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        }
      ]
    }
  ]
})
/*
所有路由导航都要经过这里
to去哪儿
from来自哪里
next允许通行
*/
router.beforeEach((to,from,next) => {
  const userInfo = window.localStorage.getItem('user_info')
  // 如果是非/login页面，判断其登录状态
  // console.log(to)
  if (to.name !== 'login') {
    if (!userInfo) {
      // 如果没有登录，让其跳转到登录页面
      next({name: 'login'})
    }else {
      // 如果登录了，就可以通过
      next()
    }
  }else {
    // 如果登录了就访问登录页
    // 如果没有登录才允许访问
    if (userInfo) {
      next(false)           
    }else {
      next()
    }
  }
})

export default router
