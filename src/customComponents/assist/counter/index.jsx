import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'
import './index.css'


class Counter extends Component {
  constructor(Props) {
    super(Props)
    this.state = {
      componentConfig: Props.componentConfig || componentDefaultConfig,
      currentStyle: {}
    }
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

  render () {
    const { comData,fields } = this.props
    const {componentConfig} = this.state
    const {config, staticData} = componentConfig
    // 组件静态或者传入组件的数据
    // let originData = comData || staticData.data
    let originData = staticData.data
    // 获取标题样式
    const titleStyle = this.formatConfig([this.getStyleData(config, "title")],[])
    const displayStyle = this.getAllStyle(config)

    // 获取数值样式
    const dataRangConfig =  this.formatConfig([this.getStyleData(config, "dataRangConfig")],[])
    // 获取布局
    const layoutConfig = this.formatConfig([this.getStyleData(config, "layoutConfig")],[])
    console.log(layoutConfig,'layoutConfig')
    // 补零位数
    const zeroize = this.getStyleData(config, "zeroize").value
    // 小数位数
    const decimalCount = this.getStyleData(config, "decimalCount").value
    // 分割数
    const splitCount = this.getStyleData(config, 'splitCount').value
    // 校验value是否为数值
    const reg = /^-?[0-9]+\.?[0-9]*$/;
    let numList = reg.test(originData.value) ? originData.value.split('') : []
    if(reg.test(originData.value)){
      let value = Number(originData.value).toFixed(decimalCount)
      let intNumber = value.split('.')[0]
      let floatNumber = value.split('.')[1]
      intNumber = Math.abs(intNumber).toString().padStart(zeroize, 0)  // 补位处理
      intNumber = intNumber.match(/.{1,3}/g)
      // if(Number(intNumber) > 0) {
      //   intNumber = intNumber.padStart(zeroize, 0)
      // }else{
      //   let num = intNumber.substr(1,intNumber.length)
      //   intNumber = `-${num.padStart(zeroize, 0)}`
      // }
      console.log()
      // value = `${intNumber}.${floatNumber}`
      // numList = value.split('')
    }
    // console.log(intNumber, floatNumber,'floatNumber')


    return (
      <div className='counter' style={displayStyle}>
        {/* 翻牌器标题 */}
        <div style={{
          ...titleStyle,
          fontWeight: titleStyle.bold ? 'bold' : '',
          fontStyle: titleStyle.italic ? 'italic' : '',
          transform: `translate(${titleStyle.x}px, ${titleStyle.y}px)`
        }}>{originData.name}</div>
        {/* 数值 */}
        <div className="number">
          <div style={{
            ...dataRangConfig,
            fontWeight: dataRangConfig.bold ? 'bold' : '',
            fontStyle: dataRangConfig.italic ? 'italic' : '',
            textShadow: dataRangConfig.show ? `${dataRangConfig.shadow.color} ${dataRangConfig.shadow.vShadow}px ${dataRangConfig.shadow.hShadow}px ${dataRangConfig.shadow.blur}px` : ''
          }}>
            {
              numList.map(item => {
                return (
                  item === ',' ? <span>,</span> : item === ',' ? <span>.</span> :
                  <span style={{
                    width: layoutConfig.width,
                    height: layoutConfig.height,
                    marginLeft: layoutConfig.left,
                    marginRight: layoutConfig.right
                  }}>{item}</span>
                )
              })
            }
          </div>
          <span>/单位</span>
        </div>
      </div>
    )

  }
}

export { Counter }
export default Counter