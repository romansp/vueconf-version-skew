<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { todoApi } from '@/api/todoApi'
import { RouterLink } from 'vue-router'

const { data: todos, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: todoApi.getTodos
})
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <h1 class="text-3xl font-bold text-gray-800 mb-6">Todo List</h1>

    <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500">Error: {{ error }}</div>
    <div v-else class="space-y-4">
      <div
        v-for="todo in todos"
        :key="todo.id"
        class="flex items-center gap-4 p-4 border-b border-gray-200 hover:bg-gray-50 rounded-md"
      >
        <input
          type="checkbox"
          :checked="todo.completed"
          disabled
          class="form-checkbox h-5 w-5 text-green-500"
        >
        <RouterLink
          :to="{ name: 'todo-details', params: { id: todo.id } }"
          class="text-lg text-blue-600 hover:underline"
        >
          {{ todo.title }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
