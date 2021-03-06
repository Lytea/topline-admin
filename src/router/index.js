import Vue from 'vue'
import Router from 'vue-router'
import nprogress from 'nprogress'
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
    { // 登录
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      name: 'layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        { // 首页
          name: 'home',
          path: '/',
          component: () => import('@/views/home')
        },
        { // 发布文章
          name: 'publish',
          path: '/publish',
          component: () => import('@/views/publish')
        },
        { // 编辑文章
          name: 'publish-edit',
          path: '/publish/:id',
          component: () => import('@/views/publish')
        },
        { // 文章列表
          name: 'article-list',
          path: '/articles',
          component: () => import('@/views/article')
        },
        { // 评论列表
          name: 'article-comment',
          path: '/comment',
          component: () => import('@/views/comment')
        },
        { // 账户设置
          name: 'account-setting',
          path: '/account',
          component: () => import('@/views/account')
        },
        { // 素材管理
          name: 'image',
          path: '/image',
          component: () => import('@/views/image')
        },
        { // 素材管理
          name: 'fans-overview',
          path: '/fans/overview',
          component: () => import('@/views/fans')
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
router.beforeEach((to, from, next) => {
  nprogress.start()
  const userInfo = window.localStorage.getItem('user_info')
  // 如果是非/login页面，判断其登录状态
  // console.log(to)
  if (to.name !== 'login') {
    if (!userInfo) {
      // 如果没有登录，让其跳转到登录页面
      next({ name: 'login' })
    } else {
      // 如果登录了，就可以通过
      next()
    }
  } else {
    // 如果登录了就访问登录页
    // 如果没有登录才允许访问
    if (userInfo) {
      next(false)
    } else {
      next()
    }
  }
})
/*
路由导航完成的时候回进入到这里
*/
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
