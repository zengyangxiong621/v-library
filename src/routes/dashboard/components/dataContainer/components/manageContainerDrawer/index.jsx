import React, {memo, useState, useEffect, useRef} from 'react';
import './index.less'
import {Drawer, Input, Table, Modal, Button} from 'antd'
import {CloseOutlined, SearchOutlined} from "@ant-design/icons";

const ManageContainerDrawer = props => {
  const [searchValue, setSearchValue] = useState('')
  const [filterData, setFilterData] = useState(props.data)
  const dataSourceEnum = {
    static: '静态数据'
  }
  const onClose = () => {
    props.onVisibleChange(false)
    setSearchValue('')
    handleSearch()
  };
  useEffect(() => {
    setFilterData(props.data)
  }, [props.data])
  const columns = [
    {
      title: '数据容器',
      dataIndex: 'name',
      key: 'name',
      width: 120,
      ellipsis: true,
      render: (text, record) => <a onClick={() => {
        // onClose()
        props.onChoose(record)
      }
      } className='g-cursor-pointer'>{text}</a>
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
      dataIndex: 'modules',
      key: 'modules',
      render: list => {
        return list && list.length > 0 ?
          <div className="g-flex g-flex-wrap">{
            list.map(item => {
              return <a
                className="g-pr-4 g-py-1 g-whitespace-nowrap g-overflow-hidden g-overflow-ellipsis g-whitespace-nowrap g-cursor-pointer"
                style={{maxWidth: 131}}
                title={item.name}
                onClick={() => {
                  console.log('选择组件byId', item.id)
                }
                }
              >{item.name}
              </a>
            })
          }</div>
          :
          <div>无关联组件</div>
      }
    },
  ];
  const handleSearch = (value = '') => {
    setFilterData(props.data.filter((item) => {
      return item.name.indexOf(value) !== -1
    }))
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
      style={{position: 'absolute'}}
      maskStyle={{opacity: 0}}
    >
      <div>
        <Input
          placeholder="请输入"
          suffix={<SearchOutlined
            className="input-search-icon"
            onClick={(e) => handleSearch(e.target.value)}
          />}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          allowClear
          onSearch={(e) => handleSearch(e.target.value)}
          onPressEnter={(e) => handleSearch(e.target.value)}
        />
        <Table
          bordered={true}
          className="g-mt-2"
          columns={columns}
          dataSource={filterData}
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
