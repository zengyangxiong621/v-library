import React, { memo, useState, useEffect, useRef } from 'react'
import './index.less'
import { Drawer, Button, Input } from 'antd'
import {
  CloseOutlined, SearchOutlined,
} from '@ant-design/icons'

const _vdata = [
  {
    "callbackParam": "a",   // 变量名
    "destinationModules": [  // 目标组件
      {
        "id": 0,
        "name": "目标组件1"
      },
      {
        "id": 1,
        "name": "目标组件2"
      }
    ],
    "sourceModules": [ // 源组件
      {
        "id": 1,
        "name": "源组件1"
      }
    ]
  },
  {
    "callbackParam": "b",   // 变量名
    "destinationModules": [  // 目标组件
      {
        "id": 0,
        "name": "目标组件2"
      }
    ],
    "sourceModules": [ // 源组件
      {
        "id": 2,
        "name": "源组件2"
      }
    ]
  }
]

let orginalDataList = []

const CallbackArgs = (props) => {
  const drawerRef = useRef(null)
  const [inputValue, setInputValue] = useState('')
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    console.log('props.visible', props.visible)
    if (props.visible) {
      getDataList()
    }
  }, [props.visible])

  const getDataList = async () => {
    // todo 调用接口获取回调列表
    orginalDataList = _vdata
    setDataList(_vdata)
  }

  const onClose = () => {
    setInputValue('')
    handleSearch('')
    props.onChange(false)
  }

  const handleSearch = (value) => {
    setDataList(orginalDataList.filter(item => {
      return item.callbackParam.indexOf(value) !== -1
    }))
  }

  const componentClick = source => {
    // todo 画布上高亮显示当前的组件
  }

  return (
    <div className="data-container-wrap">
      <Drawer
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            <span />
            全局回调参数管理
            <CloseOutlined onClick={onClose} className="g-cursor-pointer" />
          </div>
        }
        placement="right"
        closable={false}
        onClose={onClose}
        visible={props.visible}
        ref={drawerRef}
        className="data-container-drawer"
        getContainer={false}
        style={{ position: 'absolute' }}
        width={520}
        maskStyle={{ animation: 'unset' }}
      >
        <div className="data-container-body-wrapper">
          <div className="data-container-handle">
            <Input
              placeholder="请输入"
              maxLength={30}
              suffix={<SearchOutlined
                className="input-search-icon"
                onClick={() => handleSearch(inputValue)}
              />}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              allowClear
              onSearch={(e) => handleSearch(e.target.value)}
              onPressEnter={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="cbArgs-table">
            {
              dataList.length ?
                <table>
                  <thead>
                    <tr>
                      <th>源组件</th>
                      <th>回调参数</th>
                      <th>目标组件</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dataList.map((item, index) => {
                        return <tr key={index}>
                          <td>
                            {item.sourceModules.length ?
                              item.sourceModules.map(component => {
                                return <div key={component.id} className="component-item">
                                  <Button title={component.name} onClick={component => componentClick(component)}>{component.name}</Button>
                                </div>
                              }) : '无对应组件'
                            }
                          </td>
                          <td>{item.callbackParam}</td>
                          <td>
                            {item.destinationModules.length ?
                              item.destinationModules.map(component => {
                                return <div key={component.id} className="component-item">
                                  <Button title={component.name} onClick={component => componentClick(component)}>{component.name}</Button>
                                </div>
                              }) : '无对应组件'
                            }
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                : '暂无数据'
            }
          </div>

        </div>
      </Drawer>
    </div>
  )
}

export default CallbackArgs

