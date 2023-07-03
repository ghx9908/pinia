// stores/counter.js
import { defineStore } from "../pinia"

export const useCounterStore = defineStore("counter", {
  state: () => {
    return { count: 0 }
  },

  actions: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
  getters: {
    double() {
      return this.count * 2
    },
  },
})
