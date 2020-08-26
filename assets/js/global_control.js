const Throttle = (func, limit) => {
  let throttling;
  return function() {
    const args = arguments;
    const context = this;
    if (!throttling) {
      func.apply(context, args);
      throttling = true;
      setTimeout(() => throttling = false, limit);
    }
  };
};
const Debounce = (func, delay) => {
  let debouncing;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(debouncing);
    debouncing = setTimeout(() => func.apply(context, args), delay);
  };
};