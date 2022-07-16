import {createRouter, createWebHashHistory} from 'vue-router'
import Home from "@/Home";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'it',
        meta: {title: "实施组日报"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/IT.vue')
      },
      {
        path: '/yuding',
        name: 'yuding',
        meta: {title: "预订部日报"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/YuDing.vue')
      },
      {
        path: '/about',
        name: 'about',
        meta: {title: "关于"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
      },
      {
        path: '/charty',
        name: 'charty',
        meta: {title: "预订部当日数据"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "chart" */ '../views/ChartYudingView.vue')
      },
      {
        path: '/chart',
        name: 'chart',
        meta: {title: "实施组当日数据"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "chart" */ '../views/ChartView.vue')
      },
      {
        path: '/record',
        name: 'record',
        meta: {title: "实施组呼损回访"},
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "chart" */ '../views/RecordItView.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
