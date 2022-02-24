export const noop = () => {}

// 去重
export function unique<T>(array: Array<T>, compare = (a: T, b: T) => a === b) {
  const result = []
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i]
    if (result.findIndex(v => compare(v, current)) === -1) {
      result.push(current)
    }
  }
  return result
}

export const getMaxDistance = (arr: number[]) => {
  const num = arr.sort((a, b) => a - b)
  return num[num.length - 1] - num[0]
}

export type DragLineData = {
  node: HTMLElement,
  deltaY: number,
  deltaX: number,
  originX: number,
  originY: number,
  x: number,
  y: number,
}

export const createCoreData = (
  { node, deltaX, deltaY }: { node: HTMLElement, deltaX: number, deltaY: number },
  { originX, originY, x, y }: { originX?: number, originY?: number, x: number, y: number }
) => {
  const draglineData: DragLineData = {
    node,
    deltaY,
    deltaX,
    originX: originX || x,
    originY: originY || y,
    x,
    y,
  }

  return draglineData
}