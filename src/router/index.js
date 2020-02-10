import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login/index.vue'

Vue.use(Router)
//引入布局组件
import Layout from "@/views/Layout/index"

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'home',
      // component: Home
      hidden:true,
      redirect:"login",
      meta:{
        name:"主页"
      },
    },
    {
      path: '/login',
      name: 'Login',
      hidden:true,
      meta:{
        name:"登录"
      },
      // component: Login
      component: () => import('../views/Login/index.vue')
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    // },
    /**
     * 控制台
     */
    {
      path: '/console',
      name: 'Console',
      redirect:"index",
      meta:{
        name:"控制台",
        icon:"console",
      },
      // component: () => import('../views/Layout/index.vue'),
      component: Layout,
      // children:[
      //   {
      //     path: '/index',
      //     name: 'Index',
      //     meta:{
      //       name:"首页"
      //     },
      //     component: () => import('../views/Console/index.vue')
      //   }
      // ]
    },
    /**
     * 信息管理
     */
    {
      path: '/index',
      name: 'Index',
      meta:{
        name:"信息管理",
        icon:"info",
      },
      // component: () => import('../views/Layout/index.vue'),
      component: Layout,
      children:[
        {
          path: '/infoIndex',
          name: 'InfoIndex',
          meta:{
            name:"信息列表"
          },
          component: () => import('../views/Info/index.vue')
        },
        {
          path: '/infoCategory',
          name: 'InfoCategory',
          meta:{
            name:"信息分类"
          },
          component: () => import('../views/Info/category.vue')
        },
      ]
    },
    /**
     * 用户管理
     */
    {
      path: '/user',
      name: 'User',
      meta:{
        name:"用户管理",
        icon:"user",
      },
      // component: () => import('../views/Layout/index.vue'),
      component: Layout,
      children:[
        {
          path: '/userIndex',
          name: 'UserIndex',
          meta:{
            name:"用户列表"
          },
          component: () => import('../views/User/index.vue')
        }
      ]
    }
  ]
})
