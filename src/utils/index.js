
import {
  DIMENSION,
  HEIGHT,
  LEFT,
  TOP,
  WIDTH,
  COMPONENTS,
} from '../constant/home'

export function findLayerById (layer, id) {
  console.log(layer, 'findLayerById-----------------')
  let temp = null
  layer.forEach((item) => {
    if (item.id === id) {
      temp = item
      return temp
    }
    let t = null
    if (COMPONENTS in layer) {
      t = findLayerById(layer[COMPONENTS], id)
    }
    if (t) {
      temp = t
    }
  })
  return temp
}

export function selectMultiple (arr, ids) {
  const copyIds = deepClone(ids)
  let temp = []
  if (copyIds.length === 0) {
    return temp
  }
  arr.forEach((item) => {
    const index = copyIds.indexOf(item.id)
    if (index !== -1) {
      item.active = true
      temp.push(item)
      copyIds.splice(index, 1)
    } else {
      item.active = false
    }
    const t = selectMultiple(item[COMPONENTS], copyIds)
    if (t.length > 0) {
      temp = [...temp, ...t]
    }
  })
  return temp
}

export function groupMultipleComponents (arr, sourceIds, targetId) {
  targetId = targetId || sourceIds[sourceIds.length - 1]
  const group = {
    id: `temp-${ new Date().getTime() }`,
    parentId: '1-1-1',
    style: {
      width: 0,
      height: 0,
      cursor: 'move',
      background: '#c4cfeb',
    },
    displayName: '例子',
    className: 'draggable-item',
    active: false,
    // disabled: false,
    isGroup: true,
    position: {
      x: 0,
      y: 0,
    },
    components: [],
  }
  const groupFn = (arr, ids) => {
    for (let i = 0; i < arr.length; i++) {
      let temp = ids.indexOf(arr[i].id)
      if (temp !== -1) {
        group[COMPONENTS].push(arr[i])
        if (arr[i].id === targetId) {
          arr.splice(i--, 1, group)
        } else {
          arr.splice(i--, 1)
        }
        ids.splice(temp, 1)
      } else if (arr[i][COMPONENTS].length > 0) {
        groupFn(arr[i][COMPONENTS], ids)
      }
    }
  }
  groupFn(arr, sourceIds)
  const { position, style } = calcScalePosition(group[COMPONENTS])
  group.position = position
  group.style.width = style.width
  group.style.height = style.height
}

export function findNode (state, id) {
  let temp = false
  let node = state.find((item) => item.id === id)
  if (node) {
    return node
  }
  for (let i = 0; i < state.length; i++) {
    if (state[i][COMPONENTS].length > 0) {
      temp = findNode(state[i][COMPONENTS], id)
      if (temp) {
        return temp
      }
    }
  }
  return temp
}

export function findParentNode (state, ids) {
  let arr = []
  let id = ids.shift()
  let node = state.find((item) => item.id === id)
  arr.push(node)
  if (node?.isGroup && node[COMPONENTS].length > 0) {
    return arr.concat(findParentNode(node[COMPONENTS], ids))
  } else {
    return null
  }
}

// ['1-1', '1-1-1']
export function calculateGroupPosition (state) {
  state.reduce(
    (cur, next) => {
      if (next.parentId === '0') {
        return [[], []]
      }
      let [xPositionList, yPositionList] = cur
      next[COMPONENTS].forEach((component) => {
        const { x, y } = component.position
        const { width, height } = component.style
        xPositionList = xPositionList.concat([x, x + width])
        yPositionList = yPositionList.concat([y, y + height])
      })
      xPositionList.sort((a, b) => a - b)
      yPositionList.sort((a, b) => a - b)
      let minX = xPositionList[0]
      let minY = yPositionList[0]
      let maxX = xPositionList[xPositionList.length - 1]
      let maxY = yPositionList[yPositionList.length - 1]
      next.style.width = maxX - minX
      next.style.height = maxY - minY
      next.position.x = minX
      next.position.y = minY
      return [
        [minX, maxX],
        [minY, maxY],
      ]
    },
    [[], []],
  )
}

export function moveChildrenComponents (components, xMoveLength, yMoveLength) {
  components.forEach((component) => {
    component.position.x = component.position.x + xMoveLength
    component.position.y = component.position.y + yMoveLength
    if (component[COMPONENTS]?.length > 0) {
      moveChildrenComponents(component[COMPONENTS], xMoveLength, yMoveLength)
    }
  })
}

export function mergeComponentLayers (components, layers) {


  return []
}

// 深拷贝
export function deepClone (obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  const result = Array.isArray(obj) ? [] : {}
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      result[i] = typeof obj[i] === 'object' ? deepClone(obj[i]) : obj[i]
    }
  } else if (typeof obj === 'object') {
    Object.keys(obj).forEach((k) => {
      result[k] = typeof obj[k] === 'object' ? deepClone(obj[k]) : obj[k]
    })
  }
  return result
}

// 计算
export function calcScalePosition (arr) {
  let xPositionList = []
  let yPositionList = []
  arr.forEach((component) => {
    const { x, y } = component.position
    const { width, height } = component.style
    xPositionList = xPositionList.concat([x, x + width])
    yPositionList = yPositionList.concat([y, y + height])
  })
  xPositionList.sort((a, b) => a - b)
  yPositionList.sort((a, b) => a - b)
  let minX = xPositionList[0]
  let minY = yPositionList[0]
  let maxX = xPositionList[xPositionList.length - 1]
  let maxY = yPositionList[yPositionList.length - 1]
  return {
    position: {
      x: minX,
      y: minY,
    },
    style: {
      width: maxX - minX,
      height: maxY - minY,
    },
  }
}

// 改变子组件的位置
export function moveChildrenComponentsPosition (arr, xMoveLength, yMoveLength) {
  arr.forEach((item) => {
    item.position = {
      x: item.position.x + xMoveLength,
      y: item.position.y + yMoveLength,
    }
    if (item[COMPONENTS].length > 0 || item.isGroup) {
      moveChildrenComponentsPosition(item[COMPONENTS], xMoveLength, yMoveLength)
    }
  })
}

// 通过id数组查找相对应的ref
export function componentsFilter (componentRefList, ids) {
  const arr = []
  for (const refKeys in componentRefList) {
    if (ids.length === 0) {
      return arr
    }
    const index = ids.indexOf(refKeys)
    if (index !== -1) {
      arr.push(componentRefList[refKeys])
      ids.splice(index, 1)
    }
  }
}

/**
 * description:  成组
 */
export const group = (treeData, selectedNodes, lastRightClickKey) => {
  const treeDataCopy = deepClone(treeData)
  const newGroup = {
    id: `${ lastRightClickKey }-temp`,
    parentId: '1-1-1',
    style: {
      width: 0,
      height: 0,
      cursor: 'move',
      background: '#c4cfeb',
    },
    displayName: '例子',
    className: 'draggable-item',
    active: false,
    // disabled: false,
    isGroup: true,
    position: {
      x: 0,
      y: 0,
    },
    components: [],
  }
  let needPickItem = []
  const recursiveFn = (data, id, isDone) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if (item.id === id) {
        data.splice(i, 1)
        needPickItem.push(item)
        // 处理到最后一个节点了
        if (isDone) {
          newGroup[COMPONENTS] = needPickItem
          data.push(newGroup)
        }
        break
      } else if (item[COMPONENTS]) {
        recursiveFn(item[COMPONENTS], id, isDone)
      }
    }
  }
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    let isDone = false
    if (i === len - 1) {
      isDone = true
    }
    recursiveFn(treeDataCopy, selectedNodes[i], isDone)
  }
  return treeDataCopy
}

export function deleteComponents (arr, ids) {
}

// 插入
export function insertMultipleComponents (arr, sourceIds, targetId) {
  let sourceComponents = []

  function insertFn (arr, ids) {
    let length = arr.length
    for (let i = 0; i < length; i++) {
      if (ids.length === 0) {
        return
      }
      let temp = ids.indexOf(arr[i].id)
      if (temp !== -1) {
        sourceComponents.push(arr[i])
        if (arr[i].id === targetId) {
          arr.splice((i = +sourceComponents.length), 0, ...sourceComponents)
        } else {
          arr.splice(i--, 1)
        }
        ids.splice(temp, 1)
      } else if (arr[i][COMPONENTS].length > 0) {
        insertFn(arr[i][COMPONENTS], ids)
      }
    }
  }

  insertFn(arr, sourceIds)
}

// 数组扁平化
export const layerComponentsFlat = (arr) => {
  return arr.reduce((pre, cur) => {
    return pre.concat(
      cur.hasOwnProperty(COMPONENTS)
        ? layerComponentsFlat(cur[COMPONENTS])
        : cur.id,
    )
  }, [])
}

export function throttle (fn, delay) {
  let timer
  return function (...args) {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}


const judgeIsGroup = (value) => {
  return value.id.indexOf('group') !== -1
}

export const calcGroupPosition = (arr, components) => {
  let xPositionList = []
  let yPositionList = []
  arr.forEach((item) => {
    if (judgeIsGroup(item)) {
      if (COMPONENTS in item && item[COMPONENTS].length > 0) {
        const [xArr, yArr] = calcGroupPosition(item[COMPONENTS], components)
        xPositionList = xPositionList.concat(xArr)
        yPositionList = yPositionList.concat(yArr)
      }
    } else {
      let component = components.find((it) => it.id === item.id)
      if (component) {
        // const style_config = component.config.find((item: any) => item.name === STYLE)

        const style_dimension_config = component.config.find(
          (item) => item.name === DIMENSION,
        )
        if (style_dimension_config) {
          const config = {
            position: {
              x: 0,
              y: 0,
            },
            style: {
              width: 0,
              height: 0,
            },
          }
          Object.values(style_dimension_config.value).forEach((obj) => {
            if ([TOP, LEFT].includes(obj.name)) {
              config.position[obj.name === TOP ? 'y' : 'x'] = obj.value
            } else if ([WIDTH, HEIGHT].includes(obj.name)) {
              config.style[obj.name === WIDTH ? 'width' : 'height'] = obj.value
            }
          })
          xPositionList.push(config.position.x, config.position.x + config.style.width)
          yPositionList.push(config.position.y, config.position.y + config.style.height)
        }
      }
    }
  })
  return [xPositionList, yPositionList]
}

export const deepForEach = (layers, cb) => {
  layers.forEach((layer, index) => {
    cb(layer, index)
    if (COMPONENTS in layer) {
      deepForEach(layer[COMPONENTS], cb)
    }
  })
  return layers
}
export const deepFilterAttrs = (layers, attrs) => {
  deepForEach(layers, (layer) => {
    attrs.forEach(attr => {
      delete layer[attr]
    })
  })
  return layers
}
export const setComponentDimension = (dimensionConfig, {
  x = null,
  y = null,
  width = null,
  height = null,
}, type, cb) => {
  const data = getDimensionData(dimensionConfig)
  if (type === 'callback') {
    const { x: configX, y: configY, width: configWidth, height: configHeight, type: configType } = cb(data)
    configX && (x = configX)
    configY && (y = configY)
    configWidth && (width = configWidth)
    configHeight && (height = configHeight)
    configType && (type = configType)
  }

  dimensionConfig.forEach((config) => {
    switch (config.name) {
      case LEFT:
        if (x) {
          switch (type) {
            case 'set':
              config.value = x
              break
            case 'add':
              config.value = config.value + x
              break
            case 'update':
              config.value = config.value + (x - (data[LEFT] + data[WIDTH]))
              break
            case 'center':
              config.value = config.value + (x - (data[LEFT] + data[WIDTH] / 2))
              break
            default:
          }
        }
        break
      case TOP:
        if (y) {
          switch (type) {
            case 'set':
              config.value = y
              break
            case 'add':
              config.value = config.value + y
              break
            case 'update':
              config.value = config.value + (y - (data[HEIGHT] + data[TOP]))
              break
            case 'center':
              config.value = config.value + (y - (data[TOP] + data[HEIGHT] / 2))
              break
            default:

          }
        }
        break
      case WIDTH:
        if (width) {
          switch (type) {
            case 'set':
              config.value = width
              break
            case 'add':
              config.value = config.value + width
              break
            case 'update':
              break
            default:
              break
          }
        }
        break
      case HEIGHT:
        if (height) {
          switch (type) {
            case 'set':
              config.value = height
              break
            case 'add':
              config.value = config.value + height
              break
            case 'update':
              break
            default:
              break
          }
        }
        break
      default:
    }
  })
  return data
}
export const getDimensionData = (dimensionConfig) => {
  return dimensionConfig.reduce((pre, cur) => {
    if (Array.isArray(cur.value)) {
      const obj = cur.value.reduce((pre, cur) => {
        pre[cur.name] = cur.value
        return pre
      }, {})
      pre = {
        ...pre,
        ...obj,
      }
    } else {
      pre[cur.name] = cur.value
    }
    return pre
  }, {})
}

export const getLayerDimensionByDomId = (id) => {
  const layerDom = document.querySelector(`.react-draggable[data-id=${ id }]`)
  const translateArr = layerDom.style.transform.replace('translate(', '').replace(')', '').replaceAll('px', '').split(', ')
  const x = Number(translateArr[0])
  const y = Number(translateArr[1])
  const width = Number(layerDom.style.width.replace('px', ''))
  const height = Number(layerDom.style.height.replace('px', ''))
  return {
    x, y, width, height,
  }
}
