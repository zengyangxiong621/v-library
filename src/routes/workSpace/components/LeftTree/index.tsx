import { memo, useEffect, useState } from 'react'
import './index.less'
import { connect } from 'dva'

import { useFetch } from '../../../../utils/useFetch'

import Node from '../node/index'

import { Tree } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import workspace from '../../../../models/workspace'


// 全部应用 和 未分组两项应该固定
// 后面自定义的组， 应该可以支持拖拽并且 选中右边任意一个card的拖拽图标的时候树这边的这些组应该处于被框选状态

const LeftTree = ({ workSpace, dispatch, clearSearchInputState }: any) => {
  // TODO  暂定，待确定如何获取spaceId后重写
  const spaceId = '1'
  // 获取应用分组列表
  useEffect(() => {
    refreshWorkSpaceLists()
  }, [])

  // 新建分组或者重命名成功分组，触发刷新
  const refreshWorkSpaceLists = () => {
    dispatch({
      type: 'workSpace/getWorkSpaceList',
      payload: {
        spaceId
      }
    })
  }
  // 添加分组
  // 创建一个占位数据
  const addWorkSpace = () => {
    const mockItem: any = {
      groupId: 'aInput',
      name: "占位的input",
    }
    // 插入的输入框是在数组的倒数第二个位置
    const origin = workSpace.workSpaceList[0].children
    if (origin[origin.length - 2].groupId === 'aInput') {
      // debugger
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
    if (!e.selected) return
    const { node } = e
    if (node.key === 'aInput' || node.name === '占位的input' || node.key === 'wrap') {
      return
    }
    // 应用列表作为分组树的最外层,后端数据中不存在，由前端构造的特殊id(wrap)
    const key = keys[0]
    if (key === 'wrap') return
    // 每次切换分组，都要将搜索框内的值清除掉
    clearSearchInputState()
    // 全部分组后端的数据里是-1, 但是要求传值时为Null
    const groupId = key === '-1' ? null : key
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId
    }
    dispatch({
      type: 'workSpace/getTemplateList',
      payload: finalBody
    })
    // 每次变更选中的分组时，将当前分组保存至models中
    dispatch({
      type: 'workSpace/setCurSelectedGroup',
      payload: keys
    })
  }
  return (
    <div className='LeftTree-wrap'>
      {
        workSpace.workSpaceList.length > 0 &&
        <Tree
          blockNode
          defaultExpandedKeys={['wrap']}
          defaultSelectedKeys={['-1']}
          // defaultExpandAll={customExpandAll}
          treeData={workSpace.workSpaceList}
          switcherIcon={<DownOutlined />}
          fieldNames={{
            title: 'name',
            key: 'id'
          }}
          onSelect={selectTreeNode}
          titleRender={(nodeData: any) => (
            <Node
              refreshWorkSpaceLists={refreshWorkSpaceLists}
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