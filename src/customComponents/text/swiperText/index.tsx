import React, { Component, CSSProperties, useEffect } from 'react';
import componentDefaultConfig from './config'
// import Swiper from "swiper";
import Swiper from './swiper.js'
// import 'swiper/css/swiper.min.css' // 引入样式

import './index.less'

interface Props {
  componentConfig?: any
}

interface State {
  swiperDom?:any
}

class SwipterText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
    this.state = {
      swiperDom: null
    }
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
    let loopConfig = configData.autoplay && staticData.data.length > 1 ? {
        disableOnInteraction: false,
        delay: configData.delay
    } : false
    var swiper = new Swiper(".swiper-container", {
        slidesPerView: staticData.data.length,
        spaceBetween: configData.lineSpace,
        direction: "vertical",
        observer: true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents: true,//修改swiper的父元素时，自动初始化swiper 
        // loop: configData.isLoop,
        loop: false,
        autoHeight: true,
        noSwiping: false,   // 手动切换，false 允许，true，不允许
        autoplay: loopConfig,
        centeredSlides: true
    });
    this.setState({
      swiperDom:swiper
    })
  }

  componentDidUpdate(){
    console.log('动态修改')
  }

  render () {
    // const { dataStatic } = this.props.config
    // const { data } = dataStatic
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const {config, staticData} = componentConfig
    const { swiperDom } = this.state

    let style = this.formatConfig(config, [])
    const findItem = (name: string) => {
        return config.find((item: any) => {
            return item.name === name
        })
    }
    const textStyle = findItem('textStyle')
    const textStyleData = this.formatConfig([textStyle], [])
    if(swiperDom){
      // 切换是否自动轮播
      if(style.autoplay && staticData.data.length > 1){
        swiperDom.autoplay.start()
      }else{
        swiperDom.autoplay.stop()
      }
      swiperDom.params.autoplay.delay = style.delay  // 更新轮播速度
      swiperDom.params.slidesPerView = staticData.data.length  // 更新轮播预览数量
      swiperDom.params.spaceBetween = style.lineSpace // 更新文本间距
      swiperDom.update();
    }
    
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