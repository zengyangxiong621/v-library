import { memo } from 'react'
import './index.less'

import { connect } from 'dva'

import { TreeSelect } from "antd";

const DrillDownSetting = ({ bar }: any) => {
  const { panelStatesList } = bar
  const treeData: any = [
    {
      title: 'Node1',
      value: '0-0',
      key: '0-0',
    },
    {
      title: 'Node2',
      value: '0-1',
      key: '0-1',
    },
  ];
  return (
    <div className='DrillDownSetting-wrap'>
      <div className="level">
        <div className="level-title">下层组件：</div>
        <div className='treeSelect-wrap'>
          <TreeSelect
            treeData={treeData}
            // fieldNames={
            // { key: 'id', children: 'modules', label: 'name', value: 'id' }
            // }
            // onChange={val => { selectComponentChange(val, action) }}
            treeCheckable={true}
            showCheckedStrategy={TreeSelect.SHOW_PARENT}
            // value={action.component}
            placeholder=''
            style={{ width: '100%' }}
            dropdownClassName="action-select"
          />
        </div>
      </div>
    </div>
  )
}

export default memo(connect(({ bar }: any) => ({ bar }))(DrillDownSetting))