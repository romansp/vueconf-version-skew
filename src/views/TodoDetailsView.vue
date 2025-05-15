<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { todoApi } from '@/api/todoApi'
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const router = useRouter()
const route = useRoute()

const todoId = computed(() => parseInt(route.params.id as string))
const { data: todo, isLoading } = useQuery({
  queryKey: ['todo', todoId],
  queryFn: () => todoApi.getTodoById(todoId.value)
})

</script>

<template>
  <div class="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
    <div v-if="isLoading" class="text-center text-gray-500">Loading...</div>
    <div v-else>
      <h1 class="text-2xl font-bold text-gray-800 mb-4">Todo Details</h1>
      <div class="mb-6">
        <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
        <p
          id="title"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800 shadow-sm sm:text-sm"
        >
          {{ todo?.title }}
        </p>
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Status</label>
        <div class="mt-1 p-2 bg-gray-100 rounded-md text-gray-800">
          {{ todo?.completed ? 'Completed' : 'Not Completed' }}
        </div>
      </div>
      <div class="flex justify-end gap-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          @click="router.push({ name: 'todos' })"
        >
          Back to List
        </button>
      </div>
    </div>
  </div>
</template>
