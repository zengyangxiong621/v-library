import { memo } from 'react'
import './listItem.less'

import { Checkbox } from 'antd'

const listItem = ({ itemData, clickCheckbox }: any) => {

  const { name, v } = itemData
  // 点击每一项时， 需要将 复选框当前的状态传出去
  const listItemOnChange = ((eTarget: any) => {
    itemData.checked = !itemData.checked
    clickCheckbox(itemData)
  })
  return (
    <div className='list-item-wrap'>
      <Checkbox checked={itemData.checked} onChange={(e) => listItemOnChange(e.target)}>{name}</Checkbox>
      <span>{v}</span>
    </div>
  )
}

export default memo(listItem)