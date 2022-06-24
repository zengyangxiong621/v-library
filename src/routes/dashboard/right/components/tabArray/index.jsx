import React, {memo, useState} from 'react'
import './index.less'
import {find} from '../../../../../utils/common'
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

const {Panel} = Collapse;
const {TabPane} = Tabs;


const TabArray = props => {
  const _data = props.data;
  const _defaultActiveKey = _data.defaultActiveKey
  let tabs = _data.value

  const _show = find(_data, 'switch', 'type')
  const _outsideShadow = find(_data, 'outsideShadow', 'type')
  const [activeKey, setActiveKey] = useState(_defaultActiveKey)
  const extraNode = () => {
    const handleIconClick = (type, e) => {
      e.preventDefault()
      e.stopPropagation()
      if (type === 'add') {
        tabs.push(tabs[0])
      }
      if (type === 'delete') {
        const index = tabs.findIndex(tab => tab.key === activeKey)
        tabs.splice(index, 1)
      }
      if (type === 'copy') {
        const tabValue = tabs.find(tab => tab.key === activeKey)
        tabs.push(tabValue)
      }
      props.onChange()
    }

    return (
      <div className="g-flex g-items-center">
        <CopyOutlined style={{fontSize: 16}} onClick={(e) => handleIconClick('copy', e)}/>
        <DeleteOutlined style={{fontSize: 16}} className="g-px-4" onClick={(e) => handleIconClick('delete', e)}/>
        <PlusOutlined style={{fontSize: 16}} onClick={(e) => handleIconClick('add', e)}/>
      </div>
    )
  }

  const handleTabClick = (key, e) => {
    setActiveKey(key)
  }

  return (
    <Collapse accordion className="custom-collapse" defaultActiveKey={_defaultActiveKey}>
      <Panel header={_data.displayName} key="1" extra={extraNode()}>
        <Tabs defaultActiveKey={activeKey} onTabClick={handleTabClick}>
          {
            tabs.map(tab => (
              <TabPane tab={tab.name} key={tab.key}>
                {
                  tab.value.map((item, index) => {
                    if (!(item.type && componentLib[item.type])) {
                      return null;
                    }
                    const TagName = componentLib[item.type];
                    return (
                      <TagName data={item} onChange={props.onChange} key={index}/>
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
