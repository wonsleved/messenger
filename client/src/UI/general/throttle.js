export function throttle(func, time) {
  let lastCall;
  let timer;

  return function (args) {
    let now = Date.now();
    let bindThis = this;

    const funcToCall = () => {
      timer = null;
      func.call(bindThis, args);
    }

    if (!lastCall || (now - lastCall) > time) {
      lastCall = now;
      func(args);
    } else if (!timer) {
      timer = setTimeout(funcToCall, time);
    }


  }
}