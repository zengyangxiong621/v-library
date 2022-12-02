import React, { Component, CSSProperties } from "react";
import componentDefaultConfig from "./config";
import Swiper from "./swiper.js";
import "./index.less";

interface Props {
  componentConfig?: any;
  fields?: any;
  comData?: any;
  themeConfig?: any;
  onThemeChange?: any;
  onChange?:any,
  scale?:any,
  onClick?:any,
  onMouseEnter?:any,
  onMouseLeave?:any
}

interface State {}

class WordText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props);
    this.state = {
      swiperDom: null,
      swiperId: new Date().valueOf(),
    };
  }
  componentDidUpdate(prevProps: any){
    if(JSON.stringify(prevProps.comData) !== JSON.stringify(this.props.comData)){
      this.props.onChange && this.props.onChange(this.props.comData)
    }
  }
  replaceThemeColor = (arr: any) => {
    const componentThemeConfig = this.props.themeConfig;
    arr.map((item: any) => {
      const { name, value, type } = item;
      if (Object.prototype.hasOwnProperty.call(item, "value")) {
        if (Array.isArray(value)) {
          this.replaceThemeColor(value);
        } else {
          if (type === "color") {
            switch (name) {
              case "color":
                item.value = componentThemeConfig.textColor;
                break;
              default:
                break;
            }
          }
        }
      }
    });
  };

  // 处理所有配置项
  formatConfig = (config:any, exclude:any) => {
    return config.filter((item: any) => exclude.indexOf(item?.name) == -1).reduce((pre: any, cur: any) => {
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

  componentDidMount() {
    this.initSwiper();
  }

  initSwiper = () => {
    const componentConfig = this.props.componentConfig || componentDefaultConfig;
    const { config } = componentConfig;
    const { swiperId }: any = this.state;
    const configData:any = this.formatConfig(config, []);
    const loopConfig = configData?.autoplay ? {
      stopOnLastSlide: true
    } : false;
    const swiper = new Swiper(`.mySwiper${swiperId}`, {
      direction: "vertical",
      slidesPerView: "auto",
      freeMode: true,
      speed: configData?.speed || 500,
      roundLengths: true,
      autoplay: loopConfig,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
      mousewheel: true,
    });
    this.setState({
      swiperDom: swiper,
    });
  };

  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e, this.props.comData);
  };
  handleMouseEnter = (e) => {
    this.props.onMouseEnter && this.props.onMouseEnter(e, this.props.comData);
  };
  handleMouseLeave = (e) => {
    this.props.onMouseEnter && this.props.onMouseLeave(e, this.props.comData);
  };



  render() {
    const { swiperId, swiperDom }: any = this.state;
    const { comData, fields, themeConfig } = this.props;
    const componentConfig = this.props.componentConfig || componentDefaultConfig;
    const { config, staticData } = componentConfig;
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;

    const configOfTheme = JSON.parse(JSON.stringify(config));
    if (themeConfig) {
      this.replaceThemeColor(configOfTheme);
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme,
      });
    }
    const copyConfig = themeConfig ? configOfTheme : config;
    originData = Array.isArray(originData) ? originData : [];
    const style: CSSProperties = copyConfig
      .filter((item: any) => [""].indexOf(item.name) == -1)
      .reduce((pre: any, cur: any) => {
        if (Array.isArray(cur.value)) {
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

    const textStyle = JSON.parse(JSON.stringify(style));

    const textRow = () => {
      let obj: any = {};
      switch (textStyle.textAlign) {
        case "left":
          obj.alignItems = "flex-start";
          break;
        case "center":
          obj.alignItems = "center";
          break;
        case "right":
          obj.alignItems = "flex-end";
          break;
        case "bothEnds":
          obj = {
            flexDirection: "row",
            justifyContent: "space-between",
          };
          break;
      }
      return obj;
    };

    const textAlign = textRow();
    let textStyleObj: any = {
      ...style,
      fontWeight: textStyle.bold ? "bold" : "",
      fontStyle: textStyle.italic ? "italic" : "",
      lineHeight: "normal",
    };
    textStyleObj = { ...textStyleObj, ...textAlign };
    const textNameObj: any = {
      lineHeight: `${style.lineHeight}px`,
    };

    if(swiperDom && originData.length){
      // 切换是否自动轮播
      if(textStyle?.autoplay && originData.length > 1){
        swiperDom.autoplay.start();
      }else{
        swiperDom.autoplay.stop();
      }
      swiperDom.params.speed = textStyle?.speed || 500;  // 更新轮播速度
      if(textStyle?.autoplay){
        swiperDom.el.onmouseout = function(){
          swiperDom.autoplay.start();
        };
      }
      swiperDom.update();
    }





    return (
      <div
        className="wordText"
        style={textStyleObj}
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        {!textStyle.hideDefault && originData && originData.length && (
          <div className={`mySwiper${swiperId} swiper`}>
            <div className="swiper-wrapper">
              <div className="swiper-slide" style={textAlign}>
                {originData.map((item: any, i: any) => (
                  <p
                    style={{
                      ...textNameObj,
                      filter: textStyle.show
                        ? `drop-shadow(${textStyle.shadow.color} ${textStyle.shadow.vShadow}px ${textStyle.shadow.hShadow}px ${textStyle.shadow.blur}px)`
                        : "",
                    }}
                    dangerouslySetInnerHTML={{ __html: item && item[fields[0]] || "" }}
                  ></p>
                ))}
              </div>
            </div>
            <div className="swiper-scrollbar"></div>
          </div>
        )}
      </div>
    );
  }
}

export { WordText };
export default WordText;
