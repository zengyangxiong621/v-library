import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CusSelect from '../cusSelect'
import {
  Button
} from 'antd';

import AddDataSource from '../../../../tempDataSource/components/addDataSource'
import { http } from '../../../../../models/utils/request';
import { v4 as uuidv4 } from 'uuid';

const selectData = {
  name: "xxx",
  displayName: '数据源',
  type: 'select',
  value: '',
  options: []
}

const SelectDataSource = props => {
  const _data = props.data
  const [selectDatas, setSelectDatas] = useState(selectData)
  const [isShowAddModal, setIsShowAddModal] = useState(false)
  const [key, setKey] = useState(uuidv4())

  useEffect(() => {
    const newData = { ...selectDatas }
    if (_data.dataConfig[props.type]) {
      newData.value = _data.dataConfig[props.type]?.data?.data_id || ''
    }
    setSelectDatas(newData)
    setKey(uuidv4())
    queryDataSource()
  }, [props.type])

  const queryDataSource = async () => {
    let { content } = await http({
      url: '/visual/datasource/list',
      method: 'post',
      body: {
        map: {},
        name: null,
        pageNo: 1,
        pageSize: 1000,
        spaceId: 1,
        type: ['elasticSearch'].includes(props.type)
            ? 'ELASTIC_SEARCH' : props.type.toUpperCase(),
      }
    })
    console.log('content', content)
    const options = content.map(item => {
      if (props.type === 'api') {
        return {
          name: item.name,
          value: item.id,
          baseUrl: item.apiSourceConfig.baseUrl
        }
      }
      return {
        name: item.name,
        value: item.id,
      }
    })
    const newData = { ...selectDatas }
    newData.options = options
    setSelectDatas(newData)
  }

  const dataSourceChange = () => {
    console.log('selectDatas', selectDatas)
    const dataSource = selectDatas.options.find(item => item.value === selectDatas.value)
    props.onChange(dataSource)
  }

  const addDataSource = () => {
    console.log('addDataSource')
    setIsShowAddModal(true)
  }

  // 关闭数据源弹窗
  const changeShowState = () => {
    setIsShowAddModal(false)
  }

  return (
    <div className="data-select-source">
      <CusSelect key={key} data={selectDatas} onChange={dataSourceChange} style={{ width: '144px' }}>
        <Button onClick={addDataSource} type="primary" className="okBtn" style={{ width: '70px', marginLeft: '7px', float: 'right' }}>新建</Button>
      </CusSelect>
      <AddDataSource
        visible={isShowAddModal}
        changeShowState={changeShowState}
        refreshTable={queryDataSource}
      />
    </div>
  )
}

export default memo(SelectDataSource)