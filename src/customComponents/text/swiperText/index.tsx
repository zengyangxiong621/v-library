import React, { Component, CSSProperties, useEffect } from 'react';
import componentDefaultConfig from './config'
// import Swiper from "swiper";
import Swiper from './swiper.js'
// import 'swiper/css/swiper.min.css' // 引入样式

import './index.less'

interface Props {
  componentConfig?: any
}

interface State {}

class SwipterText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }

  componentDidMount(){
    this.drawSwiper()
  }

  // 处理所有配置项
  formatConfig = (config:any, exclude:any) => {
    return config.filter((item: any) => exclude.indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
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
  }


  drawSwiper = () => {
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
    const configData = this.formatConfig(config, [])
    let loopConfig = configData.autoplay ? {
        disableOnInteraction: false,
    } : false
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: staticData.data.length,
        spaceBetween: configData.lineSpace,
        direction: "vertical",
        observer: true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents: true,//修改swiper的父元素时，自动初始化swiper 
        loop: configData.isLoop,
        autoHeight: true,
        noSwiping: false,   // 手动切换，false 允许，true，不允许
        autoplay: loopConfig,
        centeredSlides: true,
    });
  }

  componentDidUpdate(){
    
  }

  render () {
    // const { dataStatic } = this.props.config
    // const { data } = dataStatic
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig

    let style = this.formatConfig(config, [])
    const findItem = (name: string) => {
        return config.find((item: any) => {
            return item.name === name
        })
    }
    const textStyle = findItem('textStyle')
    const textStyleData = this.formatConfig([textStyle], [])
    
    return (
      <div className={`swipwe-box swiper-no-swiping ${style.hideDefault && 'hide'}`} style={{
          width: style.width,
          height: style.height
      }}>
        {
            !style.hideDefault && (
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                    {
                    staticData.data.map((item:any,index:any) => {
                        return (
                            <div className="swiper-slide" style={{
                                ...textStyleData,
                                fontWeight: style.bold ? 'bold' : '',
                                fontStyle: style.italic ? 'italic' : '',
                                filter: style.show ? `drop-shadow(${style.shadow.color} ${style.shadow.vShadow}px ${style.shadow.hShadow}px ${style.shadow.blur}px)` : ''
                            }}  key={index}>
                                {item.text}
                            </div>
                        )
                    })
                    }
                    </div>
                </div>
            )
        }
      </div>
    )

  }
}

export { SwipterText }
export default SwipterText