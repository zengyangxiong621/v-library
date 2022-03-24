/**
 * 
 * @param {*} arr 过滤的数组
 * @param {*} val 过滤的值
 * @param {*} field 字段名
 * @returns 
 */
const find = (arr,val,field='name') =>{
  const temArr = Array.isArray(arr) ? arr : arr.value
  return temArr.find(item => {
    return item[field] === val
  })
}

export {
  find
}