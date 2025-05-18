import type { Todo } from '@/types/todo'

const DEFAULT_TODOS: Todo[] = [
  {
    id: 1,
    completed: true,
    todo: "Write a blog post",
    userId: 1,
  },
  {
    id: 2,
    completed: false,
    todo: "Go to Vueconf US 2025",
    userId: 1,
  },
  {
    id: 3,
    completed: false,
    todo: "Contribute to open source",
    userId: 1,
  },
  {
    id: 4,
    completed: false,
    todo: "Go to the movies",
    userId: 1,
  }
];

function getTodosFromLocalStorage(): Todo[] {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : DEFAULT_TODOS;
}

function saveTodosToLocalStorage(todos: Todo[]): void {
  localStorage.setItem('todos', JSON.stringify(todos));
}

export const todoApi = {
  getTodos() {
    const todos = getTodosFromLocalStorage();
    return Promise.resolve(todos);
  },

  getTodoById(id: number) {
    const todos = getTodosFromLocalStorage();
    const todo = todos.find(t => t.id === id)!;
    return Promise.resolve(todo);
  },

  updateTodoById(id: number, updatedTodo: Todo) {
    const todos = getTodosFromLocalStorage();
    const index = todos.findIndex(t => t.id === id);
    if (index !== -1) {
      todos.splice(index, 1, updatedTodo);
      saveTodosToLocalStorage(todos);
    }
    return Promise.resolve();
  }
};
