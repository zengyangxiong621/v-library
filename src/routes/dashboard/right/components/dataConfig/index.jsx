import React, { memo, useState, useEffect } from 'react'
import './index.less'

import { EditableTable } from '../fieldMapTable'
import DataSourceConfig from './dataSourceConfig'
import DataResult from './dataResult'

const DataConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data;
  console.log('_data', _data)
  const _fields = _data.staticData.fields

  const fieldsChange = () => {
    console.log('_fields', _fields)
  }

  return (
    <React.Fragment>
      <div className="data-config" style={{ marginTop: 0 }}>
        <div className="data-header">
          <label className="data-name">数据接口</label>
          <span className="data-interface"><i></i>配置完成</span>
        </div>
        <div className="data-content">
          <EditableTable data={_fields} onChange={fieldsChange} />
        </div>
      </div>
      <DataSourceConfig
        data={_data}
        onDataTypeChange={props.onDataTypeChange}
        onStaticDataChange={props.onStaticDataChange}
        onDataSourceChange={props.onDataSourceChange}
      />
      <DataResult data={_data}/>
    </React.Fragment>
  )
}

export default memo(DataConfig)
