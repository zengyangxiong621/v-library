import React, { Component, CSSProperties, useEffect } from "react";
import componentDefaultConfig from "./config";
// import Swiper from "swiper";
import Swiper from "./swiper.js";

import "./index.less";

interface Props {
  componentConfig?: any,
  fields?:any,
  comData?:any
}

interface State {
  swiperDom?:any,
  componentConfig?:any,
  swiperId?:any
}

class SwipterText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props);
    this.state = {
      swiperDom: null,
      componentConfig: Props.componentConfig || componentDefaultConfig,
      swiperId: (new Date()).valueOf()
    };
  }

  componentDidMount(){
    this.drawSwiper();
  }

  // 处理所有配置项
  formatConfig = (config:any, exclude:any) => {
    return config.filter((item: any) => exclude.indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
        if(Array.isArray(cur.value)) {
          const obj = cur.value.reduce((p: any, c: any) => {
            p[c.name] = c.value;
            return p;
          }, {});
          pre = {
            ...pre,
            ...obj,
          };
        } else {
          pre[cur.name] = cur.value;
        }
        return pre;
    }, {});
  };

  drawSwiper = () => {
    const {config, staticData} = this.props.componentConfig;
    const { swiperId } = this.state;
    const { comData } = this.props;
    const configData = this.formatConfig(config, []);
    let slideData = comData || staticData;
    slideData = Array.isArray(slideData) ? slideData : [];
    const loopConfig = configData.autoplay && slideData.length > 1 ? {
        disableOnInteraction: false,
        // pauseOnMouseEnter:true, // 版本7才能实现
        delay: configData.delay
    } : false;
    const swiper:any = new Swiper(`.swiper-container${swiperId}`, {
        slidesPerView: configData.slidesNum,
        spaceBetween: configData.lineSpace,
        direction: "vertical",
        
        loopedSlides: slideData.length + 2,
        observer: true,//修改swiper自己或子元素时，自动初始化swiper 
        observeParents: true,//修改swiper的父元素时，自动初始化swiper 
        // loop: configData.isLoop,
        loop: false,
        autoHeight: true,
        noSwiping: false,   // 手动切换，false 允许，true，不允许
        autoplay: loopConfig,
        centeredSlides: true
    });
    swiper.el.onmouseover = function(){
      swiper.autoplay.stop();
    };
    this.setState({
      swiperDom:swiper
    });
  };

  // 根据对应的自动来转换
  formatData = (data:any, fields2ValueMap:any) => {
    const arr = Array.isArray(data) ? data.map((item:any) => {
      const res:any = {};
      for (const k in item) {
        res[k] = item[fields2ValueMap[k]];
      }
      return res;
    }) : [];
    return arr; 
  };

  render () {
    const { fields, comData,componentConfig } = this.props;
    const {config, staticData} = componentConfig;
    const { swiperDom,swiperId } = this.state;
    // 组件静态或者传入组件的数据
    const originData = comData || staticData.data;
    // 根据传入的fields来映射对应的值
    const fields2ValueMap:any = {};
    const initColumnsName = fields;
    fields.forEach((item:any, index:any) => {
      fields2ValueMap[initColumnsName[index]] = item;
    });
    const finalData = this.formatData(originData, fields2ValueMap);
    const style = this.formatConfig(config, []);
    const findItem = (name: string) => {
        return config.find((item: any) => {
            return item.name === name;
        });
    };
    const textStyle = findItem("textStyle");
    const textStyleData = this.formatConfig([textStyle], []);
    if(swiperDom && finalData.length){
      // 切换是否自动轮播
      if(style.autoplay && finalData.length > 1){
        swiperDom.autoplay.start();
      }else{
        swiperDom.autoplay.stop();
      }
      swiperDom.params.autoplay.delay = style.delay;  // 更新轮播速度
      swiperDom.params.slidesPerView = style.slidesNum;
      swiperDom.params.spaceBetween = style.lineSpace; // 更新文本间距
      if(style.autoplay){
        swiperDom.el.onmouseout = function(){
          swiperDom.autoplay.start();
        };
      }
      swiperDom.update();
    }

    const handleClickName = (item:any) => {
      if(style.showLink){
        style.openNew ?  window.open(item.url) : window.location.href= item.url;
      }
    };
    
    return (
      <div 
      className={`swipwe-box swiper-no-swiping ${style.hideDefault && "hide"}`} 
      style={{
          width: style.width,
          height: style.height
      }}
      >
        {
            !style.hideDefault && (
              <div 
                className={`swiper-container swiper-container${swiperId}`}>
                  <div className="swiper-wrapper">
                  {
                    finalData.map((item:any,index:any) => {
                      return (
                          <div className="swiper-slide" style={{
                              ...textStyleData,
                              fontWeight: style.bold ? "bold" : "",
                              fontStyle: style.italic ? "italic" : "",
                              filter: style.show ? `drop-shadow(${style.shadow.color} ${style.shadow.vShadow}px ${style.shadow.hShadow}px ${style.shadow.blur}px)` : ""
                          }}  key={index}>
                             <span onClickCapture={() => handleClickName(item)}>{item[fields[0]]}</span>
                          </div>
                      );
                    })
                  }
                  </div>
              </div>
            ) 
        }
      </div>
    );

  }
}

export { SwipterText };
export default SwipterText;