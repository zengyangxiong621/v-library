import React, { memo, useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { find } from '../../../../../utils/common'
import BackgroundColor from '../color'
import UploadImg from '../uploadImg'
import CusInputNumber from '../cusInputNumber'
import RadioGroup from '../radioGroup'
import { deepClone } from '../../../../../utils'
import { Form, Button } from 'antd'
import debounce from 'lodash/debounce'
import { http } from '../../../../../services/request'
import { v4 as uuidv4 } from 'uuid'
import ComponentCard from '../componentCard'
import componentLib from '../index'

const dashboardId = window.location.pathname.split('/')[2]

let isSettingsChange = false
const ReferenceSetting = ({ bar, dispatch, ...props }) => {
  const formItemLayout = {
    labelAlign: 'left',
  }
  const panelConfig = bar.panelConfig
  const { config: {left, top, width, height, hideDefault}, states } = panelConfig
  const styleConfig = [
    {
      'displayName': '位置尺寸',
      'name': 'dimension',
      'type': 'dimensionGroup',
      'config': {
        'lock': false,
      },
      'value': [
        {
          'displayName': 'X轴坐标',
          'name': 'left',
          'value': left,
        },
        {
          'displayName': 'Y轴坐标',
          'name': 'top',
          'value': top,
        },
        {
          'displayName': '宽度',
          'name': 'width',
          'value': width,
        },
        {
          'displayName': '高度',
          'name': 'height',
          'value': height,
        },
      ],
    },
    {
      'displayName': '默认隐藏',
      'name': 'hideDefault',
      'type': 'checkBox',
      'value': hideDefault,
    },
    {
      'displayName': '引用列表',
      'name': 'referenceList',
      'type': 'tabArray',
      "defaultActiveKey": "1",
      "config": {
        "template": [
          {
            "key": `1`,
            "displayName": `应用1`,
            "name": "tab",
            "type": "object",
            "value": [
              {
                "displayName": "应用选择",
                "name": "dashboardSelect",
                "type": "select",
                "value": "",
                "options": bar.allDashboardList.filter(item => item.id !== panelConfig.id)
              }
            ],
          }
        ]
      },
      "value": [
        {
          "key": `1`,
          "displayName": `应用1`,
          "name": "tab",
          "type": "object",
          "value": [
            {
              "displayName": "应用选择",
              "name": "dashboardSelect",
              "type": "select",
              "value": "",
              "options": bar.allDashboardList.filter(item => item.id !== panelConfig.id)
            }
          ],
        }
      ].concat(states.map((item, index) => (
        {
          "key": `${index + 2}`,
          "displayName": `应用${index + 2}`,
          "name": "tab",
          "type": "object",
          "value": [
            {
              "displayName": "应用选择",
              "name": "dashboardSelect",
              "type": "select",
              "value": item.id,
              "options": bar.allDashboardList.filter(item => item.id !== panelConfig.id)
            }
          ],
        }
      )))
    },
    // {
    //   "displayName": "编辑引用应用",
    //   "name": "editDashboard",
    //   "type": "button",
    //   "buttonType": "",
    //   "tooltip": {
    //     "show":
    //   },
    //   "style": {
    //
    //   }
    // }
  ]
  const [key, setKey] = useState(uuidv4())
  const [form] = Form.useForm()

  useEffect(() => {
    if (!isSettingsChange) {
      setKey(uuidv4())
    }
  }, [bar.panelConfig])

  const styleChange = debounce(async () => {
    const dimensionConfig = styleConfig.find(item => item.name === 'dimension').value
    const hideDefault = styleConfig.find(item => item.name === 'hideDefault').value
    const referenceList = styleConfig.find(item => item.name === 'referenceList').value.map(item => {
      const data = item.value.find(it => it.name === 'dashboardSelect')
      return {
        id: data.value,
        name: data.label
      }
    } )
    console.log('referenceList', referenceList)
    dimensionConfig.forEach(item => {
      panelConfig.config[item.name] = item.value
    })
    panelConfig.config.hideDefault = hideDefault
    panelConfig.states = referenceList
    const { config: { left, top, width, height } } = panelConfig
    dispatch({
      type: 'bar/save',
      payload: {
        panelConfig,
        scaleDragData: {
          position: {
            x: left,
            y: top,
          },
          style: {
            width,
            height,
            display: 'block',
          },
        },
      },
    })
    await http({
      url: '/visual/panel/update',
      method: 'post',
      body: {
        dashboardId: bar.dashboardId,
        configs: [
          panelConfig,
        ],
      },
    })
  }, 300)

  // const saveStyleData = async (param) => {
  //   const params = {
  //     configs: [param],
  //     dashboardId: dashboardId
  //   }
  //   await http({
  //     url: '/visual/module/update',
  //     method: 'post',
  //     body: params
  //   })
  // }
  const handleEditDashboard = () => {
    const referenceList = styleConfig.find(item => item.name === 'styleConfig')
    const defaultActiveKey = referenceList.defaultActiveKey
    const currentReference = referenceList.value.find(item => item.key === defaultActiveKey)
    const currentReferenceId = currentReference.find(item => item.name === 'dashboardSelect').value
    if (currentReferenceId) {
      window.open(`/dashboard/${currentReferenceId}`)
    }
  }
  return (
    <div className="dynamic-wrap">
      <h3 className="dynamic-set-header">
        引用面板设置
      </h3>
      <div className="content" key={ key }>
        <Form
          className="custom-form"
          form={ form }
          { ...formItemLayout }
          colon={ false }
        >
          <ComponentCard data={ panelConfig }
                         allModulesConfig={ bar.moduleDefaultConfig }
                         dispatch={ dispatch }>
            { styleConfig.map((item, index) => {
              if (!(item.type && componentLib[item.type])) {
                return null
              }
              const TagName = componentLib[item.type]
              return (
                <TagName data={ item } onChange={ styleChange } key={ index }/>
              )
            }) }
          </ComponentCard>
          <div className="g-text-left g-m-4">
            提示：所选应用必须为已发布状态
          </div>
          <Button onClick={handleEditDashboard} className="g-my-2" type="primary" style={{width: "calc(100% - 24px)"}}>编辑引用应用</Button>
        </Form>
      </div>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar,
}))(ReferenceSetting)

