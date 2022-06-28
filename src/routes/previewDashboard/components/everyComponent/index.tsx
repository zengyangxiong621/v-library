import { memo } from 'react'
import './index.less'
import { MORENYINCANG, WEIZHICHICUN, WENBENYANGSHI, DUIQIFANGSHI, YINYING } from './type'

import { getTargetStyle } from './type'
import ComponentEventContainer from '@/components/componentEventContainer'

// import RemoteBaseComponent from '@/components/RemoteBaseComponent';
import { getFields } from '@/utils/data'

// 按屏幕比例适配", value: "0"}
// 1: {name: "强制铺满", value: "1"}
// 2: {name: "原比例展示溢出滚动

const EveryComponent = ({ componentData, comData, scaleValue, screenWidthRatio, screenHeightRatio }: any) => {
  const { moduleName, events, id, config } = componentData
  // 将所有的组件配置(位置尺寸、默认隐藏、文本样式、对齐方式、阴影)整合进Map中
  const allConfigMap = new Map()
  config.forEach(({ displayName, value }: any) => {
    allConfigMap.set(displayName, value)
  });
  /**
   * description: 位置尺寸 需要根据屏幕的宽高比例等比例放大或者缩小
   */


  const weizhichicunArr = allConfigMap.get(WEIZHICHICUN).map((item: any) => {
    // if (['X轴坐标'].includes(item.displayName)) {
    //   return {
    //     ...item,
    //     value: ~~(screenWidthRatio * item.value)
    //   }
    // }
    // if (['Y轴坐标'].includes(item.displayName)) {
    //   return {
    //     ...item,
    //     value: ~~(screenWidthRatio * item.value)
    //   }
    // }

    // return item
    if (['X轴坐标', '宽度'].includes(item.displayName)) {
      return {
        ...item,
        value: ~~(screenWidthRatio.toFixed(3) * item.value)
      }
    } else if (['Y轴坐标', '高度'].includes(item.displayName)) {
      return {
        ...item,
        value: ~~(screenHeightRatio.toFixed(3) * item.value)
      }
    }
    return item
  })

  console.log('scaleValuescaleValuescaleValue', scaleValue);
  let componentStyle = getTargetStyle(weizhichicunArr, {
    position: 'absolute',
    // transform: `scale(${ scaleValue })`
  })
  return (
    <div className='preview-component-wrap'
      style={componentStyle}
    >
      <ComponentEventContainer
        key={id}
        id={id}
        events={events}
        version={'1.0.0'}
        name={moduleName}
        componentConfig={componentData}
        fields={getFields(componentData)}
        comData={comData}
      >
      </ComponentEventContainer>
    </div>

  )
}

export default memo(EveryComponent)
