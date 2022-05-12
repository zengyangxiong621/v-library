import React, {memo, useState, useEffect} from 'react';
import {connect} from 'dva'
import './index.less'
import {Form, Drawer, Select, Button, Input, Modal, message} from 'antd';
import {
  CloseOutlined
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
  const [itemData, setItemData] = useState({});
  const [inputValue, setInputValue] = useState('')
  const [dataContainerList, setDataContainerList] = useState([])
  useEffect(async () => {
    // const data = await http({
    //   method: 'get',
    //   url: '/visual/container/list/1513418102787268609'
    // })
    // console.log('data', data)
    setDataContainerList([
      {
        id: '1',
        name: '数据容器1数据容器1数据容器1数据容器1数据容器1',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
      {
        id: '2',
        name: '数据容器2',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
      {
        id: '3',
        name: '数据容器3',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
    ])

    // setDataContainerList(data)
  }, [])

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
    console.log('ModalConfirm', )
    // Modal.success()
    setItemVisible(true)
    console.log('containerData', containerData)
    setItemData(containerData)
  }




  return (
    <div className="data-container-wrap">
      <Drawer
        title={
          <div className="g-relative">
            数据容器
            <CloseOutlined onClick={onClose} className="g-absolute g-cursor-pointer" style={{top: 4, right: 8}}/>
          </div>
        }
        closeIcon={null}
        placement='right'
        closable={true}
        onClose={onClose}
        visible={props.visible}
        className='data-container-drawer'
        getContainer={false}
        style={{position: 'absolute'}}
        width={400}
      >
        <div className='data-container-handle'>
          <Search
            value={inputValue}
            onChange={handleSearchValueChange}
            placeholder="搜索"
            className='search'
            maxLength={40}
            onSearch={handleSearch}
          ></Search>
          <Button onClick={() => handleContainerClick({})}>+新增</Button>
          <Button onClick={() => setManageVisible(true)}>管理</Button>
        </div>
        {
          dataContainerList.map(container =>
            <DataContainerItem onClick={handleContainerClick} key={container.id} data={container}/>
          )
        }
      </Drawer>
      <UpdateContainerDrawer data={itemData} visible={itemVisible} onVisibleChange={(value) => setItemVisible(value)}/>
      <ManageContainerDrawer data={dataContainerList} visible={manageVisible} onVisibleChange={(value) => setManageVisible(value)} onChoose={(data) => handleContainerClick(data)} />
    </div>
  )
}

export default connect(({bar}) => ({
  bar
}))(DataContainer)

