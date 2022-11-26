<script setup lang="ts">
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";
import { storeToRefs } from "pinia";

const newTodo = ref("");
const todoStore = useTodoStore();
const { todos } = storeToRefs(todoStore);
const onAddNewTodo = () => {
  todoStore.addTodo(newTodo.value);
  newTodo.value = "";
};
const onDeleteTodo = (todoIdToDelete: string) => {
  todoStore.deleteTodo(todoIdToDelete);
};
</script>
<template>
  <div class="flex flex-col items-center py-4">
    <h1 class="text-2xl mb-2 text-[#00bd7e] font-medium">
      Welcome to the Todo page
    </h1>
    <h2 class="text-xl mb-2">What you need to do?</h2>
    <div class="px-2 py-1 flex items-end mb-8">
      <input
        v-model="newTodo"
        class="text-gray-800 py-2 px-2 focus:outline-none text-lg rounded-l-lg text-ellipsis min-w-[320px]"
        type="text"
        name="todo"
        id="todo"
        placeholder="e.g. add e2e tests"
        :class="newTodo === '' ? 'italic' : 'bold'"
      />
      <button
        class="bg-[#34485e] py-2 px-2 font-bold text-white text-lg rounded-r-lg hover:bg-[#00bd7e] transition-colors uppercase"
        @click="onAddNewTodo"
      >
        Add
      </button>
    </div>
    <h2 class="text-xl mb-2">Todo List</h2>
    <ul class="w-full flex flex-col gap-2">
      <li
        class="border-[#00bd7e] border-2 py-2 px-4 rounded-lg text-white flex items-center justify-between transition-all duration-300 bg-gradient-to-r from-slate-800 to-[#34485e]"
        v-for="todo in todos"
        :class="todo.isDone ? 'border-[#00bd7e]' : 'border-[#ebebeba3]'"
        :key="todo.id"
      >
        <div class="flex gap-2">
          <input
            type="checkbox"
            name="todoDone"
            id="todoDone"
            :checked="todo.isDone"
            @change="todo.isDone = !todo.isDone"
          />
          <span :class="todo.isDone ? 'line-through' : ''">
            {{ todo.text }}
          </span>
        </div>
        <button
          class="hover:font-bold transition-all"
          @click="onDeleteTodo(todo.id)"
        >
          DELETE
        </button>
      </li>
    </ul>
  </div>
</template>
