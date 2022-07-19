import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import ComponentDefaultConfig from './config'
import './index.css'

const spotDom=(spotStyle)=>{
  const {color,width}=spotStyle
  const getSpotStyle={
    "display":"inline-block",
    "width":width,
    "height":width,
    "border":`${width/4}px solid ${color}`,
    "borderRadius":'50%',
    "backgroundColor":'transparent'
  }
  return (
    <span style={getSpotStyle}></span>
  )
}

export default function TimelineRender(props) {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config,staticData } = componentConfig
  const componentData = props.comData || staticData.data  // 过滤后的数据
  const _fields = props.fields
  const getStyle=(config)=>{
    const style={}
    if(Array.isArray(config)){
      config.forEach(item=>{
        if(Array.isArray(item.value)){
          style[item.name]=getStyle(item.value)
        }else if(item.options && Array.isArray(item.options)){
          item.options.forEach(item=>{
            style[item.key]=getStyle(item.value)
          })
        }else{
          style[item.name]=item.value
        }
      })
    }
    return style
  }

  const style=getStyle(config)
  console.log(style);
  const {dimension,backgroundColor,labelStyle,fontStyle,spotStyle}=style

  const positionStyle=dimension

  const {title:{styleController:titleStyle,align,outShadow}}=fontStyle
  const {content:{styleController:contentStyle}}=fontStyle
  const {label:{styleController:timeStyle,show,labelOutShadow}}=labelStyle

  const formatPxStyle=(Obj)=>{
    Object.keys(Obj).forEach(item=>{
      if(typeof Obj[item]==='number'){
        Obj[item]=Obj[item]+'px'
      }
    })
  }

  const getShadowVal=(dom)=>{
    const {color,vShadow,hShadow,blur}=dom['shadow']
    return `${hShadow}px ${vShadow}px ${blur}px ${color}`
  }
  const getArrowStyle=(color)=>{
    return {
      position: 'absolute',
      right: '100%',
      top: 0,
      borderTop: `5px solid ${color}`,
      borderRight: `5px solid ${color}`,
      borderBottom: '5px solid transparent',
      borderLeft: '5px solid transparent'
    }
  }
  const getTitleLineStyle=(textStyle)=>{
    return {
      position: 'absolute',
      width: '8px',
      height: '60%',
      backgroundColor:textStyle.color,
      boxShadow:textStyle.textShadow
    }
  }

  const getTimeLineTitleStyle=(isOutShadow)=>{
    formatPxStyle(titleStyle)
    const baseStyle={
      ...titleStyle,...align
    }
    return isOutShadow ? {...baseStyle,textShadow:getShadowVal(outShadow)}:baseStyle
  }
  const getLableStyle=(isLabelOutShadow)=>{
    formatPxStyle(timeStyle)
    return isLabelOutShadow ? {...timeStyle,textShadow:getShadowVal(labelOutShadow)}:timeStyle
  }

  formatPxStyle(contentStyle)

  return (
    <Timeline
      mode='left'
      className='timeLineContainer'
      style={positionStyle}>
      {componentData?.map(item=>{
        const timeLineTitleStyle=getTimeLineTitleStyle(outShadow.show)
        const labelStyle=getLableStyle(labelOutShadow.show)
        return (
        <Timeline.Item dot={spotDom(spotStyle)} label={show && item[_fields[0]]} style={labelStyle}>
          <div className='timeLineBox' style={{backgroundColor,borderColor:backgroundColor}}>
            <div className='timeLineArrow' style={getArrowStyle(backgroundColor)}></div>
            <div className='timeLineTitle' style={timeLineTitleStyle}>
              <div className='titleLine' style={getTitleLineStyle(timeLineTitleStyle)}></div>
              <span className='titleVal'>{item[_fields[1]]}</span>
            </div>
            <div className='timeLineContent' style={contentStyle}>{item[_fields[2]]}</div>
          </div>
        </Timeline.Item>
        )
      })}
    </Timeline>
  )
}

export { ComponentDefaultConfig }

