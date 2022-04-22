import { memo, useEffect, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'

import Node from '../node/index'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'


// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = ({ dashboardManage, dispatch }: any) => {
  // TODO  暂定，待确定如何获取spaceId后重写
  const spaceId = '1'

  const [finalTree, setFinalTree] = useState([])
  const [originTree, setOriginTree] = useState<any[]>([])
  // 获取应用分组列表
  useEffect(() => {
    dispatch({
      type: 'dashboardManage/getGroupTree',
      payload: {
        spaceId: 1
      }
    })
    setOriginTree(dashboardManage.groupList)
  }, [])

  // 新建分组或者重命名成功分组，触发刷新
  const refreshList = () => {
    dispatch({
      type: 'dashboardManage/getGroupTree',
      payload: {
        spaceId: 1
      }
    })
  }
  // 添加分组
  // 创建一个占位数据
  const addGroup = () => {
    const mockItem: any = {
      groupId: 'aInput',
      name: "占位的input",
    }
    dashboardManage.groupList.splice(-1, 0, mockItem)
  }

  const selectTreeNode = (keys: any) => {
    // 应用列表作为分组树的最外层,后端数据中不存在，由前端构造的特殊id(wrap)
    const key = keys[0]
    if (key === 'wrap') return
    // 全部分组后端的数据里是-1, 但是要求传值时为Null
    const groupId = key === '-1' ? null : key
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId
    }
    dispatch({
      type: 'dashboardManage/getTemplateList',
      payload: finalBody
    })
  }

  return (
    <div className='LeftTree-wrap'>
      <Tree
        blockNode
        defaultExpandAll={true}
        treeData={dashboardManage.groupList}
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

export default memo(connect(
  ({ dashboardManage }: any) => ({ dashboardManage })
)(LeftTree))