import React, { memo, useState, useEffect, useRef } from 'react'
import { connect } from 'dva'
import './index.less'

import {
  Drawer,
  Collapse,
  Button,
} from 'antd';

import {
  CloseOutlined,
} from '@ant-design/icons'

import ThemeItem from './themeItem'

import { cloneDeep } from 'lodash'
import { v4 as uuidv4 } from 'uuid';
import { http } from '../../../../services/request'

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
let componentThemeId = null
const ComponentTheme = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;

  const drawerRef = useRef(null)
  const [activeId, setActiveId] = useState(null)
  const [themeList, setThemeList] = useState([])
  useEffect(() => {
    if (props.visible) {
      console.log('init---------')
      setThemeList(themeListTmp)
    }
  }, [props.visible])

  useEffect(() => {
    componentThemeId = bar.themeId
  }, [bar.themeId])

  const onClose = () => {
    setActiveId(null)
    props.onChange(false)
    // 如果当前画布没有使用主题风格及画布配置themeId为空或不存在，设置bar.componentThemeConfig = null
    // 如果画布配置themeId不为空，则把themeId对应的主题风格写入bar.componentThemeConfig中
    let componentThemeConfig = null
    if (componentThemeId) {
      componentThemeConfig = themeList.filter(theme => theme.id === componentThemeId)[0]
    }
    dispatch({
      type: 'bar/save',
      payload: {
        componentThemeConfig
      }
    })
  }

  const onActiveIdChange = id => {
    setActiveId(id)
    const currentTheme = themeList.filter(theme => theme.id === id)[0]
    dispatch({
      type: 'bar/save',
      payload: {
        componentThemeConfig: currentTheme
      }
    })
  }

  const onComfirm = async () => {
    // TODO: 调用后端接口，保存当前主题的id到画布配置themeId中，同时把当前主题的id更新到bar.themeId中
    // activeId 当前主题的id
    dispatch({
      type: 'bar/save',
      payload: {
        themeId: activeId
      }
    })
    componentThemeId = activeId
    // const data = await http({
    //   url: '/visual/module/filter/update',
    //   method: 'POST',
    //   body: {
    //     id,
    //     name,
    //     callbackKeys,
    //     content,
    //     dashboardId: bar.dashboardId
    //   }
    // })
    onClose()
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
                themeList.length ?
                  themeList.map(theme => {
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
              <div className="com-theme-empty-info">
                暂无数据
              </div>
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

