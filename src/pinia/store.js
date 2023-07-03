import {
  inject,
  hasInjectionContext,
  effectScope,
  toRefs,
  computed,
  reactive,
} from "vue"
import { piniaSymbol } from "./rootStore"

// id + options
// options ={id:''}
// id + setup

// 定义一个 store 并导出 useStore 函数
// useStore 函数的作用是:
// - 看是否有pinia实例
// - 如果该store尚未创建,则创建
// - 取出已创建的store返回

export function defineStore(idOrOptions, setup, setupOptions = {}) {
  // id从字符串或配置对象中提取
  let id
  let options
  const isSetupStore = typeof setup === "function"
  // 根据情况分别设置id和options
  if (typeof idOrOptions === "string") {
    id = idOrOptions
    options = isSetupStore ? setupOptions : setup
  } else {
    options = idOrOptions
    id = idOrOptions.id
  }
  // 定义useStore函数
  function useStore() {
    // 判断是否存在pinia上下文环境
    const hasContext = hasInjectionContext()
    // 从context中读取 pinia 实例
    // 只能在组件中使用
    const pinia = hasContext && inject(piniaSymbol)
    // 如果该store尚未创建
    if (!pinia._s.has(id)) {
      // 根据情况创建store,存储到_s中
      if (isSetupStore) {
        // createSetupStore(id, setup, pinia)
      } else {
        createOptionStore(id, options, pinia)
      }
    }
    // 取出已创建的store返回
    const store = pinia._s.get(id)
    return store
  }
  // 给函数绑定store的id
  useStore.$id = id
  // 返回useStore函数
  return useStore
}

// optionsapi
function createOptionStore(id, options, pinia) {
  const store = reactive({}) //创建响应式的store
  let scope
  function wrapAction(action) {
    return function (...args) {
      let result = action.call(store, ...args)
      return result
    }
  }
  const { state, getters = {}, actions = {} } = options
  function setup() {
    // 根据用户的状态将其保存到pinia中
    pinia.state.value[id] = state ? state() : {}
    const localState = pinia.state.value[id]
    return Object.assign(localState, actions)
  }
  //划分父子作用域
  const setupStore = pinia._e.run(() => {
    scope = effectScope()
    return scope.run(() => setup())
  })
  for (let key in setupStore) {
    const v = setupStore[key]
    if (typeof v === "function") {
      setupStore[key] = wrapAction(v)
    }
  }

  Object.assign(store, setupStore)
  console.log("store=>", store)
  pinia._s.set(id, store)
}
