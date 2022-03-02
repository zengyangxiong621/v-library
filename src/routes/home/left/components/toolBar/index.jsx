import React, { memo, useEffect } from 'react'
import './index.css'

import { Tooltip } from 'antd'
import { UpOutlined, DownOutlined } from '@ant-design/icons'

import { connect } from 'dva'

const ToolBar = ({ dispatch, bar, operate, data, getActiveIcon, needBottomBorder=true }) => {
  const notBannedClick = bar.key.length > 0
  return (
  <div className='ToolBar'  style={{
    borderBottom: needBottomBorder ?  '1px solid red' : ''
  }}>
      {
        data.map(o => {
          return (
            <Tooltip  key={o.title} title={ o.title } color='white' placement='bottomRight'>
              {
                o.title === '展开/收缩'
                ?
                <span
                  onClick={() => {
                    getActiveIcon(o.title)
                  }}
                  className={`every-icon`}
                >{React.createElement(o.icon)}
                </span>
                :
                <span style={{ cursor: notBannedClick ? '' : 'not-allowed'}}>
                <span
                  onClick={() => {
                    getActiveIcon(o.title)
                  }}
                  className={`${notBannedClick ? '': 'banned-click'} every-icon`}
                >{React.createElement(o.icon)}
                </span>
              </span>
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
