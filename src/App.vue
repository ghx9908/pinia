<template>
  <h1>{{ count }}</h1>
  <h1>{{ double }}</h1>
  <button @click="increment">++</button>
  <button @click="decrement">--</button>
  <button @click="reset">重置</button>
</template>

<script setup>
// import { storeToRefs } from "./pinia"
import { storeToRefs } from "pinia"
import { useCounterStore } from "./stores/counter"
const store = useCounterStore()
const { increment, decrement } = store
const { count, double } = storeToRefs(store)

function reset() {
  store.$reset()
}

// store.$subscribe((mutation, state) => {
//   console.log(mutation, state)
// })

// store.$onAction(({ after, onError, name }) => {
//   console.log("action running~~~", name)
//   after((result) => {
//     // action执行完毕后触发
//     console.log(result)
//   })
//   onError((err) => {
//     // action出错时调用
//     console.warn("error", err)
//   })
// })
</script>

<style scoped></style>
