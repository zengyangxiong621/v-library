import { memo } from 'react'
import './index.less'


const EveryComponent = ({ allData }: any) => {
  const { name, config, staticData: { data } } = allData

  // 文本信息 | 图片路径
  const { text, imageUrl } = data[0]

  /** 组件 ****** */
  const { value } = config[0]
  const cmpLocationAndSize = value
  // 每个组件的样式(位置，大小)
  const componentStyle: any = {
    position: 'absolute',
    border: '1px solid #fff'
  }
  // 每个item结构 -> {
  //   "displayName": "X轴坐标", "name": "left", "value": 100
  // }
  cmpLocationAndSize.forEach(({ name, value }: any) => {
    componentStyle[name] = value
  });

  /** 组内的文字 ****** */
  // 文本样式
  const wenbenyangshiArr = config[2]?.value
  // console.log('hhhhhhhh', wenbenyangshiArr);
  // 每个组件中文字的样式
  const textStyle: any = {}
  wenbenyangshiArr.forEach(({ name, value }: any) => {
    textStyle[name] = value
  });
  return (
    <div className='EveryComponent-wrap'
      style={componentStyle}
    >
      {
        text ? <p style={textStyle}>{text}</p> : <img src={require('../../../../assets/images/发布.png')} alt="图片正在加载…" />
      }
    </div>
  )
}

export default memo(EveryComponent)