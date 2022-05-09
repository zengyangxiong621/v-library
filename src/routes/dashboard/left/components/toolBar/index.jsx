import React, { memo, useEffect } from 'react'
import './index.less'

import { Tooltip } from 'antd'
import { IconFont } from '../../../../../utils/useIcon'

import { connect } from 'dva'

const ToolBar = ({ dispatch, bar, operate, data, getActiveIcon, iconSize, needBottomBorder = true }) => {
  const notBannedClick = bar.key.length > 0
  return (
    <div className='ToolBar' style={{
      borderBottom: needBottomBorder ? '1px solid black' : ''
    }}>
      {
        data.map(o => {
          return (
            <Tooltip key={o.key} title={o.text}
              placement='bottomRight'>
              {
                <div style={{ cursor: notBannedClick ? 'pointer' : 'not-allowed' }}>
                  <IconFont
                    type={o.icon}
                    onClick={() => {
                      getActiveIcon(o.key)
                    }}
                    style={{
                      fontSize: iconSize //图标大小
                    }}
                    className={`${notBannedClick ? 'not-banned-click' : 'banned-click'} every-icon`}
                  />
                  {/* <span
                  onClick={() => {
                    getActiveIcon(o.key)
                  }}
                  style={{
                    fontSize:iconSize //图标大小
                  }}
                  className={`${notBannedClick ? 'not-banned-click':'banned-click'} every-icon iconfont ${o.icon}`}
                >
                </span> */}
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
  ({ bar, operate }) => ({ bar, operate })
)(ToolBar))
