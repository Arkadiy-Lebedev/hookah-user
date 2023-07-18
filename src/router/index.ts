import { createRouter, createWebHistory } from 'vue-router'
// @ts-ignore
import MainLayout from '@/layout/MainLayout.vue'
// @ts-ignore
import PageHoll from '@/views/PageHoll.vue'
import Products from '@/views/Products.vue'
import Categories from '@/views/Categories.vue'
import Auth from '@/views/Auth.vue'
import Sale from '@/views/Sale.vue'
import { useUserStore } from '../stores/userStore'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainLayout,
      children: [
        {
          path: '/',
          name: 'holl',
          component: PageHoll,
          meta: {
            needAuth: true
          }
        },
        {
          path: '/categories',
          name: 'categories',
          component: Categories
        },
        {
          path: '/categories/:id',
          name: 'products',
          component: Products
        },
        {
          path: '/sale',
          name: 'sale',
          component: Sale
        },
      ]
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    }   
  ]
})

router.beforeEach((to, from) => {
  const userStore = useUserStore();
  if (to.meta.needAuth && !userStore.userInfo.id) {
    return { name: "auth" }
  }
})

export default router
