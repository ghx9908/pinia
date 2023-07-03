import { inject, hasInjectionContext } from "vue"
import { piniaSymbol } from "./rootStore/piniaSymbol"

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
    const pinia = hasContext && inject(piniaSymbol)
    // 如果该store尚未创建
    if (!pinia._s.has(id)) {
      // 根据情况创建store
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
