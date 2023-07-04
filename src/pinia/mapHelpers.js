// export default {
//   computed:{
// 	...mapState(useCounterStore,['count']), // 状态
//     ...mapState(useCounterStore,{ // 映射
//       myCount1:'count',
//       myCount2:(store)=> store.count
//     }),
//     ...mapState(useCounterStore,['doubleCount']) // getters
//   }
// }

export function mapState(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper)
    ? keysOrMapper.reduce((reduced, key) => {
        // 数组的写法
        reduced[key] = function () {
          return useStore()[key]
        }
        return reduced
      }, {})
    : Object.keys(keysOrMapper).reduce((reduced, key) => {
        // 对象的写法
        reduced[key] = function () {
          const store = useStore()
          const storeKey = keysOrMapper[key] // 获取store中的值

          // 对象中函数的写法
          return typeof storeKey === "function"
            ? storeKey.call(this, store)
            : store[storeKey]
        }
        return reduced
      }, {})
}

export const mapGetters = mapState

// export default {
//   computed:{
//     ...mapWritableState(useCounterStore,['count']),
//     ...mapState(useCounterStore,['doubleCount'])
//   },
//   methods:{
//     ...mapActions(useCounterStore,['increment']),
//     ...mapActions(useCounterStore,{myIncrement:'increment'})
//   },
// }
export function mapActions(useStore, keysOrMapper) {
  return Array.isArray(keysOrMapper)
    ? keysOrMapper.reduce((reduced, key) => {
        reduced[key] = function (...args) {
          return useStore()[key](...args)
        }
        return reduced
      }, {})
    : Object.keys(keysOrMapper).reduce((reduced, key) => {
        // @ts-expect-error
        reduced[key] = function (...args) {
          return useStore()[keysOrMapper[key]](...args)
        }
        return reduced
      }, {})
}
