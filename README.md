# Pinia 的实现

## 特性

- 支持创建 optionsStore
- 支持创建 setupStore
- 实现了若干核心方法
  - `$patch`:使用$patch 方法同时应用多个修改
  - `$reset`: 使用$reset() 方法将 state 重置为初始值
  - `$subscribe`: 通过 store 的 $subscribe() 方法侦听 state 及其变化
  - `$onActions`: 通过 store.$onAction() 来监听 action 和它们的结果
  - `$dispose`: 停止响应
  - `$state`: 替换 state，通过变更 pinia 实例的 state 来设置整个应用的初始 state
- 实现了核心方法 **$state**
- Plugin 插件实现
- storeToRefs 方法的实现
- 支持 mapState、mapGetter、mapActions

## Pinia 的优势

极其轻巧，完整的 Typescript 支持；

去除 mutations，只有 state，getters，actions（支持同步和异步）

没有模块嵌套，只有 store 的概念，store 之间可以自由使用

支持 Vue devtools

## vuex vs pinia

- pinia 直接用 ts 来编写的，类型提示友好 vuex4 是为了 vue3 来服务的 vuex3 是为 vue2 服务的 （vuex4 只是简单了改了一下 vuex3 让它支持了 vue3）， vue3 的开发配合 pinia 更好一些

- vuex mutation 和 （action?） 的区别
  - component -> dispatch(action) 公共的异步逻辑 ??? -> commit(mutation)
  - component -> commit(mutation)
- pinia 中直接就通过 action 来操作状态即可

- vuex optionsApi 辅助方法 (mapGetters mapMutation, createNameSpaceHelpers)this
- pinia 支持 compositionApi 可以不再通过 this 了

- vuex 模块的概念 modules : {namespaced:true} 树结构, 操作数据调用的时候太长. 命名冲突问题
- vuex 是单例的 ， pinia 用的多个，每个功能一个 store。 不用担心命名冲突问题 ， 不再有嵌套问题
- pinia 支持 devtool，也支持 optionsApi
