import React, { memo, useState } from 'react'
import './index.less'
import { find } from '../../../../../utils/common'
import { findCurrentIndex, deepClone } from '@/utils/index'
import componentLib from '../index'
import {
  CopyOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import {
  Collapse,
  Tabs
} from 'antd';
import { tab } from '@testing-library/user-event/dist/tab'

const { Panel } = Collapse;
const { TabPane } = Tabs;


const TabArray = props => {
  const _data = props.data;
  const _defaultActiveKey = _data.defaultActiveKey
  const _disabled = _data.disabled
  let tabs = _data.value

  const _show = find(_data, 'switch', 'type')
  const _outsideShadow = find(_data, 'outsideShadow', 'type')
  const [activeKey, setActiveKey] = useState(_defaultActiveKey)
  const [unit, setUnit] = useState('列')
  const extraNode = () => {
    const handleIconClick = (type, e) => {
      e.preventDefault()
      e.stopPropagation()
      /*
        displayName: "列",
        key: "2",
        name: "row_2",
        type: "object",
        value: []
       */
      console.log('type', type)

      if (type === 'add') {
        const tabValue = tabs.find(tab => tab.key === activeKey)
        const copyValue = deepClone(tabValue)
        const unit = copyValue.displayName.replace(/\d/, '')
        copyValue.displayName = unit + (tabs.length + 1)
        copyValue.key = String(tabs.length + 1)
        tabs.push(copyValue)
      }
      if (type === 'delete') {
        const index = tabs.findIndex(tab => tab.key === activeKey)
        tabs.splice(index, 1)
        setActiveKey(String(index - 1 > 1 ? index - 1 : 1))
      }
      tabs.forEach((tab, index) => {
        const unit = tab.displayName.replace(/\d/, '')
        setUnit(unit)
        tab.displayName = unit + (index + 1)
        tab.key = String(index + 1)
      })
      props.onChange()
    }

    return (
      <div className="g-flex g-items-center" style={{ display: _disabled ? 'none' : 'block' }}>
        <DeleteOutlined style={{ fontSize: 16 }} className="g-px-4" onClick={(e) => handleIconClick('delete', e)} />
        <PlusOutlined style={{ fontSize: 16 }} onClick={(e) => handleIconClick('add', e)} />
      </div>
    )
  }

  const handleTabClick = (key, e) => {
    console.log('key', key)
    setActiveKey(key)
  }

  return (
    <Collapse accordion className="custom-collapse" defaultActiveKey={_defaultActiveKey}>
      <Panel header={_data.displayName} key="1" extra={extraNode()}>
        <Tabs defaultActiveKey={activeKey} onTabClick={handleTabClick}>
          {
            tabs.map(tab => (
              <TabPane tab={tab.displayName} key={tab.key} style={{ paddingTop: 16 }} >
                {
                  tab.value.map((item, index) => {
                    if (!(item.type && componentLib[item.type])) {
                      return null;
                    }
                    const TagName = componentLib[item.type];
                    return (
                      <TagName data={item} onChange={props.onChange} key={index} />
                    )
                  })
                }
              </TabPane>
            ))
          }
        </Tabs>
      </Panel>
    </Collapse>
  )
}
/*
{allTabs.map((item, index) => {
          if (!(item.type && componentLib[item.type])) {
            return null;
          }
          const TagName = componentLib[item.type];
          return (
            <TagName data={item} onChange={props.onChange} key={index} />
          )
        })}
 */

export default memo(TabArray)
