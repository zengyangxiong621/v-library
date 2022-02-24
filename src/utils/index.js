export function selectSingleComponent (state, id) {
  state.forEach(item => {
    if (item.id === id) {
      item.active = true
    } else {
      item.active = false
    }
    selectSingleComponent(item.components, id)
  })
}


export function groupComponents (state, ids) {
  let arr = []
  state.forEach(item => {

  })
}

export function findParentNode (state, ids) {
  let arr = []
  let id = ids.shift()
  let node = state.find(item => item.id === id)
  arr.push(node)
  if (node?.isGroup && node.components.length > 0) {
    return arr.concat(findParentNode(node.components, ids))
  } else {
    return null
  }
  return arr
}

// ['1-1', '1-1-1']
export function calculateGroupPosition (state) {
  state.reduce((cur, next) => {
    if (next.parentId === 'parent') {
      return [[], []]
    }
    let [xPositionList, yPositionList] = cur
    next.components.forEach(component => {
      const { x, y } = component.defaultPosition
      const { width, height } = component.style
      xPositionList = xPositionList.concat([x, x + width])
      yPositionList = yPositionList.concat([y, y + height])
    })
    xPositionList.sort((a, b) => a - b)
    yPositionList.sort((a, b) => a - b)
    console.log('----------------------------')
    console.log('xPositionList', xPositionList)
    console.log('yPositionList', yPositionList)
    let minX = xPositionList[0]
    let minY = yPositionList[0]
    let maxX = xPositionList[xPositionList.length - 1]
    let maxY = yPositionList[yPositionList.length - 1]
    console.log('minX', minX)
    console.log('minY', minY)
    console.log('----------------------------')

    next.style.width = maxX - minX
    next.style.height = maxY - minY
    next.defaultPosition.x = minX
    next.defaultPosition.y = minY
    // console.log('--------------')
    // console.log('maxX', maxX)
    // console.log('minX', minX)
    // console.log('maxY', maxY)
    // console.log('minY', minY)
    // console.log('next', next)
    // console.log('--------------')
    return [[minX, maxX], [minY, maxY]]
  }, [[], []])
}
