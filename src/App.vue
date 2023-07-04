<template>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increment">++</button>
  <button @click="decrement">--</button>
</template>

<script setup>
import { storeToRefs } from "./pinia"
import { useCounterStore } from "./stores/counter"
const store = useCounterStore()
const { increment, decrement } = store
const { count, double } = storeToRefs(store)
</script>

<style scoped></style>
