import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Drawer, Input, Table, Modal} from 'antd'
import {http} from '../../../../../../models/utils/request'
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

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
      render: text => <span>{dataSourceEnum[text]}</span>
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
        <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
          <span></span>
          数据容器
          <CloseOutlined onClick={onClose} className="g-cursor-pointer"/>
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
        <Input
          placeholder="请输入"
          suffix={<SearchOutlined
            className="input-search-icon"
            onClick={handleSearch}
          />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
          onSearch={handleSearch}
        />
        <Table
          bordered={true}
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