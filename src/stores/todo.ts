import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";

type Todo = {
  id: string;
  text: string;
  isDone: boolean;
};
enum TodoFilter {
  All = "all",
  Done = "done",
  Pending = "pending",
}

export const useTodoStore = defineStore("todo", {
  state: () => ({
    todos: [] as Todo[],
    filter: TodoFilter.All,
  }),
  getters: {
    doneTodos(state): Todo[] {
      return state.todos.filter((todo) => todo.isDone);
    },
    pendingTodos(state): Todo[] {
      return state.todos.filter((todo) => !todo.isDone);
    },
    filteredTodos(): Todo[] {
      if (this.filter === TodoFilter.Done) {
        return this.doneTodos;
      }
      if (this.filter === TodoFilter.Pending) {
        return this.pendingTodos;
      }
      return this.todos;
    },
  },
  actions: {
    addTodo(text: string) {
      this.todos.push({ text, id: uuidv4(), isDone: false });
    },
    deleteTodo(todoIdToDelete: string) {
      this.todos = this.todos.filter((todo) => {
        return todo.id !== todoIdToDelete;
      });
    },
  },
});
