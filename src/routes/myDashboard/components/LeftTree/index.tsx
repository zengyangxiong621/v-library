import { memo } from 'react'
import './index.less'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'

import Node from '../node/index'
// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = (props: any) => {
  return (
    <div className='LeftTree-wrap'>
      <Tree
        blockNode
        treeData={treeData}
        switcherIcon={<DownOutlined />}
        titleRender={(nodeData: any) => (<Node {...nodeData}></Node>)}
      >
      </Tree>
    </div>
  )
}

const treeData =
  [
    {
      title: '应用列表',
      key: '0',
      id: '0',
      children: [
        {
          title: '全部应用',
          key: '0-1',
          id: '0-1',
          counts: 10,
        },
        {
          title: '数据监控',
          id: '0-2',
          key: '0-2',
          counts: 3,
        },
        {
          title: '未分组',
          id: '0-3',
          key: '0-3',
          counts: 5,
        },
      ],
    },
  ]
export default memo(LeftTree)