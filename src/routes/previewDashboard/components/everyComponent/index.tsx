import { memo, useEffect } from 'react'
import './index.less'
import { MORENYINCANG, WEIZHICHICUN, WENBENYANGSHI, DUIQIFANGSHI, YINYING } from './type'

import { getTargetStyle } from './type'


const EveryComponent = ({ allData }: any) => {
  const { id, name, config, staticData: { data } } = allData
  console.log('aall', allData);

  // 文本信息 | 图片路径
  const { text, imageUrl } = data[0]

  // websocket 获取数据
  useEffect(() => {
    const ws = new WebSocket(`ws://50423059pd.zicp.vip/visual/webSocket/${id}`)
    console.log('wss', ws);
    ws.onopen = e => {
      console.log('ws 连接成功');
      ws.close()
    }
    ws.onmessage = msg => {
      console.log('ws msg', msg);
    }
    ws.onclose = e => {
      console.log('关闭');
    }
    ws.onerror = err => {
      console.log('ws错误', err);
    }
  }, [])

  // 将所有的组件配置(位置尺寸、默认隐藏、文本样式、对齐方式、阴影)整合进Map中
  const allConfigMap = new Map()
  config.forEach(({ displayName, value }: any) => {
    allConfigMap.set(displayName, value)
  });
  //位置尺寸
  const weizhichicunArr = allConfigMap.get(WEIZHICHICUN)

  const componentStyle = getTargetStyle(weizhichicunArr, {
    position: 'absolute',
    border: '1px solid #fff'
  })
  // 文本样式
  const wenbenyangshiArr = allConfigMap.get(WENBENYANGSHI)
  const textStyle = getTargetStyle(wenbenyangshiArr)



  return (
    <div className='EveryComponent-wrap'
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