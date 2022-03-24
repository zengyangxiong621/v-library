import React, { memo, useState } from 'react'
import './index.css'
import { find } from '../../../../../utils/common'
import PositionSize from '../positionSize'
import LoadAnimation from '../loadAnimation'
import TextStyleSetting from '../textStyleSetting'
import AlignSetting from '../alignSetting'
import OutsideShadowSetting from '../outsideShadow'
import { EditableTable } from '../fieldMapTable'
import ComponentCard from '../componentCard'
import Checkbox from '../checkBox'

import componentLib from '../index'

import {
  Form,
  Collapse,
  Tabs,
  Switch
} from 'antd';


const componentConfig = {
  "title": "我是标题",
  "subtitle": "我是标题下面的说明",
  "config": [
    {
      "name": "style",
      "displayName": "样式",
      "value": [
        {
          "name": "dimension",
          "displayName": "位置尺寸",
          "type": "dimensionGroup",
          "config": {
            "lock": false
          },
          "value": [
            {
              "name": "left",
              "displayName": "X轴坐标",
              "value": 100
            },
            {
              "name": "top",
              "displayName": "Y轴坐标",
              "value": 100
            },
            {
              "name": "width",
              "displayName": "宽度",
              "value": 100
            },
            {
              "name": "height",
              "displayName": "高度",
              "value": 100
            }
          ]
        },
        {
          "name": "hideDefault",
          "displayName": "默认隐藏",
          "type": "checkBox",
          "value": false
        },
        {
          "name": "textStyle",
          "displayName": "文本样式",
          "type": "textFullStyleGroup",
          "value": [
            {
              "name": "fontFamily",
              "displayName": "",
              "value": "Microsoft Yahei"
            },
            {
              "name": "fontSize",
              "displayName": "",
              "value": 32
            },
            {
              "name": "color",
              "displayName": "",
              "type":"color",
              "value": "#000" // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
            },
            {
              "name": "bold",
              "displayName": "",
              "value": false
            },
            {
              "name": "italic",
              "displayName": "",
              "value": false
            },
            {
              "name": "letterSpacing",
              "displayName": "字距",
              "value": 0
            },
            {
              "name": "lineHeight",
              "displayName": "行距",
              "value": 48
            }
          ]
        },
        {
          "name": "align",
          "displayName": "对齐方式",
          "type": "alignFull",
          "value": [
            {
              "name": "textAlign",
              "displayName": "水平对齐",
              "type":"align",
              "value": "left" // left , center, right,bothEnds
            },
            {
              "name": "textVertical",
              "displayName": "垂直对齐",
              "type":"vertical",
              "value": "top" // top bottom vertical
            }
          ]
        },
        {
          "name": "shadow",
          "displayName": "阴影",
          "type": "shadow",
          "value": [
            {
              "name": "show",
              "displayName": "",
              "value": true,
              "type": "switch"
            },
            {
              "name": "shadow",
              "displayName": "外阴影",
              "type":"outsideShadow",
              "value": {
                "color": "#0075FF", // 这里如果设置了透明度，则需要返回 rgba(0,0,0,0.9)
                "vShadow": 0, // 垂直阴影的位置
                "hShadow": 0, // 水平阴影的位置
                "blur": 8 // 模糊的距离
              }
            }
          ]
        }
      ]
    },
    {
      "name": "interaction",
      "displayName": "交互",
      "value": {
        // 该部分实际上来自于layers设置
        "mountAnimation": {
          // 如果不存在载入动画，该项为null
          "delay": 2, // 延迟
          "direction": "right", // 方向
          "duration": 304, // 持续时间(ms)
          "opacityOpen": true, // 渐隐渐现
          "timingFunction": "ease", // 速率
          "type": "slide" // 动画类型
        }
      }
    },
    {
      "name": "data",
      "displayName": "数据",
      "value": {
        "data": [
          {
            "text": "我是文字组件111"
          }
        ],
        "fields": [
          {
            "name": "text",
            "value": "text",
            "desc": "文本",
            "status": true // 状态
          }
        ]
      }
    }
  ]
}


const SingleLayer = props => {
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelAlign: 'left'
  };

  const styleConfig = find(componentConfig.config, 'style').value
  const interactionConfig = find(componentConfig.config, 'interaction').value
  const dataConfig = find(componentConfig.config, 'data').value


  const settingsChange = () => {
    console.log('settingsChange', componentConfig)
  }

  const switchChange = (checked) => {
    console.log('switchChange', checked)
  }

  return (
    <div className="SingleLayer-wrap">
      <div className="content">
        <Tabs defaultActiveKey="1" type="card" className="custom-tabs">
          <TabPane tab="样式" key="1">
            <ComponentCard data={componentConfig}>
              {styleConfig.map((item,index) => {
                if (!(item.type && componentLib[item.type])) {
                  return null;
                }
                const TagName = componentLib[item.type];
                return (
                  <TagName data={item} onChange={settingsChange} key={index} />
                )
              })}
            </ComponentCard>
          </TabPane>
          <TabPane tab="数据" key="2">
            <ComponentCard data={componentConfig}>
              <EditableTable />
            </ComponentCard>
          </TabPane>
          <TabPane tab="交互" key="3">
            <ComponentCard data={componentConfig}>
              <Form className="custom-form" {...formItemLayout} colon={false}>
                <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
                  <Panel header="载入动画" key="1">
                    <LoadAnimation></LoadAnimation>
                  </Panel>
                </Collapse>
              </Form>
            </ComponentCard>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(SingleLayer)