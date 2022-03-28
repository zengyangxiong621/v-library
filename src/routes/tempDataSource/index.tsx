import { memo, useState, useRef, useEffect } from 'react'
import './index.less'
import zhCN from 'antd/es/locale/zh_CN'

import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal } from 'antd'
import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons'

import AddDataSource from './components/addDataSource'
import EditDataSource from './components/editDataSource'

const { Option } = Select


const DataSource = (props: any) => {
  const [inputValue, setInputValue] = useState('')
  const [dataSourceType, setDataSourceType] = useState('all')
  const [isShowAddModal, setIsShowAddModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [editDataSourceInfo, setEditDataSourceInfo] = useState({})

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
    setIsShowAddModal(true)
    console.log('isShow', isShowAddModal);
  }
  const changeShowState = (modalType: string) => {
    modalType === 'add'
      ?
      setIsShowAddModal(false)
      :
      setIsShowEditModal(false)
  }

  // 删除、编辑 操作
  const delClick = (text: any, record: any) => {
    console.log(text);
    console.log(record);
    Modal.confirm({
      title: '删除数据源',
      okButtonProps: {
        style: {
          backgroundColor: '#e9535d',
          border: 'none',
          // marginLeft: '8px',
        }
      },
      cancelButtonProps: {
        style: {
          backgroundColor: '#3d404d'
        }
      },
      icon: <ExclamationCircleFilled />,
      content: '删除后不可恢复，确认删除此数据源吗?',
      okText: '确定',
      cancelText: '取消',
      bodyStyle: {
        background: '#232630',
      },
      onOk(close) {
        console.log('删除了', close);
        //TODO 发送删除数据源的请求
        close()
      },
      onCancel(close) {
        console.log('拿到的行数据', text);
        console.log('record', record);
        close()
      }
    })
  }
  const editClick = (text: any, record: any) => {
    setIsShowEditModal(true)
    setEditDataSourceInfo(text)
  }
  // 数据源映射
  const typeReflect: any = {
    0: 'CSV文件',
    1: 'API接口',
    2: 'MYSQL数据库'
  }
  // Table columns
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      className: 'customHeaderColor',
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '数据类型',
      key: 'type',
      render(text: any) {
        const { type } = text
        return (<>{typeReflect[type]}</>)
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      width: '490px',
    },
    {
      title: '修改时间',
      key: 'time',
      dataIndex: 'time',
      render: (time: any, data: any) => {
        return (
          <>
            {time}
          </>
        )
      },
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

  return (
    <ConfigProvider locale={zhCN}>
      <div className='DataSource-wrap'>
        <div className='title'>我的数据</div>
        <header className='header'>
          <div className='custom-btn' onClick={addDataSource}>
            <PlusOutlined style={{ fontSize: '12px', marginRight: '2px' }} />
            <span>添加数据源</span>
          </div>
          <div className='search'>
            <Select style={{ minWidth: '120px' }} dropdownStyle={{ backgroundColor: '#232630' }} defaultValue="全部类型" onChange={selectChange}>
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
        {/* 添加数据源的弹窗 */}
        <AddDataSource visible={isShowAddModal} changeShowState={changeShowState} />
        {/* 编辑数据源的弹窗 */}
        <EditDataSource visible={isShowEditModal} editDataSourceInfo={editDataSourceInfo}
          changeShowState={changeShowState}
        />
      </div>
    </ConfigProvider>
  )
}

// 表格分页配置
const paginationProps = {
  showTotal: (val: any) => `共${val}条`,
  onChange(current: any) {
    console.log('当前页码', current);
  },
  defaultCurrent: 1,
  // current: 1,
  showQuickJumper: true,
  showSizeChanger: true,
  pageSizeOptions: [10, 20, 30],
  pageSize: 10,
  total: 200,
  locale: {},
  onShowSizeChange: (current: number, pageSize: number) => {
    console.log('每页展示数据条数');
  }
}

// Table Mock Data
const data = [
  {
    id: '1',
    baseUrl: 'http://www.gs.com',
    code: '0',
    database: 'MySQL',
    description: '螃蟹在剥我的壳',
    name: '无名数据源一',
    password: '123',
    port: '8080',
    type: '0',
    username: 'cdb',
    time: '1111-11-11'
  },
  {
    id: '2',
    baseUrl: 'http://www.baidu.com',
    code: '1',
    database: 'YouSQL',
    description: '笔记本在写我',
    name: '数据源名称2',
    password: '123',
    port: '80',
    type: '1',
    username: 'cdb',
    time: '2222-22-22',
  },
  {
    id: '3',
    baseUrl: 'http://www.pua.cn',
    code: '2',
    database: 'HeSQL',
    description: '漫天的我落在雪花上',
    name: '很纯粹的一个数据源',
    password: '123',
    port: '443',
    type: '2',
    username: 'cdb',
    time: '3333-33-33'
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