import { memo, useEffect, useState } from 'react'
import './index.less'

import Node from '../node/index'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const { TreeNode } = Tree

// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = (props: any) => {

  const [finalTree, setFinalTree] = useState([])
  const [originTree, setOriginTree] = useState<any[]>([])
  // 获取树结构
  useEffect(() => {
    // 请求回来的数据
    // const {data} = xxxxx
    const data: any = [
      {
        groupId: -1,
        name: "全部应用",
        number: 3,
        systemDefined: true
      },
      {
        groupId: 0,
        name: '西域白驼山',
        number: 1,
        systemDefined: false,
      },
      {
        groupId: 0,
        name: '东海桃花岛',
        number: 2,
        systemDefined: false,
      },
      {
        groupId: 0,
        name: "未分组",
        number: 3,
        systemDefined: true
      }
    ]
    setOriginTree(data)
    const treeData: any =
      [
        {
          groupId: 'wrap',
          name: '应用列表',
          children: data
        },
      ]
    setFinalTree(treeData)
  }, [])

  const addGroup = () => {
    const mockItem: any = {
      groupId: 'aInput',
      name: "占位的input",
    }
    console.log('aaaaa', originTree);
    originTree.splice(-1, 0, mockItem)
    console.log('oooooooo', originTree);

    const treeData: any =
      [
        {
          groupId: 'wrap',
          name: '应用列表',
          children: originTree
        },
      ]
    setFinalTree(treeData)
  }


  return (
    <div className='LeftTree-wrap'>
      <Tree
        blockNode
        treeData={finalTree}
        switcherIcon={<DownOutlined />}
        fieldNames={{
          title: 'name',
        }}
        titleRender={(nodeData: any) => (<Node addGroup={addGroup} {...nodeData}></Node>)}
      >
        {/* {
          <TreeNode title={
            treeData.map((item: any) => {
              return <Node {...item}></Node>
            })

          }>
          </TreeNode>
        } */}
      </Tree>
    </div>
  )
}

export default memo(LeftTree)