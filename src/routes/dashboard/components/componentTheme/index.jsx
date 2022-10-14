import React, { memo, useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.less'
import {
  Drawer,
  Collapse,
  Button,
  message,
} from 'antd';

import {
  CloseOutlined,
} from '@ant-design/icons'

import ThemeItem from './themeItem'

import { cloneDeep } from 'lodash'
import { http } from '../../../../services/request'
import { find } from '../../../../utils/common'
import { deleteAllComponentThemeConfigs, getComponentThemeConfigs } from '@/utils/syncJitStorage'

const themeListTmp = [
  {
    id: '1',
    type: "system",  // system  custom
    title: "标准",
    pureColors: ['#2A9EFF', '#00FFFF', '#C7F6E5', '#4E84D4', '#FFD564', '#FF9D50', '#FF6666'],
    gradientColors: [
      [
        {
          color: '#2A9EFF',
          offset: 0,
        },
        {
          color: 'rgba(42,158,255,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#00FFFF',
          offset: 0,
        },
        {
          color: 'rgba(0,255,255,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#C7F6E5',
          offset: 0,
        },
        {
          color: 'rgba(199,246,229,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#4E84D4',
          offset: 0,
        },
        {
          color: 'rgba(78,132,212,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FFD564',
          offset: 0,
        },
        {
          color: 'rgba(255,213,100,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FF9D50',
          offset: 0,
        },
        {
          color: 'rgba(255,157,80,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FF6666',
          offset: 0,
        },
        {
          color: 'rgba(255,102,102,0.10)',
          offset: 100,
        }
      ]
    ],
    textColor: '#cccccc',
    assistColor: '#999999',
    gridColor: '#4B4E61',
    backgroundColor: '#222430'
  },
  {
    id: '2',
    type: "system",  // system  custom
    title: "黄色",
    pureColors: ['#FFD03B', '#FF693B', '#EFF4FF', '#FDEDBE', '#C6FF00', '#7E7E7E', '#FFBB86'],
    gradientColors: [
      [
        {
          color: '#FFD03B',
          offset: 0,
        },
        {
          color: 'rgba(255,208,59,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FF693B',
          offset: 0,
        },
        {
          color: 'rgba(255,105,59,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#EFF4FF',
          offset: 0,
        },
        {
          color: 'rgba(239,244,255,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FDEDBE',
          offset: 0,
        },
        {
          color: 'rgba(253,237,190,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#C6FF00',
          offset: 0,
        },
        {
          color: 'rgba(198,255,0,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#7E7E7E',
          offset: 0,
        },
        {
          color: 'rgba(126,126,126,0.10)',
          offset: 100,
        }
      ],
      [
        {
          color: '#FFBB86',
          offset: 0,
        },
        {
          color: 'rgba(255,187,134,0.10)',
          offset: 100,
        }
      ]
    ],
    textColor: '#cccccc',
    assistColor: '#999999',
    gridColor: '#4B4E61',
    backgroundColor: '#000000'
  }
]
const ComponentTheme = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;

  const drawerRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [themeData, setThemeData] = useState({})
  useEffect(() => {
    if (props.visible) {
      getThemeList()
    }
  }, [props.visible])

  const getThemeList = async () => {
    const curWorkspace = localStorage.getItem('curWorkspace')
    const spaceId = JSON.parse(curWorkspace).id
    const data = await http({
      url: `/visual/theme/list/${spaceId}`,
      method: 'get',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    setThemeData(data)
  }


  const onClose = () => {
    deleteAllComponentThemeConfigs()
    setActiveId(null)
    props.onChange(false)
    // 设置bar.componentThemeConfig = null
    dispatch({
      type: 'bar/save',
      payload: {
        componentThemeConfig: null
      }
    })
  }

  const onActiveIdChange = id => {
    setActiveId(id)
    const currentTheme = [...themeData.custom, ...themeData.system].filter(theme => theme.id === id)[0]
    dispatch({
      type: 'bar/save',
      payload: {
        componentThemeConfig: currentTheme
      }
    })
  }

  const onComfirm = async () => {
    const currentTheme = [...themeData.custom, ...themeData.system].filter(theme => theme.id === activeId)[0]
    // 保存页面配置
    const dashboardConfig = cloneDeep(bar.dashboardConfig)
    const pageBgConfig = find(dashboardConfig, 'styleColor')
    pageBgConfig.value = currentTheme.backgroundColor
    const pageConfigParams = {
      config: dashboardConfig,
      dashboardId: bar.dashboardId
    }
    const { config } = await http({
      url: '/visual/application/update',
      method: 'post',
      body: pageConfigParams,
    })
    dispatch({
      type: 'bar/save',
      payload: {
        dashboardConfig: config
      }
    })

    // 更新组件样式配置信息
    const componentsStyleLists = Object.values(getComponentThemeConfigs())

    const { components } = await http({
      url: `/visual/application/dashboard/detail/${bar.dashboardId}`,
      method: "get",
    });
    // bug fix：主题切换还有携带被删除组件的参数这个情况出现
    const finalCompoentsStyleLists = componentsStyleLists.filter(com => {
      const ids = components.map(item => item.id)
      return ids.includes(com.id)
    })

    const componentsStyleParams = {
      configs: finalCompoentsStyleLists,
      dashboardId: bar.dashboardId
    }
    await http({
      url: '/visual/module/update',
      method: 'post',
      body: componentsStyleParams
    })
    deleteAllComponentThemeConfigs()

    // 更新组件的配置
    /*    await dispatch({
          type: 'bar/getDashboardDetails',
          payload: bar.dashboardId
        })*/
    componentsStyleLists.forEach((component) => {
      bar.fullAmountComponents.find(item => item.id === component.id).config = component.config
    })
    // 显示页面设置
    await dispatch({
      type: 'bar/save',
      payload: {
        key: [],
        isPanel: false,
        selectedComponentOrGroup: [],
        fullAmountComponents: bar.fullAmountComponents
      }
    })
    onClose()
    message.success('主题应用成功')
  }

  return (
    <div className="com-theme-wrap">
      <Drawer
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            <span />
            主题风格
            <CloseOutlined onClick={onClose} className="g-cursor-pointer" />
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={props.visible}
        ref={drawerRef}
        className="com-theme-drawer"
        getContainer={false}
        style={{ position: 'absolute' }}
        width={332}
        maskStyle={{ animation: 'unset' }}
      >
        <div className="com-theme-body-wrapper">
          <Collapse defaultActiveKey={['1', '2']} className='custom-collapse'>
            <Panel header="系统主题" key="1">
              {
                themeData?.system && themeData?.system.length ?
                  themeData.system.map(theme => {
                    return <ThemeItem
                      key={theme.id}
                      detail={theme}
                      activeId={activeId}
                      onActiveIdChange={onActiveIdChange}
                    />
                  })
                  :
                  <div className="com-theme-empty-info">
                    暂无数据
                  </div>
              }


            </Panel>
            {/* <Panel header="自定义主题" key="2">
            {
                themeData?.custom && themeData?.custom.length ?
                  themeData.custom.map(theme => {
                    return <ThemeItem
                      key={theme.id}
                      detail={theme}
                      activeId={activeId}
                      onActiveIdChange={onActiveIdChange}
                    />
                  })
                  :
                  <div className="com-theme-empty-info">
                    暂无数据
                  </div>
              }
            </Panel> */}
          </Collapse>
          <div className="com-theme-footer">
            {/* <div className="add-custom-com-theme">
              <Button type="primary" ghost>
                +自定义主题
              </Button>
            </div> */}
            <div className="com-theme-opt-btn">
              <Button style={{ marginRight: '16px' }} onClick={onClose}>取消</Button>
              <Button style={{ marginRight: '16px' }} onClick={onComfirm} type="primary">确认应用</Button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default connect(({ bar }) => ({
  bar
}))(ComponentTheme)

