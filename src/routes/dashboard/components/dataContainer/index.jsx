import React, {memo, useState, useEffect} from 'react';
import {connect} from 'dva'
import './index.less'
import {Form, Drawer, Select, Button, Input, Modal, message} from 'antd';
import {
  CloseOutlined, LeftOutlined, AudioOutlined, SearchOutlined
} from '@ant-design/icons';
import DataContainerItem from './components/dataContainerItem'
import {http} from '../../../../models/utils/request'
import UpdateContainerDrawer from "./components/updateContainerDrawer";
import ManageContainerDrawer from "./components/manageContainerDrawer";
import ModalConfirm from '../../../../components/modalConfirm'
const {Search} = Input;

const DataContainer = ({bar, dispatch, ...props}) => {
  const [itemVisible, setItemVisible] = useState(false);
  const [manageVisible, setManageVisible] = useState(false);
  const [itemData, setItemData] = useState(null);
  const [inputValue, setInputValue] = useState('')
  useEffect(async () => {
    if (props.visible && bar.dataContainerList.length === 0) {
      dispatch({
        type: 'bar/getDataContainerList'
      })
    }
    // setDataContainerList([
    //   {
    //     id: '1',
    //     name: '数据容器1数据容器1数据容器1数据容器1数据容器1',
    //     enable: true,
    //     dataType: 'static',
    //     useFilter: true,
    //     triggers: null,
    //     events: null,
    //   },
    //   {
    //     id: '2',
    //     name: '数据容器2',
    //     enable: true,
    //     dataType: 'static',
    //     useFilter: true,
    //     triggers: null,
    //     events: null,
    //   },
    //   {
    //     id: '3',
    //     name: '数据容器3',
    //     enable: true,
    //     dataType: 'static',
    //     useFilter: true,
    //     triggers: null,
    //     events: null,
    //   },
    // ])

    // setDataContainerList(data)
  }, [props.visible])

  const showDrawer = () => {
    props.onChange(true)
  };

  const onClose = () => {
    props.onChange(false)
  };
  const handleSearchValueChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleSearch = () => {

  }
  const handleContainerClick = (containerData) => {
    // Modal.success()
    setItemVisible(true)
    setItemData(containerData)
  }
  const handleContainerDelete = (id) => {
    dispatch({
      type: 'bar/deleteDataContainer',
      payload: id
    })
  }
  const handleContainerCopy = (id) => {
    dispatch({
      type: 'bar/copyDataContainer',
      payload: id
    })
  }
  const handleContainerChange = (data, cb) => {
    const {name} = data
    let temp = bar.dataContainerList.find(item => item.name === name)
    if (temp) {
      // 命名重复
      message.error('容器名称重复')
      cb(true)
    } else {
      dispatch({
        type: 'bar/updateDataContainer',
        payload: data
      })
    }
  }
  const handleUpdateDrawerClose = (value) => {
    setItemVisible(value)
    dispatch({
      type: 'bar/getDataContainerList'
    })
  }
  return (
    <div className="data-container-wrap">
      <Drawer
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            <span></span>
            数据容器
            <CloseOutlined onClick={onClose} className="g-cursor-pointer"/>
          </div>
        }
        placement='right'
        closable={false}
        onClose={onClose}
        visible={props.visible}
        className='data-container-drawer'
        getContainer={false}
        style={{position: 'absolute'}}
        width={333}
      >
        <div className='data-container-handle'>
          <Input
            placeholder="请输入"
            suffix={<SearchOutlined
              className="input-search-icon"
              onClick={handleSearch}
            />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            allowClear
            onSearch={handleSearch}
          />
          <Button className="g-mx-2" onClick={() => handleContainerClick({})}>+新增</Button>
          <Button onClick={() => setManageVisible(true)}>管理</Button>
        </div>
        {
          bar.dataContainerList.map(container =>
            <DataContainerItem onChoose={handleContainerClick} onDelete={handleContainerDelete} onCopy={handleContainerCopy} onChange={handleContainerChange} key={container.id} data={container}/>
          )
        }
      </Drawer>
      <ManageContainerDrawer data={bar.dataContainerList} visible={manageVisible} onVisibleChange={(value) => setManageVisible(value)} onChoose={(data) => handleContainerClick(data)} />
      <UpdateContainerDrawer dashboardId={bar.dashboardId} data={itemData} visible={itemVisible} onVisibleChange={handleUpdateDrawerClose}/>
    </div>
  )
}

export default connect(({bar}) => ({
  bar
}))(DataContainer)

