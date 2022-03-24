import React, { memo, useState } from 'react'
import './index.less'
import { find } from '../../../../../utils/common'
import OutsideShadowSetting from '../outsideShadow'

import {
  Collapse,
  Switch
} from 'antd';

const ShadowSetting = props => {
  const { Panel } = Collapse;
  const _data = props.data;
  const _show = find(_data, 'switch', 'type')
  const _outsideShadow = find(_data, 'outsideShadow', 'type')

  const [show, setShow] = useState(_show.value)

  const switchChange = (checked, e) => {
    setShow(checked)
    _show.value = checked
    e.preventDefault()
    e.stopPropagation()
    props.onChange()
  }

  return (
    <Collapse accordion className="custom-collapse" defaultActiveKey={['1']} >
      <Panel header="阴影" key="1" extra={<Switch checked={show} onChange={(checked, e) => switchChange(checked, e)} />}>
        <OutsideShadowSetting data={_outsideShadow} onChange={props.onChange} />
      </Panel>
    </Collapse>
  )
}

export default memo(ShadowSetting)