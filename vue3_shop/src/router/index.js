import { createRouter, createWebHistory } from "vue-router";
import Home from '../components/home/index.vue'
import Welcome from '../components/welcome/index.vue'

const routes = [
   {
      path: '/',
      redirect: 'login',
   },
   {
      path: '/login',
      name: 'Login',
      component: () => import('../components/login/index.vue') 
   },
   {
      path: "/home",
      component:  () => import('../components/home/index.vue') ,
      redirect: '/welcome',
      children: [
         { path: '/welcome', component: () => import('../components/welcome/index.vue') },
         { path: '/users', component: () => import('../components/users/index.vue') },
         { path: '/goods', component: () => import('../components/goods/index.vue') },
         { path: '/orders', component: () => import('../components/orders/index.vue') },
         { path: '/categories', component: () => import('../components/categories/index.vue') },
         { path: '/params', component: () => import('../components/params/index.vue') },
         { path: '/reports', component: () => import('../components/reports/index.vue') },
         { path: '/rights', component: () => import('../components/rights/index.vue') },
         { path: '/roles', component: () => import('../components/roles/index.vue') },
      ]
   }
];

const router = createRouter({
   history: createWebHistory(),
   routes
});

export default router;
