import { createRouter, createWebHistory } from "vue-router";


const routes = [
   {
      path: '/',
      redirect: 'login',
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('@/page/login/index.vue')
   },
   {
      path: "/home",
      component: () => import('@/page/home/index.vue'),
      redirect: '/welcome',
      children: [
         { path: '/welcome', component: () => import('@/page/welcome/index.vue') },
         { path: '/users', component: () => import('@/page/users/index.vue') },
         { path: '/goods', component: () => import('@/page/goods/index.vue'), },
         { path: '/goods/add', component: () => import('@/page/goods/addGood/index.vue') },
         { path: '/params', component: () => import('@/page/params/index.vue') },
         { path: '/categories', component: () => import('@/page/categories/index.vue') },
         { path: '/reports', component: () => import('@/page/reports/index.vue') },
         { path: '/rights', component: () => import('@/page/rights/index.vue') },
         { path: '/roles', component: () => import('@/page/roles/index.vue') },
         { path: '/orders', component: () => import('@/page/orders/index.vue') },
      ]
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

router.beforeEach((to, from, next) => {
   if (to.path === '/login') return next()
   if (!window.sessionStorage.getItem('token')) {
      return next('/login')
   }
   next()
})


export default router;
