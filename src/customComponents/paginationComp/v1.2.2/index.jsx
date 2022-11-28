import React,{useEffect} from "react";
import ComponentDefaultConfig from "./config";
import { Pagination,ConfigProvider,message } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import "./index.css";

const PaginationComp=(props)=>{
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config,staticData,callbackArgs } = componentConfig;
  const componentData = props.comData || staticData.data; // 过滤后的数据
  const _fields = props.fields[0];
  const pageConfig = config.find(item=>item.name==="paginationConfig");
  const componentThemeConfig = props.themeConfig;

  const replaceThemeConfig = (configArr) => {
    configArr.forEach(item=>{
      if(Array.isArray(item.value)){
        replaceThemeConfig(item.value);
      }else if(Array.isArray(item.options)){
        replaceThemeConfig(item.options);
      }else{
        if(["textStroke","color"].includes(item.type)){
          switch(item.name){
            case "themeTextColor":
              item.value=componentThemeConfig.textColor;
              break;
            case "themePageBorder":
              item.value.color=componentThemeConfig.pureColors[0];
              break;
            case "themeColor":
              item.value=componentThemeConfig.pureColors[0];
              break;
            default:
              break;
          }
        }
      }
    });
  };
  if (componentThemeConfig) {
    const configOfTheme = JSON.parse(JSON.stringify(config));
    replaceThemeConfig(configOfTheme);
    props.onThemeChange({
      id:componentConfig.id,
      name: componentConfig.name,
      moduleName: componentConfig.moduleName,
      moduleVersion: componentConfig.moduleVersion,
      config:configOfTheme
    });
  }

  let pageKey="page",pageSizeKey="pageSize";
  if(callbackArgs && callbackArgs.length>=2){
    pageKey=callbackArgs[0].target;
    pageSizeKey=callbackArgs[1].target;
  }

  const getConfigMap=(configArr)=>{
    const style={};
    if(Array.isArray(configArr)){
      configArr.forEach(item=>{
        if(Array.isArray(item.value)){
          style[item.name]=getConfigMap(item.value);
        }else{
          style[item.name]=item.value;
        }
      });
    }
    return style;
  };
  const _pageConfig=getConfigMap(pageConfig.options);
  const globalConfig=_pageConfig["全局"];
  const styleConfig=_pageConfig["样式"];

  const {pageSizeSwitch,quickJump,size,borderRadius}=globalConfig;
  const getShowTotal=()=>{
    const {pageDesc}=globalConfig;
    if(pageDesc){
      return (total, range) => `${range[0]}-${range[1]} / ${total}`;
    }
    return null;
  };
  const getPageSizeOptions=()=>{
    const {pageSizeOptions}=globalConfig;
    let res=[10,20,50,100];
    try {
      res=pageSizeOptions.split(";");
    } catch (error) {
      message.error("请检查每页条数配置格式");
    }
    return res;
  };

  /**
   *
   * @returns 获取三个状态的样式
   */
  const getDefaultStyle=()=>{
    const {defaultStyle:{pageBgColor,pageBorder,pageTextStyle}}=styleConfig;
    return {
      "--defaultBgColor":pageBgColor,
      "--defaultBorderColor":pageBorder.color,
      "--defaultBorderWidth":pageBorder.width,
      "--defaultTextBold":pageTextStyle.bold ? "bold":"",
      "--defaultTextColor":componentThemeConfig ? componentThemeConfig.textColor : pageTextStyle.themeTextColor,
      "--defaultFontFamily":pageTextStyle.fontFamily,
      "--defaultFontSize":pageTextStyle.fontSize+"px",
      "--defaultTextItalic":pageTextStyle.italic ? "italic":"",
      "--defaultTextLetterSpacing":pageTextStyle.letterSpacing+"px",
      "--defaultTextLineHeight":pageTextStyle.lineHeight+"px"
    };
  };
  const getHoverStyle=()=>{
    const {hoverStyle:{pageBgColor,themePageBorder,pageTextStyle}}=styleConfig;
    return {
      "--hoverBgColor":pageBgColor,
      "--hoverBorderColor":componentThemeConfig ? componentThemeConfig.pureColors[0] : themePageBorder.color,
      "--hoverBorderWidth":themePageBorder.width,
      "--hoverTextBold":pageTextStyle.bold ? "bold":"",
      "--hoverTextColor":componentThemeConfig ? componentThemeConfig.pureColors[0] : pageTextStyle.themeColor,
      "--hoverFontFamily":pageTextStyle.fontFamily,
      "--hoverFontSize":pageTextStyle.fontSize+"px",
      "--hoverTextItalic":pageTextStyle.italic ? "italic":"",
      "--hoverTextLetterSpacing":pageTextStyle.letterSpacing+"px",
      "--hoverTextLineHeight":pageTextStyle.lineHeight+"px"
    };
  };
  const getActiveStyle=()=>{
    const {activeStyle:{pageBgColor,themePageBorder,pageTextStyle}}=styleConfig;
    return {
      "--activeBgColor":pageBgColor,
      "--activeBorderColor":componentThemeConfig ? componentThemeConfig.pureColors[0] : themePageBorder.color,
      "--activeBorderWidth":themePageBorder.width,
      "--activeTextBold":pageTextStyle.bold ? "bold":"",
      "--activeTextColor":componentThemeConfig ? componentThemeConfig.pureColors[0] : pageTextStyle.themeColor,
      "--activeFontFamily":pageTextStyle.fontFamily,
      "--activeFontSize":pageTextStyle.fontSize+"px",
      "--activeTextItalic":pageTextStyle.italic ? "italic":"",
      "--activeTextLetterSpacing":pageTextStyle.letterSpacing+"px",
      "--activeTextLineHeight":pageTextStyle.lineHeight+"px"
    };
  };
  const getPageSelectStyle=()=>{
    const {pageSelect:{pageSelectBgColor,pageSelectBorder,pageSelectTextStyle}}=styleConfig;
    return {
      "--selectBgColor":pageSelectBgColor,
      "--selectBorderColor": pageSelectBorder.color,
      "--selectBorderWidth":pageSelectBorder.width,
      "--selectTextBold":pageSelectTextStyle.bold ? "bold":"",
      "--selectTextColor":componentThemeConfig ? componentThemeConfig.textColor : pageSelectTextStyle.themeTextColor,
      "--selectFontFamily":pageSelectTextStyle.fontFamily,
      "--selectFontSize":pageSelectTextStyle.fontSize+"px",
      "--selectTextItalic":pageSelectTextStyle.italic ? "italic":"",
      "--selectTextLetterSpacing":pageSelectTextStyle.letterSpacing+"px",
      "--selectTextLineHeight":pageSelectTextStyle.lineHeight+"px"
    };
  };
  const getPageInfoText=()=>{
    const {pageInfoText :{pageInfoTextStyle}} = styleConfig;
    return {
      "--infoTextBold":pageInfoTextStyle.bold ? "bold":"",
      "--infoTextColor":componentThemeConfig ? componentThemeConfig.textColor : pageInfoTextStyle.themeTextColor,
      "--infoFontFamily":pageInfoTextStyle.fontFamily,
      "--infoFontSize":pageInfoTextStyle.fontSize+"px",
      "--infoTextItalic":pageInfoTextStyle.italic ? "italic":"",
      "--infoTextLetterSpacing":pageInfoTextStyle.letterSpacing+"px",
      "--infoTextLineHeight":pageInfoTextStyle.lineHeight+"px"
    };
  };

  /**
   * 处理交互事件
   * @param {*} page :当前页数
   * @param {*} pageSize ：当前页大小
   */
  const handleChange=(page,pageSize)=>{
    props.onChange({
      [pageKey]:page,
      [pageSizeKey]:pageSize
    });
  };
  useEffect(()=>{
    handleChange(1,10);
  },[]);

  return (
    <ConfigProvider locale={zhCN}>
      <Pagination
        className="comp-pagination"
        total={componentData[0][_fields]}
        showTotal={getShowTotal()}
        showSizeChanger={pageSizeSwitch}
        showQuickJumper={quickJump}
        size={size}
        onChange={handleChange}
        pageSizeOptions={getPageSizeOptions()}
        style={{
          "--pageBorderRadius":borderRadius+"%",
          ...getDefaultStyle(),
          ...getHoverStyle(),
          ...getActiveStyle(),
          ...getPageSelectStyle(),
          ...getPageInfoText()
        }}
      ></Pagination>
    </ConfigProvider>
  );
};
export {PaginationComp,ComponentDefaultConfig};
export default PaginationComp;
