import React from 'react'
import EC from '../../../EC'
import * as echarts from 'echarts';
import ComponentDefaultConfig from './config'

const InstrumentPanel6=(props)=>{
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { data } = componentConfig.staticData
  // 最新字段
  const finalFieldsArr = props.fields || ['title', 'value','unit']

  const originData = props.comData || data
  const firstData = originData[0]
  const titleText = firstData[finalFieldsArr[0]]??''
  const numberValue =firstData[finalFieldsArr[1]]??''
  const unitValue=firstData[finalFieldsArr[2]] ??''

  const allSettingConfig=config.find(item=>item.name==="allSettings")?.options
  const getAllSettingConfigMap=(configArr)=>{
    const res={}
    configArr.forEach(config=>{
      const {name,value}=config
      if(Array.isArray(config.value)){
        res[name]=getAllSettingConfigMap(value)
      }else{
        res[name]=value
      }
    })
    return res
  }
  const configMap=getAllSettingConfigMap(allSettingConfig)
  
  const keduConfig=configMap['刻度']
  const yuanhuanConfig=configMap['圆环']
  const shizhiConfig=configMap['数值']
  const zhizhenConfig=configMap['指针']
  const biaotiConfig=configMap['标题']

  // 圆环配置
  const setYunhuanConfig=()=>{
    const {axisLine:{axisLineWidth,axisLineColor},progress:{progressWidth,color},radius}=yuanhuanConfig
    const {colorOne,colorTwo}=color
    return {
      radius:`${radius}%`,
      axisLine:{
        show:true,
        lineStyle:{
          color:[[1,axisLineColor]],
          width:axisLineWidth
        }
      },
      progress:{
        show:true,
        width:progressWidth,
        itemStyle:{
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                  offset: 0,
                  color: colorOne // 0% 处的颜色
              },
    
              {
                  offset: 1,
                  color: colorTwo // 100% 处的颜色
              }
              ],
            global: false // 缺省为 false
          }
        }
      }
    }
  }
  // 刻度配置
  const setKeduConfig=()=>{
    const {keduDistance,keduColor,axisTick,splitLine,axisLabel,numberRange}=keduConfig
    const getAxisTickConfig=axisTick.show?{
      splitNumber:axisTick.axisTickNum,
      length:axisTick.axisTickLength,
      distance:keduDistance,
      lineStyle:{
        color:keduColor,
        width:axisTick.axisTickWidth
      }
    }:{}
    const getSplitLineConfig=splitLine.show?{
      length:splitLine.splitLineLength,
      distance:keduDistance,
      lineStyle:{
        color:keduColor,
        width:splitLine.splitLineWidth
      }
    }:{}
    const getaxisLabelConfig=axisLabel.show ? {
      distance:axisLabel.distance,
      color:axisLabel.axisLabelText.color,
      fontFamily:axisLabel.axisLabelText.fontFamily,
      fontSize:axisLabel.axisLabelText.fontSize,
      fontWeight:axisLabel.axisLabelText.fontWeight
    }:{}
    return {
      max:numberRange.max,
      min:numberRange.min,
      axisTick:getAxisTickConfig,
      splitLine:getSplitLineConfig,
      axisLabel:getaxisLabelConfig
    }
  }
  // 指针配置
  const setZhizhenConfig=()=>{
    const {anchorColor,anchorSize,anchorBorder}=zhizhenConfig
    const {color,type,width}=anchorBorder
    return {
      anchor: {
        show: true,
        showAbove: true,
        size: anchorSize,
        itemStyle: {
          color:anchorColor,
          borderColor:color,
          borderWidth: width,
          borderType:type
        }
      }
    }
  }
  // 标题配置
  const setTitleConfig=()=>{
    const {offset,textStyleTitle}=biaotiConfig
    return {
      textStyle:{
        color: textStyleTitle.color,
        fontSize: textStyleTitle.fontSize,
        fontFamily: textStyleTitle.fontFamily,
        fontWeight: textStyleTitle.bold ? 'bold' : 'normal',
        fontStyle: textStyleTitle.italic ? 'italic' : 'normal',
      },
      padding:[offset.vertical,offset.horizontal]
    }
  }
  // 数值配置
  const setShuzhiConfig=()=>{
    const {numberStyles:{showNumberStyles,offset,textStylerNumber},unitStyles:{padding,textStyleUnit,showUnitStyles}}=shizhiConfig
    const getNumStyle=showNumberStyles?{
      color: textStylerNumber.color,
      fontSize: textStylerNumber.fontSize,
      fontFamily: textStylerNumber.fontFamily,
      fontWeight: textStylerNumber.bold ? 'bold' : 'normal',
      fontStyle: textStylerNumber.italic ? 'italic' : 'normal',
    }:{}
    const getUnitStyle=showUnitStyles?{
      color: textStyleUnit.color,
      fontSize: textStyleUnit.fontSize,
      fontFamily: textStyleUnit.fontFamily,
      fontWeight: textStyleUnit.bold ? 'bold' : 'normal',
      fontStyle: textStyleUnit.italic ? 'italic' : 'normal',
      padding: [padding.top, padding.right, padding.bottom, padding.left],
    }:{}
    return {
      rich:{
        num:getNumStyle,
        unit:getUnitStyle
      },
      offsetCenter:[offset.horizontal, offset.vertical]
    }
  }
  
  const getOption=()=>{
    return {
      title:{
        show: true,
        text: titleText,
        left: '50%',
        top: '60%',
        textAlign: 'center',
        ...setTitleConfig()
      },
      series: [
        {
          type: 'gauge',
          ...setYunhuanConfig(),
          ...setKeduConfig(),
          ...setZhizhenConfig(),
          detail: {
            valueAnimation:true,
            formatter: function (value) {
              return '{num|'+value+'}'+'{unit|'+unitValue+'}';
            },
            ...setShuzhiConfig()
          },
          data: [
            {
              value: numberValue
            }
          ]
        }
      ]
    }
  }

  const onChartReady = echarts => {
  };
  const onChartClick = (param, echarts) => {
  }
  let onEvents = {
    click: onChartClick
  }
  return (
    <EC
      option={getOption()}
      onChartReady={onChartReady}
      onEvents={onEvents}
    />
  )
}
export default InstrumentPanel6
export {
  InstrumentPanel6,
  ComponentDefaultConfig
}
