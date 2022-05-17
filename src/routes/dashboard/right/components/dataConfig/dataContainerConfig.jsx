import { useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import { Select, Button } from 'antd'

const { Option } = Select

const DataContainerConfig = ({ bar, dispatch, ...props }) => {
  const _data = props.data
  useEffect(() => {

  }, [])
  const handleChange = () => {

  }
  return (
    <div className="data-container-config">
      <div className="data-container-select g-flex g-justify-between g-items-center g-mt-4"
           style={ { display: 'flex' } }>
        <div style={{minWidth: '73px'}} className="g-text-left">数据容器</div>
        <Select
          mode="multiple"
          className="g-flex-1 g-mr-2"
          onChange={ handleChange }
          style={ { flex: 1 } }
        >
          {
            bar.dataContainerList.map(item => (
                <Option value={ item.id }>
                  { item.name }
                </Option>
              ),
            )
          }
        </Select>
        <Button>+新建</Button>
      </div>
      <div className="data-container-list">

      </div>
    </div>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(DataContainerConfig)
