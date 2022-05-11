/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react'
import './index.less'
import { BASE_URL, useFetch } from '../../utils/useFetch'
import { connect } from 'dva'

import { Input, Select, Upload, message } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'


import LeftTree from './components/LeftTree';
import RightContent from './components/rightContent'

const { Option } = Select
// 功能
const MyApplication = ({ dashboardManage, dispatch, history }: any) => {
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
      type: 'dashboardManage/getTemplateList',
      payload: finalBody
    })
  }

  // 页面初始化- 请求模板列表数据
  useEffect(() => {
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId: spaceId,
      map: sortMap
    }
    getDataDispatch(finalBody)
    // setTimeout(() => {
    //   alert('hhhh')
    // }, 3000);
  }, [])

  // 新建应用
  const addDashboard = () => {
    history.push('/template')
  }

  // 导入应用
  const importDashboard = () => {
    console.log('导入应用');
  }

  // 搜索框的值改变
  const changeSearchValue = (e: any) => {
    setInputValue(e.target.value)
  }
  // 当切换任意分组时，都需要清除输入框里的值
  const clearSearchInputState = () => {
    setInputValue('')
  }
  // 搜索应用
  const search = () => {
    const groupId = dashboardManage.curSelectedGroup[0] === '-1' ? null : dashboardManage.curSelectedGroup[0]
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      name: inputValue,
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
      type: 'dashboardManage/getTemplateList',
      payload: finalBody
    })
  }

  const importAppUploadprops = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'image/png, image/jpeg',
    action: `${BASE_URL}/visual/file/upload`,
    beforeUpload(file: any) {
      const { name }: { name: string } = file
      // 考虑 cdb.la...yer.json 这个文件名
      const lastPointIndex = name.lastIndexOf('.')
      const nameSuffix = name.slice(lastPointIndex)
      if (['png', 'jpg', 'gif', 'jpeg', 'webp', 'svg'].includes(nameSuffix)) {
        message.error({
          content: '请上传符合格式的图片',
          duration: 2
        })
        file.status = 'error'
        return false
      }
    },
    async onChange(info: any) {
      const { status, response } = info.file;
      console.log('info', info);
      if (status === 'done') {
        console.log('上传应用的结果', response.data);
        setUploadFileUrl(response.data)
        // TODO 应用上传成功了，需要重新刷新下应用列表(立马刷新后端数据可能不能及时更新，设置延迟？)
        let file = new Blob(['我是一个blob'], {type: 'text/plain'})
        const formData = new FormData()
        formData.append('avatar', 'cdb')
        formData.append('file', file)
        const [, data] = await useFetch(`/visual/application/import/${spaceId}`, {
          headers: {
            // 'Content-Type': 'multipart/form-data'
          },
          body: formData
        })
        console.log('上传一个文件试试先', data);

      } else if (status === 'error') {
        message.error(`应用上传失败`);
      }
    },
    onRemove(file: any) {
      setUploadFileUrl('')
    }
  }
  return (
    <div className='MyApplication-wrap' id='myApplicationPage'>
      <div className="left">
        {/* 左侧树 */}
        <LeftTree clearSearchInputState={clearSearchInputState} />
      </div>
      <div className="right">
        <div className="right-header">
          <div className='set-flex'>
            <p className='title'>全部应用</p>
            <Upload {...importAppUploadprops}>
              <div className='custom-btn set-mr' onClick={importDashboard}>
                <span>导入应用</span>
              </div>
            </Upload>
          </div>
          <div className="add-search">
            <div className='custom-btn' onClick={addDashboard}>
              <PlusOutlined style={{ fontSize: '12px', marginRight: '2px' }} />
              <span>新建应用</span>
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
        <RightContent listData={dashboardManage.templateList} />
      </div>
    </div>
  )
}

export default memo(connect(
  ({ dashboardManage }: any) => ({ dashboardManage })
)(MyApplication))
