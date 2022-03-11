import React, { memo, useEffect } from 'react'
import './index.css'

import { Tooltip } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import { connect } from 'dva'

const ToolBar = ({ dispatch, bar, operate, data, getActiveIcon, needBottomBorder=true }) => {
  const notBannedClick = bar.key.length > 0
  return (
  <div className='ToolBar'  style={{
    borderBottom: needBottomBorder ?  '1px solid black' : ''
  }}>
      {
        data.map(o => {
          return (
            <Tooltip  key={o.key} title={ o.text } color='white' placement='bottomRight'>
              {
                <div style={{ cursor: notBannedClick ? 'pointer' : 'not-allowed'}}>
                <span
                  onClick={() => {
                    getActiveIcon(o.key)
                  }}
                  className={`${notBannedClick ? '':'banned-click'} every-icon iconfont ${o.icon}`}
                >
                </span>
              </div>
              }
            </Tooltip>
          )
        })
      }
  </div>
  )
}


export default memo(connect(
  ({bar, operate}) => ({bar, operate})
)(ToolBar))
