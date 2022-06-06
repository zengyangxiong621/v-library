import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import {getFields} from "@/utils/data";
import {useState, useRef} from "react";
// import './index.less'

const ComponentEventContainer = ({events = [], id = 0, ...props}) => {
  const [animationConfig, setAnimationConfig] = useState({
    transition: 'transform 600ms ease 0s'
  })
  const componentRef = useRef(null)
  const [opacityStyle, setOpacityStyle] = useState({opacity: 1})
  const clickEvents = events.filter(item => item.trigger === 'click')
  const clickActions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), [])

  const handleClick = () => {
    console.log('clickActions', clickActions)
    const hideShowAction = clickActions.filter(({action}) => ['hide', 'show', 'show/hide'].includes(action))
    const rotateAction = clickActions.filter(({action}) => ['rotate'].includes(action))
    const translateAction = clickActions.filter(({action}) => ['translate'].includes(action))
    const scaleAction = clickActions.filter(({action}) => ['scale'].includes(action))
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
            actionConfigFuncList[key](action[key], type, dom)
          })
        })
      }, delay)
    })
    // if (hideShowAction && hideShowAction.length > 0) {
    //   hideShowAction.forEach(action => {
    //     const type = action.action
    //     const animation = action.animation
    //     const delay = animation.delay
    //     const dom = document.querySelector(`.event-id-${id}`)
    //     if (delay === 0) {
    //       action.component.forEach(id => {
    //         actionConfigFuncList['animation'](action['animation'], type, dom)
    //       })
    //     } else {
    //       setTimeout(() => {
    //         action.component.forEach(id => {
    //           actionConfigFuncList['animation'](action['animation'], type, dom)
    //         })
    //       }, delay)
    //     }
    //   })
    // }
  }

  const animation = ({duration, timingFunction}, action, dom) => {
    if (action === 'show') {
      let timer = setInterval(() => {
        if (dom.style.opacity >= 1) {
          dom.style.opacity = 1
          clearInterval(timer)
        } else {
          dom.style.opacity = Number(dom.style.opacity) + 0.01
        }
      }, duration / 100)
    }
    if (action === 'hide') {
      let timer = setInterval(() => {
        if (dom.style.opacity <= 0) {
          dom.style.opacity = 0
          clearInterval(timer)
        } else {
          dom.style.opacity = Number(dom.style.opacity) - 0.01
        }
      }, duration / 100)
    }
  }

  const translate3d = ({perspective, rotateX, rotateY, rotateZ}, action, dom) => {
    if (action === 'rotate') {
      dom.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
    }
  }

  const showOrHide = (value) => {

  }

  const scale = ({origin, x, y}, action, dom) => {
    if (action === 'scale') {
      dom.style.transform = `scaleX(${x}) scaleY(${y})`
      dom.style['transform-origin'] = origin
    }
  }

  const translate = ({toX, toY}, action, dom) => {
    if (action === 'translate') {
      dom.style.transform = `translate(${toX}px, ${toY}px)`
    }
  }

  const actionConfigFuncList = {
    animation,
    rotate: translate3d,
    scale,
    translate,
  }

  return (
    <div ref={componentRef} className={`single-component event-id-${id}`} onClick={handleClick}
         style={{width: '100%', height: '100%', ...animationConfig, ...opacityStyle}}>
      <RemoteBaseComponent
        {...props}
      ></RemoteBaseComponent>
    </div>
  )
}

export default ComponentEventContainer