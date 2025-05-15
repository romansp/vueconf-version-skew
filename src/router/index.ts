import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'

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
      component: TodoListView,
    },
    {
      path: '/todos/:id',
      name: 'todo-details',
      component: () => import('../views/TodoDetailsView.vue'),
    },
  ],
})

export default router
