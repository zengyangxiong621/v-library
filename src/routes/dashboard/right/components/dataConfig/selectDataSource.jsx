import React, { memo, useState, useEffect } from 'react'
import './index.less'
import CusSelect from '../cusSelect'
import {
  Button
} from 'antd';

import AddDataSource from '../../../../tempDataSource/components/addDataSource'
import debounce from 'lodash/debounce';
import { http } from '../../../../../models/utils/request';

const selectData = {
  name: "xxx",
  displayName: '数据源',
  type: 'select',
  value: '',
  options: [
    // {
    //   name: '静态数据',
    //   value: 'static'
    // }
  ]
}

const SelectDataSource = props => {
  const [selectDatas, setSelectDatas] = useState(selectData)
  const [isShowAddModal, setIsShowAddModal] = useState(false)

  useEffect(() => {
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
        type: ['MYSQL','POSTGRESQL'].includes(props.type) ? 'RDBMS':props.type,
      }
    })
    console.log('content', content)
    if(['MYSQL','POSTGRESQL'].includes(props.type)){
      content = content.filter(item=>{
        return item.rdbmsSourceConfig.dataBaseType === props.type
      })
    }
    const options = content.map(item => {
      return {
        name: item.name,
        value: item.id
      }
    })
    const newData = { ...selectDatas }
    newData.options = options
    setSelectDatas(newData)
  }

  const dataSourceChange = () => {
    console.log('selectDatas', selectDatas)
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
      <CusSelect data={selectDatas} onChange={dataSourceChange} style={{ width: '130px', marginLeft: '12px' }}>
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