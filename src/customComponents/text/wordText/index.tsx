import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'
import './index.less'

interface Props {
  componentConfig?: any,
  fields?:any,
  comData?:any
}

interface State {}

class IconText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    const { comData,fields } = this.props
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data
    // let originData = staticData.data
    originData = Array.isArray(originData) ? originData : []
    let style: CSSProperties = config.filter((item: any) => [''].indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
      if(Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p: any, c: any) => {
          p[c.name] = c.value
          return p
        }, {})
        pre = {
          ...pre,
          ...obj,
        }
      } else {
        pre[cur.name] = cur.value
      }
      return pre
    }, {})


    const findItem = (name: string) => {
      return config.find((item: any) => {
        return item.name === name
      })
    }


    let textStyle = JSON.parse(JSON.stringify(style))
    textStyle.underline = false  // 标准组件中无须下划线样式，故直接写死false
  
    const textRow  = () => {
      let obj:any = {}
      switch(textStyle.textAlign){
        case 'left': 
          obj.alignItems='flex-start';
          break;
        case 'center':
          obj.alignItems='center';
          break;
        case 'right':
          obj.alignItems = 'flex-end'
          break;
        case 'bothEnds':
          obj={
            flexDirection: 'row',
            justifyContent: 'space-between',
          }
          break;
      }
      return obj;
    }

    const textCol = () => {
      let obj:any = {}
      switch(textStyle.textVertical){
        case 'top': 
          textStyle.textAlign !== 'bothEnds' ? obj.justifyContent='flex-start' : obj.alignItems='flex-start';
          break;
        case 'bottom':
          textStyle.textAlign !== 'bothEnds' ? obj.justifyContent = 'flex-end' :  obj.alignItems = 'flex-end'
        break;
        case 'vertical':
          textStyle.textAlign !== 'bothEnds' ? obj.justifyContent = 'center' :  obj.alignItems = 'center'
          break;
      }
      return obj;
    }

    const textAlign = textRow()
    const textVertical = textCol()
    let textStyleObj:any = {
      ...style,
      ...textVertical,
      fontWeight: textStyle.bold ? 'bold' : '',
      fontStyle: textStyle.italic ? 'italic' : '',
      lineHeight: 'normal'
    }
    textStyleObj = {...textStyleObj,  ...textAlign}
    let textNameObj:any = {
      lineHeight: `${style.lineHeight}px`
    }

    return (
      <div style={ textStyleObj } className={`wordText ${textStyle.hideDefault && 'hide'}`}>
        { !textStyle.hideDefault && originData.map((item:any, i:any) => (
          <div className={`text-name`} style={textNameObj}>
            <span key={item.text}  style={ {
              filter: textStyle.show ? `drop-shadow(${textStyle.shadow.color} ${textStyle.shadow.vShadow}px ${textStyle.shadow.hShadow}px ${textStyle.shadow.blur}px)` : ''
            }}  dangerouslySetInnerHTML={{ __html: item[fields[0]] }}></span>
          </div>
        ))}
      </div>
    )

  }
}

export { IconText }
export default IconText