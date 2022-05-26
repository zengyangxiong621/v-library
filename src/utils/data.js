/**
 * 获取组件数据
 * @param {*} componentData 当前画布组件的数据集合
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} componentFilters 当前画布所有的过滤器信息
 * @param {*} dataContainerDataList 当前画布的所有数据容器数据
 * @returns 
 */
const getComDataWithFilters = (componentData, componentConfig, componentFilters,dataContainerDataList) => {
  const dataFrom = componentConfig.dataFrom || 0
  let resData = null
  let currentData = null
  if (dataFrom === 0) {
    currentData = componentData[componentConfig.id]
  } else {
    currentData = setDataContainerResult(componentConfig,dataContainerDataList)
  }
  if (currentData) {
    // 如果使用数据过滤器，则需要过滤数据
    if (componentConfig.useFilter && componentConfig.filters) {
      resData = dataFilterHandler(currentData, componentConfig, componentFilters)
    } else {
      resData = currentData
    }
  }
  return resData
}

/**
 * 数据使用数据过滤器过滤
 * @param {*} data 当前组件的数据
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} componentFilters 当前画布所有的过滤器信息
 * @returns 过滤后的数据
 */
const dataFilterHandler = (data, componentConfig, componentFilters) => {
  const filters = componentConfig.filters.map(item => {
    const filterDetail = componentFilters.find(jtem => jtem.id === item.id)
    return {
      ...filterDetail,
      enable: item.enable,
    }
  }).filter(item => item.enable)
  if(filters.length){
    try {
      const functions = filters.map(item => {
        return (new Function('data', item.content))
      })
      const resultArr = []
      functions.forEach((fn, index) => {
        if (index === 0) {
          resultArr.push(fn(data))
        } else {
          resultArr.push(fn(resultArr[index - 1]))
        }
      })
      return resultArr[resultArr.length - 1]
    } catch (e) {
      console.error(e)
      return {}
    }
  }else{
    return data
  }
  
}

/**
 * 获取组件数据容器的数据
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} dataContainerDataList 当前画布的所有数据容器数据
 * @returns 
 */
const setDataContainerResult = (componentConfig,dataContainerDataList) => {
  if (componentConfig.dataContainers) {
    const dataContainerIds = componentConfig.dataContainers.map(item => item.id)
    return dataContainerDataList.reduce((pre, cur) => {
      if (dataContainerIds.includes(cur.id)) {
        pre.push(cur.data)
      }
      return pre
    }, [])
  }
}

export {
  getComDataWithFilters
}