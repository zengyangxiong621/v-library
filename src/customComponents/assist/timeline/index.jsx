import React, { useState, useEffect } from 'react';
import { Timeline } from 'antd';
import './index.css'

export default function TimelineRender(props) {
  const {componentConfig,comData}=props
  const { config,staticData } = componentConfig
  const {data}=staticData

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
  const {dimension,backgroundColor,labelStyle,fontStyle}=style

  const positionStyle=dimension

  const {title:{styleController:titleStyle,align,outShadow}}=fontStyle
  const {content:{styleController:contentStyle}}=fontStyle
  const {label:{styleController:timeStyle,show,labelOutShadow}}=labelStyle


  const getShadowVal=(dom)=>{
    const {color,vShadow,hShadow,blur}=dom['shadow']
    return `${hShadow}px ${vShadow}px ${blur}px ${color}`
  }
  // const getLabelShadow=()=>{
  //   const {color,vShadow,hShadow,blur}=labelOutShadow.shadow
  //   const shadowVal=`${hShadow}px ${vShadow}px ${blur}px ${color}`
  //   return shadowVal
  // }
  // const getContentTitleShadow=()=>{
  //   const {color,vShadow,hShadow,blur}=outShadow.shadow
  //   const shadowVal=`${hShadow}px ${vShadow}px ${blur}px ${color}`
  //   return shadowVal
  // }


  return (
    <Timeline
      mode='left'
      className='timeLineContainer'
      style={positionStyle}>
      {data.map(item=>{
        const timeLineTitleStyle=outShadow.show ? {...titleStyle,...align,textShadow:getShadowVal(outShadow)}:{...titleStyle,...align}
        const labelStyle=labelOutShadow.show? {...timeStyle,textShadow:getShadowVal(labelOutShadow)}:timeStyle
        return (
        <Timeline.Item label={show && item.time} style={labelStyle}>
          <div className='timeLineBox' style={{backgroundColor}}>
            <div className='timeLineTitle' style={timeLineTitleStyle}>{item.title}</div>
            <div className='timeLineContent' style={contentStyle}>{item.content}</div>
          </div>
        </Timeline.Item>
        )
      })}
    </Timeline>
  )
}

