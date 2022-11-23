import React, { Component,useEffect, CSSProperties } from "react";
import componentDefaultConfig from "./config";
import "./index.less";

interface Props {
  componentConfig?: any,
  fields?:any,
  comData?:any,
  themeConfig?:any,
  onThemeChange?:any,
  onChange?:any,
  scale?:any,
  onClick?:any,
  onMouseEnter?:any,
  onMouseLeave?:any
}

interface State {}

class IconText extends Component<Props, State> {
  constructor(Props: any) {
    super(Props);
  }
  componentDidUpdate(prevProps: any){
    if(JSON.stringify(prevProps.comData) !== JSON.stringify(this.props.comData)){
      this.props.onChange && this.props.onChange(this.props.comData)
    }
  }
  replaceThemeColor= (arr:any) =>{
    const componentThemeConfig = this.props.themeConfig;
    arr.map((item:any) => {
      const { name, value, type } = item;
      if(item.hasOwnProperty("value")){
        if (Array.isArray(value)) {
          this.replaceThemeColor(value);
        }else{
          if (type === "color"){
            switch(name){
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
  handleClick = (e) => {
    this.props.onClick && this.props.onClick(e, this.props.comData);
  };
  handleMouseEnter = (e) => {
    this.props.onMouseEnter && this.props.onMouseEnter(e, this.props.comData);
  };
  handleMouseLeave = (e) => {
    this.props.onMouseEnter && this.props.onMouseLeave(e, this.props.comData);
  };

  render () {
    const { comData,fields,themeConfig } = this.props;
    const componentConfig = this.props.componentConfig || componentDefaultConfig;
    const {config, staticData} = componentConfig;
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
    originData = Array.isArray(originData) ? originData : [];
    const configOfTheme = JSON.parse(JSON.stringify(config));
    if(themeConfig){
      this.replaceThemeColor(configOfTheme);
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme
      });
    }
    const copyConfig = themeConfig ? configOfTheme : config;
    const style: CSSProperties = copyConfig.filter((item: any) => ["iconSize"].indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
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


    const findItem = (name: string) => {
      return copyConfig.find((item: any) => {
        return item.name === name;
      });
    };

    const backgroundImg = findItem("backgroundImg");
    const iconImg = findItem("iconImg");
    const iconSize = findItem("iconSize");

    const textStyle = JSON.parse(JSON.stringify(style));
    textStyle.underline = false;  // 标准组件中无须下划线样式，故直接写死false
  
    const textRow  = () => {
      let obj:any = {};
      switch(textStyle.textAlign){
        case "left": 
          obj.alignItems="flex-start";
          break;
        case "center":
          obj.alignItems="center";
          break;
        case "right":
          obj.alignItems = "flex-end";
          break;
        case "bothEnds":
          obj={
            flexDirection: "row",
            justifyContent: "space-between",
          };
          break;
      }
      return obj;
    };

    const textCol = () => {
      const obj:any = {};
      switch(textStyle.textVertical){
        case "top": 
          textStyle.textAlign !== "bothEnds" ? obj.justifyContent="flex-start" : obj.alignItems="flex-start";
          break;
        case "bottom":
          textStyle.textAlign !== "bothEnds" ? obj.justifyContent = "flex-end" :  obj.alignItems = "flex-end";
        break;
        case "vertical":
          textStyle.textAlign !== "bothEnds" ? obj.justifyContent = "center" :  obj.alignItems = "center";
          break;
      }
      return obj;
    };

    const textAlign = textRow();
    const textVertical = textCol();
    let textStyleObj:any = {
      ...style,
      ...textVertical,
      background: backgroundImg.value ? `url(${ backgroundImg.value }) no-repeat 0/cover` : "",
      fontWeight: textStyle.bold ? "bold" : "",
      fontStyle: textStyle.italic ? "italic" : "",
      lineHeight: "normal"
    };
    if(!textStyle.underline || textStyle.textAlign === "bothEnds"){
      textStyleObj = {...textStyleObj,  ...textAlign};
    }
    const textNameObj:any = {
      lineHeight: `${style.lineHeight}px`
    };
    if(textStyle.underline){
      switch(textStyle.textAlign){
        case "left":
          textNameObj.justifyContent = "flex-start";
          break;
        case "center":
          textNameObj.justifyContent = "center";
          break;
        case "right":
          textNameObj.justifyContent = "flex-end";
          break;
      }
    }
    return (
      <div 
        onClick={this.handleClick}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={ textStyleObj } 
        className={`iconText ${textStyle.hideDefault && "hide"}`}
      >
        { !textStyle.hideDefault && originData.map((item:any, i:any) => (
          <div className={`text-name ${textStyle.underline &&"showText"}`} style={textNameObj}>
            {
              iconImg.value &&
              <img className="icon-img" style={{
                width: iconSize.value[0].value,
                height: iconSize.value[1].value
              }} src={`${iconImg.value}`}></img> 
            }
            <span key={item.text}  style={ {
              filter: textStyle.show ? `drop-shadow(${textStyle.shadow.color} ${textStyle.shadow.vShadow}px ${textStyle.shadow.hShadow}px ${textStyle.shadow.blur}px)` : ""
            }}  dangerouslySetInnerHTML={{ __html: item[fields[0]] }}></span>
          </div>
        ))}
      </div>
    );

  }
}

export { IconText };
export default IconText;