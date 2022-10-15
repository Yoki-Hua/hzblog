import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/Layout";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'chart',
        component: () => import('@/views/chart/Chart'),
        meta: { title: 'chart' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'write',
        name: 'write',
        component: () => import('@/views/article/Write'),
        meta: { title: 'write' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'list',
        name: 'articleList',
        component: () => import('@/views/article/List'),
        meta: { title: 'articleList' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'category',
        name: 'articleCategory',
        component: () => import('@/views/article/Category'),
        meta: { title: 'articleList' }
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'comment',
        name: 'articleComment',
        component: () => import('@/views/article/ArticleComment'),
        meta: { title: 'articleComment' }
      }
    ]
  },



]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
