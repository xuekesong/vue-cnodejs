import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/views/Index'
Vue.use(Router)

//require.ensure 是webpack 特有的，已经被import取代，用来设置 code-split point
//require.ensure(dependencies: String[], callback: function(require), chunkName: String)
//dependencies: 在所有的回调函数的代码被执行前将所有需要用到的模块进行声明
//callback: 当所有依赖都加载完成后执行，require 对象的实现会作为一个参数传递给这个回调函数
//chunkName: 提供给这个特定的 require.ensure() 的 chunk 的名称
const Home = resolve => {
  require.ensure(['../views/Index.vue'], () => {
    resolve(require('../views/Index.vue'));
  })
}

const List = resolve => {
  require.ensure(['../views/List.vue'], () => {
    resolve(require('../views/List.vue'));
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/add',
      name: 'add',
      component(resolve) {
        require.ensure(['../views/Add.vue'], () => {
          resolve(require('../views/Add.vue'))
        })
      }
    },
    {
      path: '/message',
      name: 'message',
      component(resolve) {
        require.ensure(['../views/Message.vue'], () => {
          resolve(require('../views/Message.vue'))
        })
      }
    },
    {
      path: '/topic/:id',
      name: 'topic',
      component(resolve) {
        require.ensure(['../views/Topic.vue'], () => {
          resolve(require('../views/Topic.vue'))
        })
      }
    },
    {
      path: '/about',
      name: 'about',
      component(resolve) {
        require.ensure(['../views/About.vue'], () => {
          resolve(require('../views/About.vue'))
        })
      }
    },
    {
      path: '/user/:loginname',
      name: 'user',
      component(resolve) {
        require.ensure(['../views/User.vue'], () => {
          resolve(require('../views/User.vue'));
        });
      }
    },
    {
      path: '/login',
      name: 'login',
      component(resolve) {
        require.ensure(['../views/Login.vue'], () => {
          resolve(require('../views/Login.vue'));
        });
      }
    },
    {
      path: '*',
      component: Home
    }
  ]
})
