<template>
  <h1>{{ counter.count }}</h1>
  <h1>{{ counter.double }}</h1>
  <button @click="increment">++</button>
  <button @click="decrement">--</button>
</template>

<script setup>
import { useCounterStore } from "./stores/counter"
const { increment, decrement } = useCounterStore()
const counter = useCounterStore()
</script>

<style scoped></style>
