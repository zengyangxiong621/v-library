import React, { memo, useState, useEffect, useRef } from 'react'
import './index.less'
import { Drawer, Input } from 'antd'
import { connect } from 'dva'
import { http } from '../../../../../../services/request'
import DataSourceConfig from '../../../../right/components/dataConfig/dataSourceConfig'
import DataResult from '../../../../right/components/dataConfig/dataResult'
import { CloseOutlined, LeftOutlined } from '@ant-design/icons'
import async from 'async'

const testData = {
  'name': '容器名称', // 容器名字
  'dataConfig': {}, // 数据源配置
  'dataType': 'static', // 数据类型
  'autoUpdate': {}, // 更新配置
  'staticData': {
    'data': [
      {
        'text': '数据容器',
      },
    ],
    'fields': [
      {
        'name': 'text',
        'value': 'text',
        'desc': '文本',
        'status': true,
      },
    ],
  }, // 静态数据
  'data': {}, // 非静态数据
  'events': [],
  'triggers': [],
  'useFilter': false, // 是否启用过滤器
  'filters': [],
}
const UpdateContainerDrawer = ({ bar, dispatch, ...props }) => {
  const inputRef = useRef(null)
  const [copyData, setCopyData] = useState(testData)
  const visible = props.visible
  useEffect(async () => {
    if (props.data === null) {
      setCopyData(testData)
    } else {
      if (Object.keys(props.data).length === 0) {
        // 新增
        const data = await http({
          method: 'post',
          url: '/visual/container/add',
          body: {
            dashboardId: bar.dashboardId,
          },
        })
        data.staticData = {
          'data': [
            {
              'text': '测试文本',
            },
          ],
          'fields': [
            {
              'name': 'text',
              'value': 'text',
              'desc': '文本',
              'status': true,
            },
          ],
        }
        setCopyData(data)
      } else {
        // 编辑
        setCopyData(props.data)
      }
    }
  }, [props.data])

  const addDataContainer = async () => {


  }

  const onClose = () => {

    props.onVisibleChange(false)
  }

  const updateDataContainer = async (body) => {
    const data = await http({
      url: '/visual/container/source',
      method: 'post',
      body,
    })
  }

  const handleDataTypeChange = async (value) => {
    console.log('handleDataTypeChange', value)

    setCopyData({ ...copyData, dataType: value })
    await updateDataContainer({ ...copyData, dataType: value })

  }
  const handleStaticDataChange = async(data) => {
    console.log('staticData', copyData.staticData)
    setCopyData({
      ...copyData, staticData: {
        ...copyData.staticData,
        data,
      },
    })
    await updateDataContainer({
      ...copyData, staticData: {
        ...copyData.staticData,
        data,
      },
    })
    console.log('handleStaticDataChange', data)

  }
  const handleDataSourceChange = async (dataConfig) => {
    setCopyData({ ...copyData, dataConfig })
    await updateDataContainer({
      ...copyData,
      data: dataConfig[copyData.dataType].data, // 必须要的
    })
    console.log('handleDataSourceChange', dataConfig)

  }
  return (
    <Drawer
      title={
        <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
          <LeftOutlined onClick={ onClose } className="g-cursor-pointer" style={ { fontSize: 12 } }/>
          数据容器
          <CloseOutlined onClick={ onClose } className="g-cursor-pointer" style={ {} }/>
        </div>
      }
      closable={ false }
      width={ 333 }
      placement="right"
      onClose={ onClose }
      visible={ props.visible }
      className="update-data-container-drawer"
      getContainer={ false }
      style={ { position: 'absolute' } }
      maskStyle={ { opacity: 0, animation: 'unset' } }
    >
      <div>
        <Input
          ref={ inputRef } value={ copyData.name }
          onChange={ (e) => setCopyData({ ...copyData, name: e.target.value }) }
          onPressEnter={ () => {
            updateDataContainer(copyData)
          } }
          onBlur={ () => {
            updateDataContainer(copyData)
          } }
        />
        <p className="data-source">数据源</p>
        <DataSourceConfig
          type="component"
          data={ copyData }
          onDataTypeChange={ handleDataTypeChange }
          onStaticDataChange={ handleStaticDataChange }
          onDataSourceChange={ handleDataSourceChange }
        />
        <DataResult data={ copyData }/>

      </div>

    </Drawer>
  )
}

export default connect(({ bar }) => ({ bar }))(UpdateContainerDrawer)
