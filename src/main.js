import { createApp } from "vue"
import "./style.css"
import App from "./App.vue"
// import { createPinia } from "./pinia"
import piniaPluginPersistedstate from "pinia-plugin-persistedstate"
import { createPinia } from "pinia"
const app = createApp(App)
const pinia = createPinia()
// function plugin({ store }) {
//   let id = store.$id
//   console.log("store=>", store, store.$id)
//   // ... 我要拿到所有的状态， 替换掉默认状态
//   let state = JSON.parse(localStorage.getItem(id))
//   if (state) {
//     store.$state = state
//   }
//   store.$subscribe(({ storeId }, state) => {
//     // 每个插件都会执行订阅操作
//     localStorage.setItem(storeId, JSON.stringify(state))
//   })
// }

// pinia.use(plugin)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.mount("#app")
