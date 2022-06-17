/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react'
import './index.less'
import { BASEURL } from '@/services/request'
import { connect } from 'dva'

import { Input, Select, Upload, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'


import LeftTree from './components/LeftTree';
import RightContent from './components/rightContent'

const { Option } = Select
// 功能
const MyApplication = ({ resourceCenter, dispatch, history }: any) => {
  // 空间id
  let spaceId = 1
  // TODO 后端目前默认是倒排，后续可能需要更改
  // UI图上默认是按照修改时间排
  const [sortMap, setSortMap] = useState<any>({
    updated_time: false
  })
  const [inputValue, setInputValue] = useState('')
  const [uploadFileUrl, setUploadFileUrl] = useState('')

  // 获取模板列表数据的方法
  const getDataDispatch = (finalBody: any) => {
    dispatch({
      type: 'resourceCenter/getTemplateList',
      payload: finalBody
    })
  }

  // 页面初始化- 请求模板列表数据
  useEffect(() => {
    dispatch({
      type: 'resourceCenter/resetModel',
      payload: {
        curSelectedGroup: ['-1'],
        curSelectedGroupName: '全部应用'
      }
    })
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId: spaceId,
      map: sortMap,
      groupId: null
    }
    getDataDispatch(finalBody)
  }, [])

  // 搜索框的值改变
  const changeSearchValue = (e: any) => {
    setInputValue(e.target.value)
  }
  // 当切换任意分组时，都需要清除输入框里的值
  const clearSearchInputState = () => {
    setInputValue('')
  }
  // 搜索应用
  const search = (value: string) => {
    const groupId = resourceCenter.curSelectedGroup[0] === '-1' ? null : resourceCenter.curSelectedGroup[0]
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      name: value,
      map: sortMap,
      groupId,
    }
    getDataDispatch(finalBody)
  }
  // 选择排序的标准
  const selectSortType = (value: any, b: any) => {
    const newSortMap = {
      [value]: false
    }
    setSortMap(newSortMap)
    // 选择新标准后，需要发送一次请求
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      map: newSortMap
    }
    dispatch({
      type: 'resourceCenter/getTemplateList',
      payload: finalBody
    })
  }
  /**
   * description:  刷新左侧分组列表和右侧应用列表
   */
  const refreshList = () => {
    const transformId = resourceCenter.curSelectedGroup[0] === '-1' ? null : resourceCenter.curSelectedGroup[0]
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId: transformId
    }
    dispatch({
      type: 'resourceCenter/getTemplateList',
      payload: finalBody,
    })
    dispatch({
      type: 'resourceCenter/getGroupTree',
      payload: {
        spaceId
      }
    })
  }
  return (
    <div className='resourceCenter-wrap'>
      <div className="left">
        {/* 左侧树 */}
        <LeftTree clearSearchInputState={clearSearchInputState} />
        <LeftTree clearSearchInputState={clearSearchInputState} />
      </div>
      <div className="right">
        <div className="right-header">
          <div className='set-flex'>
            <p className='title'>{resourceCenter.curSelectedGroupName || '全部应用'}</p>
          </div>
          <div className="add-search">
            <div className='custom-btn'>
              <PlusOutlined style={{ fontSize: '12px', marginRight: '2px' }} />
              <span>上传素材</span>
            </div>
            <div className="search-wrap">
              <Input.Search
                value={inputValue}
                onChange={changeSearchValue}
                placeholder="搜索"
                className='search'
                allowClear
                maxLength={40}
                onSearch={search}
              ></Input.Search>
              <Select className='db-select' defaultValue="按修改时间排序" onChange={selectSortType}>
                <Option value="updated_time">按修改时间排序</Option>
                <Option value="created_time">按新建时间排序</Option>
              </Select>
            </div>
          </div>
        </div>
        {/* 右侧 */}
        <RightContent listData={resourceCenter.templateList} />
      </div>
    </div>
  )
}

export default memo(connect(
  ({ resourceCenter }: any) => ({ resourceCenter })
)(MyApplication))
