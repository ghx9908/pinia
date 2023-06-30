<template>
  <h1>{{ counter.count }}</h1>
  <h1>{{ counter.double }}</h1>
  <button @click="counter.increment">++</button>
  <button @click="counter.decrement">--</button>
</template>

<script setup>
import { useCounterStore } from "./stores/counter"
const counter = useCounterStore()
counter.count++
const a = 1
</script>

<style scoped></style>
