import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'
import './index.less'
import { deepClone } from '@/utils'

interface Props {
  componentConfig?: any
}

interface State {}

class TextCopy extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    // const { dataStatic } = this.props.config
    // const { data } = dataStatic
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
  
    let style: CSSProperties = config.filter((item: any) => ['iconSize', 'dimension'].indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
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

    const textStyle = deepClone(style)
    
    console.log(textStyle,'style',config)

    return (
      <div style={ {
        ...style,
        background: backgroundImg.value ? `url(${ backgroundImg.value }) no-repeat 0/cover` : '',
        fontWeight: textStyle.bold ? 'bold' : '',
        fontStyle: textStyle.italic ? 'italic' : ''
      } } className="text">
        { staticData.data.map((item:any, i:any) => (
          // <span key={item.text}><img src={require('@/assets/images/controlCabin/btn-left.png')}></img> { item.text } </span>
          <div className="text-name">
            <img className="icon-img" style={{
              width: iconSize.value[0].value,
              height: iconSize.value[1].value
            }} src={`${iconImg.value}`}></img> 
            <span key={item.text}> { item.text } </span>
          </div>
        ))}
      </div>
    )

  }
}

export { TextCopy }
export default TextCopy