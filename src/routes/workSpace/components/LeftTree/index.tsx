import { memo, useEffect, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import Node from '../node/index'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'


// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = ({ workSpace, dispatch, refreshMemberList, userInfo }: any) => {
  // TODO  暂定，待确定如何获取spaceId后重写
  const spaceId = '1'
  let accountId = userInfo.id
  // 获取应用分组列表
  // useEffect(() => {
  //   refreshWorkSpaceLists()
  // }, [])

  // 新建分组或者重命名成功分组，触发刷新
  const refreshWorkSpaceLists = () => {
    dispatch({
      type: 'workSpace/getWorkSpaceList',
      payload: {
        accountId
      }
    })
  }
  // 添加分组
  // 创建一个占位数据
  const addWorkSpace = () => {
    const mockItem: any = {
      id: 'aInput',
      name: "占位的input",
    }
    // 插入的输入框是在数组的倒数第二个位置
    const origin = workSpace.workSpaceList[0].children
    if (origin[origin.length - 2].id === 'aInput') {
      workSpace.workSpaceList[0].children.splice(-2, 1)
      const temp = JSON.parse(JSON.stringify(workSpace.workSpaceList))
      dispatch({
        type: 'workSpace/setWorkSpaceList',
        payload: temp
      })
      return
    }
    // 增加一个占位数据
    workSpace.workSpaceList[0].children.splice(-1, 0, mockItem)
    const temp = JSON.parse(JSON.stringify(workSpace.workSpaceList))
    dispatch({
      type: 'workSpace/setWorkSpaceList',
      payload: temp
    })
  }

  const selectTreeNode = (keys: any, e: any) => {
    // 如果是取消选择直接中止
    if (!e.selected) {
      return
    }
    const { key, name, projectQuota, remainQuota }: any = e.node
    if (key === 'aInput' || key === 'wrap' || name === '占位的input' || key === 'wrap') {
      return
    }
    // 应用列表作为分组树的最外层,后端数据中不存在，由前端构造的特殊id(wrap)
    // 重新设置  配额、成员列表
    dispatch({
      type: 'workSpace/setBaseTypeKey',
      payload: {
        projectQuota,
        remainQuota,
      }
    })
    // 每次变更选中的分组时，将当前分组保存至models中
    dispatch({
      type: 'workSpace/setCurWorkSpace',
      payload: keys
    })
    // 发送请求刷新右侧成员列表
    refreshMemberList(key)
  }
  return (
    <div className='workspace-leftTree-wrap'>
      {
        workSpace.workSpaceList.length > 0 &&
        <Tree
          blockNode
          defaultExpandedKeys={['wrap']}
          treeData={workSpace.workSpaceList}
          selectedKeys={workSpace.curWorkSpace}
          switcherIcon={<DownOutlined />}
          fieldNames={{
            title: 'name',
            key: 'id'
          }}
          onSelect={selectTreeNode}
          titleRender={(nodeData: any) => (
            <Node
              refreshWorkSpaceLists={refreshWorkSpaceLists}
              accountId={accountId}
              addWorkSpace={addWorkSpace}
              {...nodeData}>
            </Node>)}
        >
        </Tree>
      }
    </div>
  )
}

export default memo(connect(
  ({ workSpace }: any) => ({ workSpace })
)(LeftTree))