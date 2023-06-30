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
<!-- $store.state.a.a.a.a.a.a -->
