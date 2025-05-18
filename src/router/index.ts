import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/todos'
    },
    {
      path: '/todos',
      name: 'todos',
      component: () => import('../views/TodoList.vue'),
      children: [
        {
          path: ':id',
          name: 'todo-details',
          component: () => import('../views/TodoDetails.vue'),
        },
      ]
    },
  ],
})

export default router
