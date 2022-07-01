import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'
import './index.less'

interface Props {
  componentConfig?: any
}

interface State {}

class IconText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    // const { dataStatic } = this.props.config
    // const { data } = dataStatic
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
  
    let style: CSSProperties = config.filter((item: any) => ['iconSize'].indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
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

    const backgroundImg = findItem('backgroundImg')
    const iconImg = findItem('iconImg')
    const iconSize = findItem('iconSize')

    const textStyle = JSON.parse(JSON.stringify(style))
  
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
      background: backgroundImg.value ? `url(${ backgroundImg.value }) no-repeat 0/cover` : '',
      fontWeight: textStyle.bold ? 'bold' : '',
      fontStyle: textStyle.italic ? 'italic' : ''
    }
    if(!textStyle.underline || textStyle.textAlign === 'bothEnds'){
      textStyleObj = {...textStyleObj,  ...textAlign}
    }
    let textNameObj:any = {}
    if(textStyle.underline){
      switch(textStyle.textAlign){
        case 'left':
          textNameObj.justifyContent = 'flex-start'
          break;
        case 'center':
          textNameObj.justifyContent = 'center'
          break;
        case 'right':
          textNameObj.justifyContent = 'flex-end'
          break;
      }
    }
    return (
      <div style={ textStyleObj } className={`text ${textStyle.hideDefault && 'hide'}`}>
        { !textStyle.hideDefault && staticData.data.map((item:any, i:any) => (
          <div className={`text-name ${textStyle.underline &&'showText'}`} style={textNameObj}>
            {
              iconImg.value &&
              <img className="icon-img" style={{
                width: iconSize.value[0].value,
                height: iconSize.value[1].value
              }} src={`${iconImg.value}`}></img> 
            }
            <span key={item.text}  style={ {
              filter: textStyle.show ? `drop-shadow(${textStyle.shadow.color} ${textStyle.shadow.vShadow}px ${textStyle.shadow.hShadow}px ${textStyle.shadow.blur}px)` : ''
            }}  dangerouslySetInnerHTML={{ __html: item.text }}></span>
          </div>
        ))}
      </div>
    )

  }
}

export { IconText }
export default IconText