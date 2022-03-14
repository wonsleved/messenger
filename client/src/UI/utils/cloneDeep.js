export default (function() {
  function copyArr(arr) {
    let newArr = [];

    for (let item of arr)
      newArr.push(clone(item));

    return newArr;
  }

  function copyObj(obj) {
    let newObj = {};
    const keys = Object.getOwnPropertyDescriptors(obj);


    for (let key in keys) {
      Object.defineProperty(newObj, key, {
        ...keys[key],
        value: clone(obj[key])
      });
    }

    const symbolKeys = Object.getOwnPropertySymbols(obj);
    for (let key of symbolKeys) {
      const descriptor = Object.getOwnPropertyDescriptor(obj, key);

      Object.defineProperty(newObj, key, {
        ...descriptor,
        value: clone(obj[key])
      });
    }

    return newObj;
  }

  return function clone(element) {
    if (element === null)
      return null;
    else if (element === undefined)
      return undefined;
    else if (Array.isArray(element))
      return copyArr(element);
    else if (typeof element === 'object')
      return copyObj(element);
    else
      return element;
  }
})();