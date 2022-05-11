import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Drawer, Input, Table, Modal} from 'antd'
import {http} from '../../../../../../models/utils/request'
import {CloseOutlined} from "@ant-design/icons";

const ManageContainerDrawer = props => {
  const [dataList, setDataList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const dataSourceEnum = {
    static: '静态数据'
  }

  useEffect(async () => {
    const data = await http({
        method: 'get',
        url: '/visual/container/list/1513418102787268609'
      })
    setDataList(data)
  }, [])


  const onClose = () => {
    props.onVisibleChange(false)
  };
  const columns = [
    {
      title: '数据容器',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
      render: (text, record) => <span onClick={() => {
        onClose()
        props.onChoose(record)
      }
      } className={`g-cursor-pointer ${record.enable ? 'starting' : 'stop'}`}>{text}</span>
    },
    {
      title: '数据源',
      dataIndex: 'dataType',
      key: 'dataType',
      width: 120,
      ellipsis: true,
      render: text => <span style={{color: '#ccc'}}>{dataSourceEnum[text]}</span>
    },
    {
      title: '接入组件',
      dataIndex: 'address',
      key: 'address',
      // render: text => text.map(item => {
      //   return <span className="g-mr-2" title={item.name}>item.name</span>
      // })
    },
  ];
  const handleSearch = (value) => {
    console.log('value', value);

  }
  return (
    <Drawer
      title={
        <div className="g-relative">
          数据容器
          <CloseOutlined onClick={onClose} className="g-absolute g-cursor-pointer" style={{top: 4, right: 8}}/>
        </div>
      }
      closeIcon={null}
      width={500}
      placement='right'
      closable={true}
      onClose={onClose}
      visible={props.visible}
      className='manage-data-container-drawer'
      getContainer={false}
      maskStyle={null}
      style={{position: 'absolute'}}
    >
      <div>
        <Input.Search value={searchValue} onChange={(e) => setSearchValue(e.target.value)} onSearch={handleSearch} onBlur={(e) => handleSearch(e.target.value)}></Input.Search>
        <Table
          className="g-mt-2"
          columns={columns}
          dataSource={dataList}
          pagination={
            {
              hideOnSinglePage: true
            }
          }
        />
      </div>
    </Drawer>
  )
}

export default memo(ManageContainerDrawer)