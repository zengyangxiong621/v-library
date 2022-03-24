import { memo, useState, useRef, useEffect } from 'react'
import './index.less'

import { Table, Button, Select, Input, Tag, Space } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'

import AddDataSource from './components/addDataSource'

const { Option } = Select


const DataSource = (props: any) => {
  const [inputValue, setInputValue] = useState('')
  const [dataSourceType, setDataSourceType] = useState('all')
  const [isShowModal, setIsShowModal] = useState(false)

  // 保证每次拿到最新的dataSourceType值
  useEffect(() => {
    setDataSourceType(dataSourceType)
  }, [dataSourceType])

  // 下拉框选择
  const selectChange = (value: any, option: any) => {
    setDataSourceType(value)
  }
  // 按类型搜索
  const searchByType = (e: any) => {
    console.log('搜索参数', inputValue);
  }

  // 打开数据源弹窗
  const addDataSource = () => {
    setIsShowModal(true)
    console.log('isShow', isShowModal);
  }
  const changeShowState = () => {
    setIsShowModal(false)
  }

  return (
    <div className='DataSource-wrap'>
      <div className='title'>我的数据</div>
      <header className='header'>
        <div className='custom-btn'>
          <PlusOutlined style={{ fontSize: '12px', marginRight: '2px' }} />
          <span onClick={addDataSource}>添加数据源</span>
        </div>
        <div className='search'>
          <Select defaultValue="全部类型" style={{ width: 120 }} onChange={selectChange}>
            {
              selectOptions.map((item: any) => {
                return (
                  <Option key={item.key} value={item.name}>{item.name}</Option>
                )
              })
            }
          </Select>
          <Input placeholder="搜索"
            maxLength={40}
            suffix={<SearchOutlined />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={searchByType}
          />
        </div>
      </header>
      <section className='table-wrap'>
        <Table
          columns={columns}
          dataSource={data}
          pagination={paginationProps}
          rowClassName='customRowClass'
        />
      </section>
      <AddDataSource visible={isShowModal} changeShowState={changeShowState} />
    </div>
  )
}

// 删除、编辑 操作
const delClick = (text: any, record: any) => {
  console.log(text);
  console.log(record);
}
const editClick = (text: any, record: any) => {
  console.log('aaaa');

}
// 表格分页配置
const paginationProps = {
  defaultCurrent: 1,
  // current: 1,
  showSizeChanger: true,
  showQuickJumper: true,
  pageSize: 10,
  total: 2000,
  showTotal: () => '共220条',
  onChange(current: any) {
    console.log('当前页码', current);
  },
  onShowSizeChange: (current: number, pageSize: number) => {
    console.log('每页展示数据条数');
  }
}

// Table columns
const columns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <span>{text}</span>,
  },
  {
    title: '数据类型',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '描述',
    dataIndex: 'address',
    key: 'address',
    width: '490px',
  },
  {
    title: '修改时间',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (text: any, record: any) => {
      return (
        <Space size="middle" >
          <span className='textInOperationColumn' onClickCapture={() => editClick(text, record)}>编辑</span>
          <span className='textInOperationColumn' onClickCapture={() => delClick(text, record)}>删除</span>
        </Space>
      )
    }

  },
];

// Table Mock Data
const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

// SelectOptions
const selectOptions = [
  {
    name: '全部类型',
    key: 'all',
  },
  {
    name: 'API',
    key: 'api',
  },
  {
    name: 'MySQL',
    key: 'mysql',
  },
  {
    name: 'Oracle',
    key: 'oracle',
  },
  {
    name: 'SQL Server',
    key: 'sqlServer',
  },
  {
    name: 'Elasticsearch',
    key: 'elasticsearch',
  },
  {
    name: 'ClickHouser',
    key: 'clickHouser',
  }
]
export default memo(DataSource)