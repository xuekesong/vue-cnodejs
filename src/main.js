// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import store from './vuex/index'
import axios from 'axios'

import './assets/css/reset.min.css'
import './assets/css/iconfont/iconfont.css'
import './assets/css/github-markdown.css'

Vue.config.productionTip = false//阻止vue在启动时生成生产的提示
Vue.prototype.$http = axios;

//登陆中间验证，页面需要登录而没有登录的情况直接跳转登录
router.beforeEach((to, from ,next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.userInfo.userId) {
      next();
    } else {
      next({
        path: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})

new Vue({
  router,
  store
}).$mount('#app')//如果vue实例在实例化时没有收到el选项时，则它处于‘未挂载’状态，没有关联的DOM元素。 可以使用$mount() 手动的挂载一个未挂载的实例 
