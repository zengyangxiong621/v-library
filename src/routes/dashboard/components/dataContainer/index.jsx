import React, {memo, useState, useEffect} from 'react';
import {connect} from 'dva'
import './index.less'
import {Form, Drawer, Select, Button, Input, } from 'antd';
import DataContainerItem from './dataContainerItem'
import {http} from '../../../../models/utils/request'

const { Search } = Input;

const DataContainer = ({bar, dispatch, ...props}) => {
  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const [dataContainerList, setDataContainerList] = useState([])
  useEffect(async () => {
    // const data = await http({
    //   method: 'get',
    //   url: ''
    // })
    setDataContainerList([
      {
        id: '1',
        name: '1',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
      {
        id: '2',
        name: '2',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
      {
        id: '3',
        name: '3',
        enable: true,
        dataType: 'static',
        useFilter: true,
        triggers: null,
        events: null,
      },
    ])
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
  return (
    <div className="data-container-wrap">
      <Drawer
        title="数据容器"
        placement='right'
        closable={true}
        onClose={onClose}
        visible={props.visible}
        className='data-container-drawer'
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
          <Button>+新增</Button>
          <Button>管理</Button>
        </div>
        {
          dataContainerList.map(container =>
            <DataContainerItem key={container.id} data={container}/>
          )
        }
      </Drawer>
    </div>
  )
}

export default connect(({bar}) => ({
  bar
}))(DataContainer)

