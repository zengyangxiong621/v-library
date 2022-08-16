import { memo, useEffect, useState, useRef, useLayoutEffect } from 'react'
import './index.less'
import { WEIZHICHICUN } from './type'

import { getTargetStyle } from './type'
import ComponentEventContainer from '@/components/componentEventContainer'

// import RemoteBaseComponent from '@/components/RemoteBaseComponent';
import { getFields } from '@/utils/data'

// 按屏幕比例适配", value: "0"}
// 1: {name: "强制铺满", value: "1"}
// 2: {name: "原比例展示溢出滚动

const EveryComponent = ({ componentData, comData, scaleValue, layerInfo }: any) => {

  const { moduleName, events, id, config } = componentData
  const { mountAnimation } = layerInfo
  const { delay, direction, duration, opacityOpen, timingFunction, type } = mountAnimation || {}

  console.log('mountAnimation', layerInfo);
  // 将所有的组件配置(位置尺寸、默认隐藏、文本样式、对齐方式、阴影)整合进Map中
  const allConfigMap = new Map()
  config.forEach(({ displayName, value }: any) => {
    allConfigMap.set(displayName, value)
  });
  const weizhichicunArr = allConfigMap.get(WEIZHICHICUN)
  let componentStyle = getTargetStyle(weizhichicunArr, {
    position: 'absolute',
  })


  useEffect(() => {
    // 如果没有 设置“载入动画”, 那么后端不会返回mountAnimation字段
    if (mountAnimation) {
      let translateDirection = ''
      // 移入模式 1、移入 2、小移入 区别就是动画开始时起始的位置不同
      let moveDistance = 0
      const width = document.documentElement.clientWidth
      const height = document.documentElement.clientHeight

      const pageWrapEl: any = document.querySelector('.previewDashboard-wrap')
      const curCmpContainerEl: any = document.querySelector(`.animation-id-${id}`)

      const pageWrapElInfo = pageWrapEl.getBoundingClientRect()
      const curCmpContainerElInfo: any = curCmpContainerEl.getBoundingClientRect()

      let id2: any = null
      switch (type) {
        case 'none':
          break;
        case 'slide':
          // moveDistance = curCmpContainerElInfo.left - pageWrapElInfo.left
          moveDistance = 1000
          break;
        case 'slideSmall':
          moveDistance = +(pageWrapElInfo.left.toFixed(2))
          break;

        case 'wipe':
          curCmpContainerEl.style.height = '400px'
          curCmpContainerEl.style.background = 'red'
          break;
      }

      switch (direction) {
        // 从下至上
        case 'up':
          translateDirection = `translate(0, ${moveDistance}px)`
          break;
        // 从上至下
        case 'down':
          translateDirection = `translate(0, -${moveDistance}px)`
          break;
        // 从左至右
        case 'left':
          translateDirection = `translate(-${moveDistance}px, 0)`
          break;
        // 从右至左
        case 'right':
          translateDirection = `translate(${moveDistance}px,0)`
          break;
      }
      // console.log('translateDirection', translateDirection);
      // 页面渲染完成之时,组件也会一同挂载到页面中,但此时动画还未开始,所以要让组件不可见(为了营造组件是在用户设定的延迟时间后进入页面的错觉)
      curCmpContainerEl.style.opacity = 0
      const startKeyframe: any = {
        transform: `${translateDirection}`,
      }
      const endKeyframe: any = {
        transform: `translate(0,0)`,
      }
      // 如果有选择了 “渐隐渐显” 就加上透明度
      let timeoutId: any = null
      if (opacityOpen) {
        startKeyframe.opacity = 0
        endKeyframe.opacity = 1
      } else {
        // 没有选择 “渐隐渐显”, 需要手动在延迟时间后把组件显现出来, 否则组件就一直是透明的状态
        timeoutId = setTimeout(() => curCmpContainerEl.style.opacity = 1, delay)
      }

      curCmpContainerEl.animate(
        [startKeyframe, endKeyframe],
        {
          duration: duration,
          delay: delay,
          fill: 'forwards',
          easing: timingFunction,
          // easing: 'steps(8, end)',
          iterations: 1
        }
      )
      return () => {
        clearTimeout(timeoutId)
        // clearTimeout(id2)
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <div className={`preview-component-wrap animation-id-${id}`}
        style={{ ...componentStyle}}
      >
        <ComponentEventContainer
          key={id}
          id={id}
          events={events}
          version={'1.0.0'}
          scale={scaleValue}
          name={moduleName}
          componentConfig={componentData}
          fields={getFields(componentData)}
          comData={comData}
        >
        </ComponentEventContainer>
      </div>
    </div>

  )
}

export default memo(EveryComponent)
