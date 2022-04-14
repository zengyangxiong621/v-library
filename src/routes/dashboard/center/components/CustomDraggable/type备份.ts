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

export interface IComponent {
  id: string;
  name: string;
  staticData?: any;
  config: {
    style?: any,
    className?: string,
    position: {
      x: number,
      y: number
    }
  },
}

export interface ILayerComponent {
  id: string,
  groupId: string,
  name: string,
  isLock: boolean, // 是否锁定
  isShow: boolean, // 是否展示
  selected: boolean,
  hover: boolean
}

export interface ILayerGroup {
  id: string,
  name: string,
  isLock: boolean, // 是否锁定
  isShow: boolean, // 是否展示
  collapse: boolean, // 是否展开
  selected: boolean,
  hover: boolean,
  components: Array<ILayerComponent>
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
