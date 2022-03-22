const find = (arr,name) =>{
  const temArr = Array.isArray(arr) ? arr : arr.value
  return temArr.find(item => {
    return item.name === name
  })
}

export {
  find
}