<script setup lang="ts">
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";
const counterStore = useCounterStore();
const { count } = storeToRefs(counterStore);
const { increment, resetCounter } = counterStore;
</script>

<template>
  <div class="counter">
    <h1>This is the counter page</h1>
    <h2>Current count is {{ count }}</h2>
    <button @click="increment">+1</button>
    <button @click="resetCounter">Reset</button>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .counter {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
