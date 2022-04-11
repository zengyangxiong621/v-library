import * as React from 'react';

export type DraggableEvent = React.MouseEvent<HTMLElement | SVGElement>
  | React.TouchEvent<HTMLElement | SVGElement>
  | MouseEvent
  | TouchEvent

export type DraggableData = {
  deltaX: number
  deltaY: number
  lastX: number
  lastY: number
  x: number
  y: number
  node: any
}

export type IComponent = any

export interface ILayerComponent {
  id: string,
  groupId: string,
  name: string,
  lock: boolean, // 是否锁定
  scan: boolean, // 是否展示
  selected: boolean,
  hover: boolean,
  cancel: boolean,
  disabled: boolean,
}

export interface ILayerGroup {
  id: string,
  name: string,
  lock: boolean, // 是否锁定
  scan: boolean, // 是否展示
  collapse: boolean, // 是否展开
  selected: boolean,
  hover: boolean,
  cancel: boolean,
  disabled: boolean,
  components: Array<ILayerComponent>,
  children: Array<ILayerComponent>,
}

export interface IConfig {
  position: {
    x: number,
    y: number
  },
  style: {
    width: number,
    height: number
  }
}

export interface IMouse {
  screenX: number,
  screenY: number,
  clientX: number,
  clientY: number,
  pageX: number,
  pageY: number,
  elementX: number,
  elementY: number,
  elementH: number,
  elementW: number,
  elementPosX: number,
  elementPosY: number,
}
