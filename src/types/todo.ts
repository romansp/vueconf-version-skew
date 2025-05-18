export interface TodoList {
  todos: Todo[]
}
export interface Todo {
  id: number
  userId: number
  todo: string
  // description: string
  completed: boolean
}
