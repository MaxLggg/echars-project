import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Login from "../view/login/Index.vue";
import Home from "../view/home/Index.vue";
const routes: RouteRecordRaw[] = [
  { path: '/login', name: 'Login', component: Login, meta: { name: '登录页' } },
  { path: '/home', name: 'Home', component: Home, meta: { name: '首页' } },
  {
    path: '/bigScreen',
    name: 'BigScreen',
    component: () => import("../view/bigScreen/Index.vue"),
    meta: { name: '大屏展示' }
  },
  // {
  //   path: '/businessOperationReport',
  //   name: 'BusinessOperationReport',
  //   component: () => import("../view/businessOperationReport/Index.vue"),
  //   meta: { name: '商务运营报表' }
  // },
  {
    path: '/recruitReport',
    name: 'RecruitReport',
    component: () => import("../view/recruitReport/Index.vue"),
    meta: { name: '招聘数据看板' }
  },
  // {
  //   path: '/projectReport',
  //   name: 'ProjectReport',
  //   component: () => import("../view/projectReport/Index.vue"),
  //   meta: { name: '项目项目报表' }
  // },
  // {
  //   path: '/financeReport',
  //   name: 'FinanceReport',
  //   component: () => import("../view/financeReport/Index.vue"),
  //   meta: { name: '财务小屏报表' }
  // },
  // {
  //   path: '/hrReport',
  //   name: 'HrReport',
  //   component: () => import("../view/hrReport/Index.vue"),
  //   meta: { name: '人资小屏报表' }
  // },
  // {
  //   path: '/userList',
  //   name: 'UserList',
  //   component: () => import("../view/userList/Index.vue"),
  //   meta: { name: '用户管理' }
  // },
  // {
  //   path: '/layout',
  //   name: 'Layout',
  //   component: () => import("../view/layout/Index.vue"),
  //   meta: { name: '布局' }
  // },
]

const router = createRouter({
  // history 模式 这里使用createWebHistory
  history: createWebHashHistory(),
  // 传递路由映射表
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next("/login");
  } else {
    next()
  }
})

export default router;