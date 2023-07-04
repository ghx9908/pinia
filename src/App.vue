<template>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increment">++</button>
  <button @click="decrement">--</button>
  <button @click="reset">重置</button>
</template>

<script setup>
import { storeToRefs } from "./pinia"
// import { storeToRefs } from "pinia"
import { useCounterStore } from "./stores/counter"
const store = useCounterStore()
const { increment, decrement } = store
const { count, double } = storeToRefs(store)

function reset() {
  store.$reset()
}
</script>

<style scoped></style>
