import React, { Component, CSSProperties } from "react";
import ComponentDefaultConfig from "./config";
import "./index.less";

interface Props {
  componentConfig?: any,
  fields?:any,
  comData?:any,
  themeConfig?:any,
  onThemeChange?:any
}

interface State {}

class hyperlinks extends Component<Props, State> {
  constructor(Props: any) {
    super(Props);
  }
  handleJumpPage = (item: any) => {
    const { fields } = this.props;
    window.open(item[fields[1]]);
  };
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
                item.value = componentThemeConfig.pureColors[0];
                break;
              default:
                break;
            }
          }
        }
      }
    });
  };
  render () {
    const { comData,fields,themeConfig } = this.props;
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig;
    const {config, staticData} = componentConfig;
    // 组件静态或者传入组件的数据
    let originData = comData || staticData.data;
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
    originData = Array.isArray(originData) ? originData : [];
    const copyConfig = themeConfig ? configOfTheme : config;
    const style: CSSProperties = copyConfig.filter((item: any) => [""].indexOf(item.name) == -1).reduce((pre: any, cur: any) => {
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
      fontWeight: textStyle.bold ? "bold" : "",
      fontStyle: textStyle.italic ? "italic" : "",
      lineHeight: "normal"
    };
    textStyleObj = {...textStyleObj,  ...textAlign};
    const textNameObj:any = {
      lineHeight: `${style.lineHeight}px`
    };
    return (
      <div style={ textStyleObj } className={`hyperlinks ${textStyle.hideDefault && "hide"}`}>
        { !textStyle.hideDefault && originData.map((item:any, i:any) => (
          <div className={"hyperlinks-name"} style={textNameObj}>
            <span key={item.text} onClick={() => {this.handleJumpPage(item);}}  style={ {
              filter: textStyle.show ? `drop-shadow(${textStyle.shadow.color} ${textStyle.shadow.vShadow}px ${textStyle.shadow.hShadow}px ${textStyle.shadow.blur}px)` : ""
            }}  dangerouslySetInnerHTML={{ __html: item[fields[0]] }}></span>
          </div>
        ))}
      </div>
    );

  }
}

export { hyperlinks,ComponentDefaultConfig };
export default hyperlinks;