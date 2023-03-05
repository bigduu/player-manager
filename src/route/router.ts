import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('../components/Layout.vue')
const Detail = () => import('../components/NodeDetail.vue')

const route_list = [
  { name: 'home', path: '/', component: Layout },
  { name: 'detail', path: '/detail/:name/:ip', component: Detail, props: true },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: route_list
})


export default router
