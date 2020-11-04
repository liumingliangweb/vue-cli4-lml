import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: process.env.BASE_URL, // 如果你是 history模式 需要配置此项
    scrollBehavior: () => ({ y: 0 }), // 路由改变，页面回到顶部
    routes: constantRouterMap // 对应的路由数据
  })

const router = createRouter()
// 导航守卫-全局前置守卫
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
  next()
  // next(false) 中断当前导航
  // next('/') 跳转到相应路由
})

// router.beforeResolve((to, from, next) => {
//   /* 必须调用 `next` */
//   next()
// })
// 全局后置钩子
router.afterEach((to, from) => {
  // 页面跳转后的操作
})
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
