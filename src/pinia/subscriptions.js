export function addSubscription(subscriptions, callback) {
  // 添加订阅
  subscriptions.push(callback);
  const removeSubcription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
    }
  };
  return removeSubcription;
}
export function triggerSubscriptions(subscriptions, ...args) {
  // 触发订阅
  subscriptions.slice().forEach((cb) => cb(...args));
}
