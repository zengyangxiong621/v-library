import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import { getFields } from "@/utils/data";
import { useState, useRef } from "react";
import DateSelect from '@/components/dateSelect'
import { connect } from "dva"
// import './index.less'
import { cloneDeep } from 'lodash'

const ComponentEventContainer = ({ bar, dispatch, events = [], id = 0, ...props }) => {
  const callbackArgs = bar.callbackArgs
  const callbackParamsList = bar.callbackParamsList
  const { componentConfig } = props
  console.log('componentConfig', componentConfig)
  const [animationConfig, setAnimationConfig] = useState({
    transition: 'transform 600ms ease 0s'
  })
  const componentRef = useRef(null)
  const [opacityStyle, setOpacityStyle] = useState({ opacity: 1 })
  const opacityTimeId = useRef('')
  const [clickTimes, setClickTimes] = useState(0)
  const clickEvents = events.filter(item => item.trigger === 'click')
  const clickActions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), [])
  const handleClick = (event) => {
    if (clickTimes === 1) {
      return
    }
    if (clickActions.length === 0) {
      return
    }
    setClickTimes(1)
    console.log('clickActions', clickActions)
    const hideShowAction = clickActions.filter(({ action }) => ['hide', 'show', 'show/hide'].includes(action))
    const rotateAction = clickActions.filter(({ action }) => ['rotate'].includes(action))
    const translateAction = clickActions.filter(({ action }) => ['translate'].includes(action))
    const scaleAction = clickActions.filter(({ action }) => ['scale'].includes(action))
    let animationConfig = null
    clickActions.forEach(action => {
      console.log('action', action)
      const type = action.action
      const animation = action.animation
      const delay = animation.delay
      setTimeout(() => {
        action.component.forEach(id => {
          const dom = document.querySelector(`.event-id-${id}`)
          dom.style.transition = `transform ${animation.duration}ms ${animation.timingFunction} 0s`
          Object.keys(action).filter(
            (key) => !['id', 'name', 'trigger', 'componentScope', 'component', 'action'].includes(key)
          ).forEach((key) => {
            actionConfigFuncList[key](action[key], type, dom, action.id)
          })
        })
      }, delay)
    })
  }

  const animation = ({ duration, timingFunction, type}, action, dom, id) => {
    if (['show', 'hide'].includes(action)) {
      // transform = 'translateY(200px)'
      let translate = {
        x: 0,
        y: 0
      }
      console.log('type', type)
      switch (type) {
        case 'slideLeft':
          translate.x = -200
          break
        case 'slideRight':
          translate.x = 200
          break
        case 'slideTop':
          translate.y = -200
          break
        case 'slideBottom':
          translate.y = 200
          break;
        default:
          break
      }
      const translateX = /translateX\((.+?)\)/g
      const translateY = /translateY\((.+?)\)/g
      if (translateX.test(dom.style.transform)) {
        let value = dom.style.transform.match(translateX)[0]
        // 取出数字包括 - 和 . 号
        let xLength = Number(value.replace(/[^\d|^\.|^\-]/g, ''))
        xLength = xLength + translate.x
        dom.style.transform = dom.style.transform.replace(translateX, `translateX(${xLength}px)`)
      } else {
        dom.style.transform += `translateX(${translate.x}px)`
      }
      if (translateY.test(dom.style.transform)) {
        let value = dom.style.transform.match(translateY)[0]
        let yLength = Number(value.replace(/[^\d|^\.|^\-]/g, ''))
        yLength = yLength + translate.y
        dom.style.transform = dom.style.transform.replace(translateY, `translateY(${yLength}px)`)
      } else {
        dom.style.transform += `translateY(${translate.y}px)`
      }



      opacityTimeId.current = id
      let timer = setInterval(() => {
        // 在一个时间端内，只存在一种事件
        if (opacityTimeId.current !== id) {
          clearInterval(timer)
        }
        if (action === 'show') {
          if (dom.style.opacity >= 1) {
            dom.style.opacity = 1
            clearInterval(timer)
          } else {
            dom.style.opacity = Number(dom.style.opacity) + 0.01
          }
        }
        if (action === 'hide') {
          if (dom.style.opacity <= 0) {
            dom.style.opacity = 0
            clearInterval(timer)
          } else {
            dom.style.opacity = Number(dom.style.opacity) - 0.01
          }
        }
      }, duration / 100)

    }

  }

  const rotate = ({ perspective, rotateX, rotateY, rotateZ }, action, dom) => {
    if (action === 'rotate') {
      const rotateRegX = /rotateX\((.+?)\)/g
      const rotateRegY = /rotateY\((.+?)\)/g
      const rotateRegZ = /rotateZ\((.+?)\)/g
      if (rotateRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegX, `rotateX(${rotateX}deg)`)
      } else {
        dom.style.transform += `rotateX(${rotateX}deg)`
      }
      if (rotateRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegY, `rotateY(${rotateY}deg)`)
      } else {
        dom.style.transform += `rotateY(${rotateY}deg)`
      }
      if (rotateRegZ.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegZ, `rotateZ(${rotateZ}deg)`)
      } else {
        dom.style.transform += `rotateZ(${rotateZ}deg)`
      }
    }
  }

  const showOrHide = (value) => {

  }

  const scale = ({ origin, x, y }, action, dom) => {
    if (action === 'scale') {
      const scaleRegX = /scaleX\((.+?)\)/g
      const scaleRegY = /scaleY\((.+?)\)/g
      if (scaleRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegX, `scaleX(${x})`)
      } else {
        dom.style.transform += `scaleX(${x})`
      }
      if (scaleRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegY, `scaleY(${y})`)
      } else {
        dom.style.transform += `scaleY(${y})`
      }
      dom.style['transform-origin'] = origin
    }
  }

  const translate = ({ toX, toY }, action, dom) => {
    if (action === 'translate') {
      const translateReg = /translate3d\((.+?)\)/g
      if (translateReg.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(translateReg, `translate3d(${toX}px, ${toY}px, 0px)`)
      } else {
        dom.style.transform += `translate3d(${toX}px, ${toY}px, 0px)`
      }
    }
  }

  const actionConfigFuncList = {
    animation,
    rotate,
    scale,
    translate,
  }
  const comCallbackArgs = [
    {
      "id": "回调id-1",
      "name": "回调1",
      "origin": "cookieTime",
      "target": "startTime"
    },
    {
      "id": "回调id-2",
      "name": "回调2",
      "origin": "sleepTime",
      "target": "endTime"
    },    {
      "id": "回调id-3",
      "name": "回调2",
      "origin": "a",
      "target": "a"
    },    {
      "id": "回调id-4",
      "name": "回调2",
      "origin": "b",
      "target": "b"
    },
  ]

  // 数组去重，取最后一个
  const duplicateFn = (arr) => {
    let map = new Map();
    for (let item of arr.reverse()) {
      if (!map.has(item.target)) {
        map.set(item.target, item);
      }
    }
    return [...map.values()];
  }

  const handleValueChange = (data) => {
    console.log('data', data)
    const componentId = props.componentConfig.id
    const component = bar.components.find(item => item.id === componentId)
    component.callbackArgs = comCallbackArgs
    const compCallbackArgs = duplicateFn(cloneDeep(component.callbackArgs))
    // 回调参数列表
    // 过滤出 callbackParamsList 中的存在 sourceId === component 的 每一项
    const sourceCallbackList = callbackParamsList.filter(item => item.sourceModules.find(jtem => jtem.id === componentId))
    // 需要作用到哪些组件上
    let activeIds = []
    sourceCallbackList.forEach(item => {
      item.sourceModules.forEach(sourceItem => {
        if (sourceItem.id === componentId) {
          // 回调列表中的当前数据如果有目标组件再进行下一步
          // 循环组件设置的回调参数，获取变量名和字段的对应关系
          if (item.destinationModules.length > 0) {
            let temp = false
            compCallbackArgs.forEach(callback => {
              // 判断是否为同一个源
              if (item.callbackParam === callback.target) {
                // 值是否改变
                // data的值存在并且
                if (data[callback.origin] && callbackArgs[callback.target] !== data[callback.origin]) {
                  callbackArgs[callback.target] = data[callback.origin]
                  activeIds = activeIds.concat(item.destinationModules.map(module => module.id))
                }
                dispatch({
                  type: 'bar/save',
                  payload: {
                    callbackArgs
                  }
                })
              }
            })
          }
        }
      })
    })
    activeIds = [...new Set(activeIds)]
    const activeComponents = activeIds.reduce((pre, id) =>  pre.concat( bar.components.find(item => item.id === id)),[])
    // 重新获取部分组件的数据
    dispatch({
      type: 'bar/getComponentsData',
      payload: activeComponents
    })
  }
  return (
    <div ref={componentRef} className={`single-component event-id-${id}`} onClick={handleClick}
      style={{ width: '100%', height: '100%', ...animationConfig, ...opacityStyle }}>
      {/*      <RemoteBaseComponent
        {...props}
      ></RemoteBaseComponent>     */}
      {
        props.componentConfig.moduleName === 'timeSelect' ?
           <DateSelect
            onChange={handleValueChange}
            {...props}
          >
          </DateSelect>
          : <RemoteBaseComponent
            {...props}
          ></RemoteBaseComponent>
      }
    </div>
  )
}

export default connect(({ bar }) => ({ bar }))(ComponentEventContainer)