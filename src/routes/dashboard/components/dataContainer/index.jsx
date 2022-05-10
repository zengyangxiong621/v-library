import React, {memo, useState, useEffect} from 'react';
import {connect} from 'dva'
import './index.less'
import {Form, Drawer, Select, Button, Input, } from 'antd';
import DataContainerItem from './components/dataContainerItem'
import {http} from '../../../../models/utils/request'
import UpdateContainerDrawer from "./components/updateContainerDrawer";
const { Search } = Input;

const DataContainer = ({bar, dispatch, ...props}) => {
  const [itemVisible, setItemVisible] = useState(false);
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
    setItemVisible(true)
    console.log('containerData', containerData)
    setItemData(containerData)
  }

  return (
    <div className="data-container-wrap">
      <Drawer
        title={
          <div>数据容器</div>
        }
        closeIcon={null}
        placement='right'
        closable={true}
        onClose={onClose}
        visible={props.visible}
        className='data-container-drawer'
        getContainer={false}
        style={{position: 'absolute'}}
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
          <Button>管理</Button>
        </div>
        {
          dataContainerList.map(container =>
            <DataContainerItem onClick={handleContainerClick} key={container.id} data={container}/>
          )
        }
      </Drawer>
      <UpdateContainerDrawer data={itemData} visible={itemVisible} onVisibleChange={(value) => setItemVisible(value)} />
    </div>
  )
}

export default connect(({bar}) => ({
  bar
}))(DataContainer)

