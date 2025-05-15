import axios from 'axios'
import type { Todo } from '@/types/todo'

const API_BASE_URL = 'https://jsonplaceholder.typicode.com'

export const todoApi = {
  async getTodos() {
    const { data } = await axios.get<Todo[]>(`${API_BASE_URL}/todos`)
    return data
  },

  async getTodoById(id: number) {
    const { data } = await axios.get<Todo>(`${API_BASE_URL}/todos/${id}`)
    return data
  },
}
