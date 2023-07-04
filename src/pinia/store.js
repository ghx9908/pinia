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
        createSetupStore(id, setup, {}, pinia, true) // 创建setupStore
      } else {
        createOptionsStore(id, options, pinia, false) // 创建选项store
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
function createOptionsStore(id, options, pinia, isSetupStore) {
  let store
  const { state, getters = {}, actions = {} } = options
  function setup() {
    // 根据用户的状态将其保存到pinia中
    pinia.state.value[id] = state ? state() : {}
    const localState = toRefs(pinia.state.value[id])
    return Object.assign(
      localState,
      actions,
      Object.keys(getters).reduce((gettersObj, getterName) => {
        gettersObj[getterName] = computed(() => {
          return getters[getterName].call(store)
        })
        return gettersObj
      }, {})
    )
  }
  store = createSetupStore(id, setup, options, pinia, isSetupStore)
  return store
}

function createSetupStore($id, setup, options, pinia, isSetupStore) {
  let scope
  //处理action 修改this指向
  function wrapAction(name, action) {
    return function (...args) {
      let ret = action.call(store, ...args)
      return ret
    }
  }

  const $reset = !isSetupStore
    ? function $reset(store) {
        const { state } = options
        const newState = state ? state() : {}
        console.log("newState=>", newState)
        // we use a patch to group all changes into one single subscription
        // store.$patch(($state) => {
        //   Object.assign($state, newState)
        // })
      }
    : () => {
        throw new Error(
          `🍍: Store "${$id}" is built using the setup syntax and does not implement $reset().`
        )
      }
  const partialStore = {
    _p: pinia,
    // _s: scope,
    $id,
    $reset,
  }

  let store = reactive(partialStore)
  const setupStore = pinia._e.run(() => {
    scope = effectScope() // 需要开辟一个空间，来管理此store中的数据
    return scope.run(() => setup()) // 这个setup方法就是用来初始化store中的状态的
  })
  //overwrite existing actions to support $onAction
  for (const key in setupStore) {
    const prop = setupStore[key]

    if (typeof prop === "function") {
      // 对action进行一次包装
      setupStore[key] = wrapAction(key, prop)
    }
  }
  Object.assign(store, setupStore) // 合并选项
  pinia._s.set($id, store) // 放入到容器中
  return store
}
