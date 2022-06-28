import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import {getFields} from "@/utils/data";
import {useState, useRef} from "react";
import './index.less'

const SingleComponent = ({events = [], ...props}) => {
  const [animationConfig, setAnimationConfig] = useState({
    transition: 'transform 600ms ease 0s'
  })
  const componentRef = useRef(null)
  const [opacityStyle, setOpacityStyle] = useState({opacity: 1})
  const clickEvents = events.filter(item => item.trigger === 'click')
  const actions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), [])

  const handleClick = () => {
    const hideShowAction = actions.filter(({action}) => ['hide', 'show', 'show/hide'].includes(action)).pop()
    const rotateAction = actions.filter(({action}) => ['rotate'].includes(action)).pop()
    const translateAction = actions.filter(({action}) => ['translate'].includes(action)).pop()
    const scaleAction = actions.filter(({action}) => ['scale'].includes(action)).pop()

    let animationConfig = null

    if (scaleAction) {
      const animation = scaleAction.animation
      const delay = animation.delay
      animationConfig = Object.keys(scaleAction).filter(
        (key) => !['id', 'name', 'trigger', 'componentScope', 'component', 'action'].includes(key)
      ).reduce((pre, key) => (
        {
          ...pre,
          ...actionConfigFuncList[key](scaleAction[key], 'scale')
        }), {}
      )
      setTimeout(() => {
        setAnimationConfig(animationConfig)
      }, delay)
    }

    if (translateAction) {
      const animation = translateAction.animation
      const delay = animation.delay
      animationConfig = Object.keys(translateAction).filter(
        (key) => !['id', 'name', 'trigger', 'componentScope', 'component', 'action'].includes(key)
      ).reduce((pre, key) => (
        {
          ...pre,
          ...actionConfigFuncList[key](translateAction[key], 'translate')
        }), {}
      )
      setTimeout(() => {
        setAnimationConfig(animationConfig)
      }, delay)
    }

    if (rotateAction) {
      const animation = rotateAction.animation
      const delay = animation.delay
      animationConfig = Object.keys(rotateAction).filter(
        (key) => !['id', 'name', 'trigger', 'componentScope', 'component', 'action'].includes(key)
      ).reduce((pre, key) => (
        {
          ...pre,
          ...actionConfigFuncList[key](rotateAction[key], 'rotate')
        }), {}
      )
      setTimeout(() => {
        setAnimationConfig(animationConfig)
      }, delay)
    }
    if (hideShowAction) {
      const animation = hideShowAction.animation
      const delay = animation.delay
      animationConfig = Object.keys(hideShowAction).filter(
        (key) => !['id', 'name', 'trigger', 'componentScope', 'component'].includes(key)
      ).reduce((pre, key) => (
        {
          ...pre,
          ...actionConfigFuncList[key](hideShowAction[key], 'hide')
        }), {}
      )
      setTimeout(() => {
        setAnimationConfig(animationConfig)
      }, delay)
    }
  }

  const animation = ({duration, timingFunction}, action) => {
    if (action === 'hide') {
      let timer = setInterval(() => {
        if (componentRef.current.style.opacity <= 0) {
          componentRef.current.style.opacity = 0
          clearInterval(timer)
        } else {
          componentRef.current.style.opacity -= 0.01
        }
      }, duration / 100)
    }
    return {
      transition: `transform ${duration}ms ${timingFunction} 0s`
    }
  }


  const translate3d = ({perspective, rotateX, rotateY, rotateZ}, action) => {
    if (action === 'rotate') {
      return {
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`
      }
    }
    return {}
  }

  const showOrHide = (value) => {
    // if (['hide', 'show', 'show/hide'].includes(value))
    //   return {
    //     display: value === 'show' ? 'block' : 'none'
    //   }
    // return {}
  }

  const scale = ({origin, x, y}, action) => {
    if (action === 'scale') {
      return {
        transform: `scaleX(${x}) scaleY(${y})`,
        'transform-origin': origin,
      }
    }
    return {}
  }

  const translate = ({toX, toY}, action) => {
    if (action === 'translate') {
      return {
        transform: `translate(${toX}px, ${toY}px)`
      }
    }
    return {}
  }

  const actionConfigFuncList = {
    action: showOrHide,
    animation,
    rotate: translate3d,
    scale,
    translate,
  }

  return (
    <div ref={componentRef} data-id={'当前组件的ID'} className="single-component" onClick={handleClick}
         style={{width: '100%', height: '100%', ...animationConfig, ...opacityStyle}}>
      <RemoteBaseComponent
        {...props}
      ></RemoteBaseComponent>
    </div>
  )
}

export default SingleComponent