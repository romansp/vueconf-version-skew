<script setup lang="ts">
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { todoApi } from '@/api/todoApi'
import { useRoute, useRouter } from 'vue-router'
import { computed, ref, watchEffect } from 'vue'
import type { Todo } from '@/types/todo'

const router = useRouter()
const route = useRoute()
const todoId = computed(() => parseInt(route.params.id as string))

const { data: todo, isLoading } = useQuery({
  queryKey: ['todos', todoId],
  queryFn: () => todoApi.getTodoById(todoId.value)
})

const todoModel = ref<Todo>();

watchEffect(() => {
  if (!todo.value) return undefined;
  todoModel.value = JSON.parse(JSON.stringify(todo.value)) as Todo;
})

const queryClient = useQueryClient()
const { mutate } = useMutation({
  mutationFn(todo: Todo) {
    return todoApi.updateTodoById(todo.id, todo);
  },
  onSuccess() {
   queryClient.invalidateQueries({ queryKey: ['todos']});
  }
})

function saveTodo(updated: Todo) {
  mutate(updated);
  router.push({ name: 'todos' })
}
</script>

<template>
  <div class="max-w-lg p-6 bg-white shadow-md rounded-lg">
    <div
      v-if="isLoading"
      class="text-center text-gray-500"
    >
      Loading...
    </div>
    <form
      v-else-if="todoModel"
      @submit.prevent
    >
      <h1 class="text-2xl font-bold text-gray-800 mb-4">
        Todo #{{ todo!.id }}
      </h1>
      <div class="mb-6">
        <label
          for="title"
          class="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          v-model="todoModel.todo"
          type="text"
          class="mt-1 block w-full rounded-md border border-gray-300 bg-gray-50 p-2 text-gray-800 shadow-sm sm:text-sm"
        >
      </div>
      <div class="mb-6 flex items-center">
        <input
          id="completed"
          v-model="todoModel.completed"
          type="checkbox"
          class="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        >
        <label
          for="completed"
          class="ml-2 block text-sm font-medium text-gray-700"
        >
          Completed
        </label>
      </div>
      <div class="flex gap-4">
        <button
          class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="submit"
          @click="saveTodo(todoModel)"
        >
          OK
        </button>
      </div>
    </form>
  </div>
</template>
