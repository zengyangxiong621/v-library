import cloneDeep from "lodash/cloneDeep";

/**
 * 获取组件数据
 * @param {*} componentData 当前画布组件的数据集合
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} componentFilters 当前画布所有的过滤器信息
 * @param {*} dataContainerDataList 当前画布的所有数据容器数据
 * @param {*} dataContainerList 当前画布的所有数据容器集合
 * @param {*} callbackArgs 当前画布所有回调参数对象
 * @returns
 */
const getComDataWithFilters = (componentData, componentConfig, componentFilters, dataContainerDataList, dataContainerList, callbackArgs, layer = {}, crossCallback = {}) => {
  try {
    const dataFrom = componentConfig.dataFrom || 0;
    let resData = null;
    let currentData = null;
    if (dataFrom === 0) {
      currentData = cloneDeep(componentData[componentConfig.id]);
    } else {
      currentData = setDataContainerResult(componentConfig, dataContainerDataList, dataContainerList, componentFilters, callbackArgs);
    }

    if (currentData) {
      // 如果使用数据过滤器，则需要过滤数据
      if (componentConfig.useFilter && componentConfig.filters) {
        resData = dataFilterHandler(currentData, componentConfig, componentFilters, callbackArgs, crossCallback)
      } else {
        resData = currentData;
      }
    }
    return resData;
  } catch (e) {
    console.log(`报错图层: ${layer.id}-${layer.name}, 报错原因：1、查无组件Config`, e);
  }

};

/**
 * 数据使用数据过滤器过滤
 * @param {*} data 当前组件的数据
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} componentFilters 当前画布所有的过滤器信息
 * @param {*} callbackArgs 当前画布所有回调参数对象
 * @returns 过滤后的数据
 */
const dataFilterHandler = (data, componentConfig, componentFilters, callbackArgs, crossCallback={}) => {
  const filters = componentConfig.filters.map(item => {
    const filterDetail = componentFilters.find(jtem => jtem.id === item.id);
    return {
      ...filterDetail,
      enable: item.enable,
    };
  }).filter(item => item.enable);
  if (filters.length) {
    try {
      const functions = filters.map(item => {
        return (new Function('data', 'callbackArgs', 'crossCallback', item.content))
      })
      const resultArr = []
      functions.forEach((fn, index) => {
        const cbArgs = filters[index].callbackKeys.reduce((pre, item) => {
          return {
            ...pre,
            [item]: callbackArgs[item]
          };
        }, {});
        if (index === 0) {
          resultArr.push(fn(data, cbArgs, crossCallback))
        } else {
          resultArr.push(fn(resultArr[index - 1], cbArgs, crossCallback))
        }
      });
      return resultArr[resultArr.length - 1];
    } catch (e) {
      return []
    }
  } else {
    return data;
  }

};
// 数据容器数据过滤
const handleDataFilter = (data, allFilters, componentFilters, callbackArgs) => {
  const filters = allFilters.map(item => {
    const filterDetail = componentFilters.find(jtem => jtem.id === item.id);
    return {
      ...filterDetail,
      enable: item.enable,
    };
  }).filter(item => item.enable);
  if (filters.length === 0) {
    return data;
  }

  try {
    const functions = filters.map(item => {
      return (new Function("data", "callbackArgs", item.content));
    });
    const resultArr = [];
    functions.forEach((fn, index) => {
      const cbArgs = filters[index].callbackKeys.reduce((pre, item) => {
        return {
          ...pre,
          [item]: callbackArgs[item]
        };
      }, {});

      if (index === 0) {
        resultArr.push(fn(data, cbArgs));
      } else {
        resultArr.push(fn(resultArr[index - 1], cbArgs));
      }
    });
    return resultArr[resultArr.length - 1];
  } catch (e) {
    return [];
  }
};
/**
 * 获取组件数据容器的数据
 * @param {*} componentConfig 当前组件的配置信息
 * @param {*} dataContainerDataList 当前画布的所有数据容器数据
 * @param {*} dataContainerList 当前画布的所有数据容器集合
 * @param {*} componentFilters 当前画布的过滤器集合
 * @param {*} callbackArgs 当前画布所有回调参数对象
 * @returns
 */
const setDataContainerResult = (componentConfig, dataContainerDataList, dataContainerList, componentFilters, callbackArgs) => {
  if (componentConfig.dataContainers) {
    if (componentConfig.dataContainers.length === 1) {
      const id = componentConfig.dataContainers[0].id;
      const container = dataContainerList.find(item => item.id === id);
      let data = dataContainerDataList.find(item => item.id === id)?.data || [];
      if (container && container.useFilter) {
        data = handleDataFilter(data, container.filters, componentFilters, callbackArgs);
      }
      return data;
    }
    if (componentConfig.dataContainers.length > 1) {
      const dataContainerIds = componentConfig.dataContainers.map(item => item.id);
      return dataContainerDataList.reduce((pre, cur) => {
        if (dataContainerIds.includes(cur.id)) {
          const container = dataContainerList.find(item => item.id === cur.id);
          let data = cur.data;
          if (container.useFilter) {
            data = handleDataFilter(cur.data, container.filters, componentFilters, callbackArgs);
          }
          pre.push(data);
        }
        return pre;
      }, []);
    }
  }
  return [];
};

/**
 * 获取组件数据映射字段
 * @param {*} componentConfig 当前组件的配置信息
 * @returns
 */
const getFields = (componentConfig = {}) => {
  const dataType = componentConfig.dataType;
  let fields = null;
  if (dataType === "static" || !dataType) {
    fields = componentConfig.staticData?.fields || [];
  } else {
    if (componentConfig.dataConfig[dataType] && componentConfig.dataConfig[dataType].fields) {
      fields = componentConfig.dataConfig[dataType].fields;
    } else {
      fields = componentConfig.staticData.fields;
    }
  }
  return fields.map(item => item.value);

};

// 数组去重，取最后一个
const duplicateFn = (arr) => {
  let arrTemp = JSON.parse(JSON.stringify(arr));
  arrTemp = arrTemp.reverse();
  let map = new Map();
  for (let item of arrTemp) {
    if (!map.has(item.target)) {
      map.set(item.target, item);
    }
  }
  return [...map.values()];
};

const filterEmptyCallParam = (callParam) => {
  let arrTemp = JSON.parse(JSON.stringify(callParam));
  arrTemp = arrTemp.filter(param => !(!param.origin || !param.target));
  return arrTemp;
};

/**
 * 获取组件回调参数定义的数据
 * @param {*} componentCallbackArgs 组件回调参数
 * @param {*} currnetData 当前状态下组件的数据
 * @returns
 */
const getCallbackParams = (componentCallbackArgs, currnetData) => {
  if (!currnetData || Object.prototype.toString.call(currnetData) !== "[object Object]") {
    return {};
  }
  const result = {};
  // 过滤掉target或orgin为空的回调
  let filteredParams = filterEmptyCallParam(JSON.parse(JSON.stringify(componentCallbackArgs)));
  // 去重处理
  let comCallbackArgs = JSON.parse(JSON.stringify(filteredParams));
  // 给comCallbackArgs拥有相同变量的去重
  comCallbackArgs = duplicateFn(comCallbackArgs); // 后面覆盖前面
  console.log("componentCallbackArgs,currnetData", componentCallbackArgs, currnetData);
  componentCallbackArgs.forEach(item => {
    result[item.target] = currnetData[item.origin];
  });
  return result;
};

export {
  getComDataWithFilters,
  getFields,
  getCallbackParams,
};
