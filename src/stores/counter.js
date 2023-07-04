// stores/counter.js
import { defineStore } from "../pinia"
import { ref, computed } from "vue"
// export const useCounterStore = defineStore("counter", {
//   state: () => {
//     return { count: 0 }
//   },

//   actions: {
//     increment() {
//       this.count++
//     },
//     decrement() {
//       this.count--
//     },
//   },
//   getters: {
//     double() {
//       return this.count * 2
//     },
//   },
// })

export const useCounterStore = defineStore("counter", () => {
  const count = ref(0)
  function increment() {
    count.value++
  }
  function decrement() {
    count.value--
  }
  const double = computed(() => {
    return count.value * 2
  })
  return { count, increment, decrement, double }
})
