import React, { memo, useState } from 'react'
import './index.less'
import { find } from '../../../../../utils/common'
import componentLib from '../index'

import {
  Collapse,
  Switch
} from 'antd';

const CusCollapse = props => {
  const { Panel } = Collapse;
  const _data = props.data;
  const _defaultActiveKey = _data.defaultExpand ? ['1'] : []
  const _show = find(_data, 'switch', 'type')
  const _outsideShadow = find(_data, 'outsideShadow', 'type')
  const [show, setShow] = useState(_show?.value || false)
  const extraNode = _data.hasSwitch ? (<Switch checked={show} onChange={(checked, e) => switchChange(checked, e)} />) : null
  const otherNode = _data.value.filter((node, index) => index !== 0)

  const switchChange = (checked, e) => {
    setShow(checked)
    _show.value = checked
    e.preventDefault()
    e.stopPropagation()
    props.onChange()
  }

  const CollapseNode=(
    otherNode.map((item, index) => {
      if (!(item.type && componentLib[item.type])) {
        return null;
      }
      const TagName = componentLib[item.type];
      return (
        <TagName data={item} onChange={props.onChange} key={index} />
      )
    })
  )
  return (
    <Collapse accordion className="custom-collapse" defaultActiveKey={_defaultActiveKey} >
      <Panel header={_data.displayName} key="1" extra={extraNode}>
        {
          _data.isHide? _show.value && CollapseNode: CollapseNode
        }
      </Panel>
    </Collapse>
  )
}

export default memo(CusCollapse)