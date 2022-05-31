import { memo } from 'react'
import './index.less'
import { MORENYINCANG, WEIZHICHICUN, WENBENYANGSHI, DUIQIFANGSHI, YINYING } from './type'

import { getTargetStyle } from './type'

// 按屏幕比例适配", value: "0"}
// 1: {name: "强制铺满", value: "1"}
// 2: {name: "原比例展示溢出滚动

const EveryComponent = ({ allData, screenWidthRatio, screenHeightRatio }: any) => {
  // console.log('w', screenHeightRatio);
  const { id, name, config, staticData: { data } } = allData
  // 文本信息 | 图片路径
  const { text, imageUrl } = data[0]
  // 将所有的组件配置(位置尺寸、默认隐藏、文本样式、对齐方式、阴影)整合进Map中
  const allConfigMap = new Map()
  config.forEach(({ displayName, value }: any) => {
    allConfigMap.set(displayName, value)
  });
  /**
   * description: 位置尺寸 需要根据屏幕的宽高比例等比例放大或者缩小
   */
  const weizhichicunArr = allConfigMap.get(WEIZHICHICUN).map((item: any) => {
    if(['X轴坐标', '宽度'].includes(item.displayName)) {
      return {
        ...item,
        value: screenWidthRatio * item.value
      }
    } else {
      return {
        ...item,
        value: screenHeightRatio * item.value
      }
    }
  })
  // console.log('allConfigMap.get(WEIZHICHICUN)', allConfigMap.get(WEIZHICHICUN));
  // console.log('--------------', weizhichicunArr);

  const componentStyle = getTargetStyle(weizhichicunArr, {
    position: 'absolute',
    // border: '1px solid #fff'
  })
  // 文本样式
  const wenbenyangshiArr = allConfigMap.get(WENBENYANGSHI)
  const textStyle = getTargetStyle(wenbenyangshiArr)


  return (
    <div className='preview-component-wrap'
      style={componentStyle}
    >
      {
        text
          ? <p style={textStyle}>{text}</p>
          : <img className='fill-img' src={require('../../../../assets/images/发布.png')} alt="图片正在加载…" />
      }
    </div>
  )
}

export default memo(EveryComponent)