import { memo, useEffect, useState } from 'react'
import './index.less'

import { useFetch } from '../../../../utils/useFetch'

import Node from '../node/index'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'


// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = (props: any) => {
  // TODO  暂定，待确定如何获取spaceId后重写
  const spaceId = '1'

  const [finalTree, setFinalTree] = useState([])
  const [originTree, setOriginTree] = useState<any[]>([])
  let [isRefreshGroupList, setIsRefreshGroupList] = useState<number>(0)
  // 获取应用分组列表
  useEffect(() => {
    const GetData = async () => {
      const [, data] = await useFetch(`/visual/application/queryGroupList?spaceId=${spaceId}`, {
        method: 'get',
      })
      // 拿到数据之后
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
    }
    GetData()
  }, [isRefreshGroupList])

  // 新建分组或者重命名成功分组，触发刷新
  const refreshList = () => {
    setIsRefreshGroupList(isRefreshGroupList += 1)
  }
  // 添加分组
  // 创建一个占位数据
  const addGroup = () => {
    const mockItem: any = {
      groupId: 'aInput',
      name: "占位的input",
    }
    originTree.splice(-1, 0, mockItem)
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

  const selectTreeNode = (keys: any) => {
    console.log('value', keys);
  }

  return (
    <div className='LeftTree-wrap'>
      <Tree
        blockNode
        defaultExpandAll={true}
        treeData={finalTree}
        switcherIcon={<DownOutlined />}
        fieldNames={{
          title: 'name',
          key: 'groupId'
        }}
        onSelect={selectTreeNode}
        titleRender={(nodeData: any) => (
          <Node
            refreshList={refreshList}
            addGroup={addGroup}
            {...nodeData}>
          </Node>)}
      >
      </Tree>
    </div>
  )
}

export default memo(LeftTree)