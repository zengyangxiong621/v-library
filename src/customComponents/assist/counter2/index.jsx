import React, { Component, CSSProperties,Fragment } from 'react';
import ComponentDefaultConfig from './config'
import './index.css'
import CountUp from 'react-countup'

class Counter extends Component {
  constructor(Props) {
    super(Props)
  }
  // 处理所有配置项
  formatConfig = (config, exclude) => {
    return config.filter((item) => exclude.indexOf(item.name) == -1).reduce((pre, cur) => {
        if(Array.isArray(cur.value)) {
          const obj = this.formatConfig(cur.value, [])
          pre = {
            ...pre,
            ...obj,
          }
        } else {
          pre[cur.name] = cur.value
        }
        return pre
    }, {})
  }

  getStyleData = (config, name, data=null) => {
    config.forEach(item => {
      if(item.name === name){
        data = item
      }else if(Array.isArray(item.options)){
        let res = this.getStyleData(item.options, name) 
        data = res ? res : data
      }else if(Array.isArray(item.value)){
        let res1 = this.getStyleData(item.value, name)
        data = res1 ? res1 : data
      }
    })
    if(data){
      return data
    }
  }

  getPosition = (align, sortedBy) => {
    switch(align){
      case 'left':
        return sortedBy === 'right' ? 'flex-end' : 'flex-start'
      case 'center':
        return 'center'
      case 'right':
        return sortedBy === 'right' ? 'flex-start' : 'flex-end'
      case 'bothEnds':
        return ['left','right'].indexOf(sortedBy) > -1  ?  'space-between' : 'center'
    }
  }

  getAllStyle = (config) => {
    const sortedBy = this.getStyleData(config,'sortedBy').value
    const align = this.getStyleData(config, 'align').value[0].value
    let displayStyle = {}
    switch(sortedBy){
      case 'up':
      case 'down':
        displayStyle.flexDirection = sortedBy ==='up' ? 'column' : 'column-reverse'
        displayStyle.justifyContent = 'center'
        displayStyle.alignItems = this.getPosition(align,sortedBy)
        break
      case 'left':
      case 'right':
        displayStyle.flexDirection = sortedBy==='left' ? 'row' : 'row-reverse'
        displayStyle.justifyContent = this.getPosition(align,sortedBy)
        displayStyle.alignItems = 'center'
        break
    }
    return displayStyle
  }


  componentDidMount(){
  }

  // 根据对应的自动来转换
  formatData = (data, fields2ValueMap) => {
    const arr = Array.isArray(data) ? data.map((item) => {
      let res = {}
      for (let k in item) {
        res[k] = item[fields2ValueMap[k]]
      }
      return res
    }) : []
    return arr 
  }

  

  render () {
    const { comData,fields } = this.props
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const {config, staticData} = componentConfig
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data
    const fields2ValueMap = {}
    const initColumnsName = fields
    fields.forEach((item, index) => {
      fields2ValueMap[initColumnsName[index]] = item
    })
    originData = this.formatData(originData, fields2ValueMap)
    originData = originData.length ? originData[0] : []
    // 设置文本的大小问题
    const dimension = this.formatConfig([this.getStyleData(config, "dimension")],[])
    // 获取标题样式
    const titleStyle = this.formatConfig([this.getStyleData(config, "title")],[])
    const displayStyle = this.getAllStyle(config)
    // 获取数值样式
    const dataRangConfig =  this.formatConfig([this.getStyleData(config, "dataRangConfig")],[])
    // 小数位数
    const decimalCount = this.getStyleData(config, "decimalCount").value
    // 分割数
    const splitCount = this.getStyleData(config, 'splitCount').value
    // 动画时间
    const duration = this.getStyleData(config, 'duration')?.value || 2 ;
    // 后缀功能
    const suffixConfig = this.formatConfig([this.getStyleData(config, "后缀")],[])
    // 补充前缀功能
    const prefixConfig = this.formatConfig([this.getStyleData(config, "前缀")],[])
    return (
      <div className='counter' style={{
        ...displayStyle,
        width: dimension.width,
        height: dimension.height
      }}>
        {/* 翻牌器标题 */}
        {
          titleStyle.show && 
          <div style={{
            ...titleStyle,
            fontWeight: titleStyle.bold ? 'bold' : '',
            fontStyle: titleStyle.italic ? 'italic' : '',
            lineHeight: `${titleStyle.lineHeight}px`,
            transform: `translate(${titleStyle.x}px, ${titleStyle.y}px)`
          }}>{originData[fields[0]]}</div>
        }
        {/* 数值 */}
        <div className="counter-number">
          {
            prefixConfig.support &&
            <span style={{
              ...prefixConfig,
              fontWeight: prefixConfig.bold ? 'bold' : '',
              fontStyle: prefixConfig.italic ? 'italic' : '',
              transform: `translate(${prefixConfig.x}px, ${prefixConfig.y}px)`,
              lineHeight: `${suffixConfig.lineHeight}px`,
            }}>{prefixConfig.content}</span> 
          }
          <div className='number-list' style={{
            ...dataRangConfig,
            fontWeight: dataRangConfig.bold ? 'bold' : '',
            fontStyle: dataRangConfig.italic ? 'italic' : '',
            lineHeight: 'normal',
            textShadow: dataRangConfig.show ? `${dataRangConfig.shadow.color} ${dataRangConfig.shadow.vShadow}px ${dataRangConfig.shadow.hShadow}px ${dataRangConfig.shadow.blur}px` : ''
          }}>
            <CountUp 
              start={0} 
              separator={splitCount ? ',' : ''} 
              end={Number(originData[fields[1]]) || null} 
              decimals={decimalCount}
              delay={0}
              decimal="."
              duration={duration}></CountUp>
          </div>
          {
            suffixConfig.support &&
            <span style={{
              ...suffixConfig,
              fontWeight: suffixConfig.bold ? 'bold' : '',
              fontStyle: suffixConfig.italic ? 'italic' : '',
              transform: `translate(${suffixConfig.x}px, ${suffixConfig.y}px)`,
              lineHeight: `${suffixConfig.lineHeight}px`,
            }}>{suffixConfig.content}</span> 
          }
        </div>
      </div>
    )

  }
}

export { Counter }
export default Counter