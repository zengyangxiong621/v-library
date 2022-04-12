/**
 *
 * @param {*} arr 过滤的数组
 * @param {*} val 过滤的值
 * @param {*} field 字段名
 * @returns
 */
const find = (arr, val, field = "name") => {
  const temArr = Array.isArray(arr) ? arr : arr.value;
  return temArr.find((item) => {
    return item[field] === val;
  });
};

/**
 * 节流
 * @param {*} fn
 * @param {*} delay 延迟
 * @returns
 */
const debounce = (fn, delay = 200) => {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer); // 因为防抖是最后一次才执行，所以只要timer存在就清除定时器重新赋值
    timer = setTimeout(() => {
      fn.apply(this, arguments);
      timer = null;
    }, delay);
  };
};

export { find, debounce };
