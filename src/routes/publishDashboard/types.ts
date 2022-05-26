const MODULES = 'modules'

export const getLayerIds = (layers: any[]) => {
  let res: any = []
  const recursiveFn = (arr: any[]) => {
    for(let i=0,len=arr.length; i<len; i++) {
      const item = arr[i]
      if(!Object.hasOwn(item, MODULES)) {
        res.push(item.id)
      } else {
        recursiveFn(item[MODULES])
      }
    }
  }
  recursiveFn(layers)
  return res
}