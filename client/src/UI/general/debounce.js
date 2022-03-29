export function debounce(func, time, immediate) {
  let timeout;

  return function executedFunction() {
    const context = this;
    const args = arguments;

    const callLater = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(callLater, time);

    if (callNow)
      func.apply(context, args);
  };
}