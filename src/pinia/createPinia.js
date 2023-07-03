import { ref, effectScope } from "vue"
import { piniaSymbol } from "./rootStore"
export function createPinia() {
  const scope = effectScope()
  // 整个应用的状态稍后defineStore的时候 就会在这里增加状态
  const state = scope.run(() => ref({}))
  const pinia = {
    install(app) {
      pinia._a = app // 当前应用
      // 1.在当前应用中暴露pinia实例
      app.provide(piniaSymbol, pinia)
      // 2.optionsAPI可以通过this访问到实例
      app.config.globalProperties.$pinia = pinia
    },
    state,
    use() {
      //  使用插件
    },
    _a: null,
    _e: scope, // 当前作用域
    _s: new Map(), // 记录有哪些store的
  }
  return pinia
}
