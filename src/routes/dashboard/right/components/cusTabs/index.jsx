import React, { memo, useState } from 'react'
import './index.less'
import componentLib from '../index'

import {
  Tabs
} from 'antd';

const CusTabs = props => {
  const { TabPane } = Tabs;
  const _data = props.data;
  const _defaultActiveKey = _data.activeKey

  return (
    <Tabs className="cus-tabs" defaultActiveKey={_defaultActiveKey} >
      {_data.options.map(item => {
        return (
          <TabPane tab={item.name} key={item.key} >
            {item.value.map((jtem, index) => {
              if (!(jtem.type && componentLib[jtem.type])) {
                return null;
              }
              const TagName = componentLib[jtem.type];
              return (
                <TagName data={jtem} onChange={props.onChange} key={index} />
              )
            })}
          </TabPane>
        )
      })}
    </Tabs>
  )
}

export default memo(CusTabs)