import { memo, useState, useRef, useEffect, useCallback, useMemo } from 'react'
import './index.less'
import zhCN from 'antd/es/locale/zh_CN'

import { ConfigProvider, Table, Button, Select, Input, Tag, Space, Modal, message } from 'antd'
import { PlusOutlined, SearchOutlined, ExclamationCircleFilled } from '@ant-design/icons'

import AddDataSource from './components/addDataSource'
import EditDataSource from './components/editDataSource'

import { useFetch } from './tool/useFetch'
import { TDataSourceParams } from './type'

const { Option } = Select


const DataSource = (props: any) => {
  const [inputValue, setInputValue] = useState('')
  const [dataSourceType, setDataSourceType] = useState(null)
  const [isShowAddModal, setIsShowAddModal] = useState(false)
  const [isShowEditModal, setIsShowEditModal] = useState(false)
  const [editDataSourceInfo, setEditDataSourceInfo] = useState({})
  const [pageInfo, setPageInfo] = useState({
    pageNo: 1,
    pageSize: 10,
  })
  const [tableMap, setTableMap] = useState({})
  const [totalElements, setTotalElements] = useState(0)
  const [tableData, setTableData] = useState([])
  const [tableLoading, setTableLoading] = useState(true)

  /****** 每次请求回数据后，一起设置数据和页数 *******/
  const resetTableInfo = (data: any) => {
    setTableData(data.content)
    setPageInfo({
      pageNo: data.pageNo,
      pageSize: data.pageSize,
    })
    setTotalElements(data.totalElements)
  }
  /**
   * description: 根据不同的参数请求表格数据(首次加载、搜索、换页、调整每页显示的条数)
   * params: 发送请求所需要的参数
   */
  //给个默认参数，初始化和刷新时方便一些
  const defaultParams: TDataSourceParams = {
    spaceId: 1,
    type: null,
    name: null,
    ...pageInfo,
    map: tableMap,
  }
  const getTableData = async (differentParams: TDataSourceParams = defaultParams) => {
    setTableLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/list', {
      body: JSON.stringify(differentParams)
    })
    if (data) {
      setTableLoading(false)
    } else {
      setTimeout(() => {
        setTableLoading(false)
      }, 3000);
    }

    // 请求完成，冲着表格的数据和页码信息
    await resetTableInfo(data)
  }
  // 获取表格数据
  useEffect(() => {
    getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 保证每次拿到最新的dataSourceType值
  useEffect(() => {
    setDataSourceType(dataSourceType)
  }, [dataSourceType])

  // 下拉框选择
  const selectChange = (value: any) => {
    setDataSourceType(value)
  }
  // 按类型搜索
  const searchByType = async (e: any) => {
    // 整合搜索参数
    const finalParams: TDataSourceParams = {
      spaceId: 1,
      type: dataSourceType,
      name: inputValue === '' ? null : inputValue,
      pageNo: 1,
      pageSize: pageInfo.pageSize,
      map: tableMap
    }
    getTableData(finalParams)
  }

  // 打开数据源弹窗
  const addDataSource = () => {
    setIsShowAddModal(true)
  }
  // 关闭数据源弹窗
  const changeShowState = useCallback((modalType: string) => {
    modalType === 'add'
      ?
      setIsShowAddModal(false)
      :
      setIsShowEditModal(false)
  }, [])
  // 刷新表格数据
  const refreshTable = useCallback(() => {
    getTableData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**********  删除、编辑 操作 *************/
  const delClick = (dataSourceId: string) => {
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
      async onOk(close) {
        //TODO 发送删除数据源的请求
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [, data] = await useFetch(`/visual/datasource/delete?dataSourceId=${dataSourceId}`, {
        })
        if (data) {
          close()
          refreshTable()
        } else {
          message.error({ content: '删除失败', duration: 2 })
        }
      },
      onCancel(close) {
        close()
      }
    })
  }
  const editClick = (text: any) => {
    setIsShowEditModal(true)
    setEditDataSourceInfo(text)
  }
  // 表格排序
  const tableOnChange = (pagination: any, filters: any, sorter: any, { action }: any) => {
    // sorter 有两个默认值 ascend 和 descend 不排序时是undefined
    // 这里只处理排序，  分页已经在pagination的change事件种弄了，就不弄了
    const { field, order } = sorter
    console.log('sort', sorter);
    if (action === 'sort') {
      setTableMap({
        [field]: order
      })
      // 发送请求
      // const finalParams: TDataSourceParams = {
      //   spaceId: 1,
      //   type: dataSourceType,
      //   name: inputValue === '' ? null : inputValue,
      //   ...pageInfo,
      //   map: {
      //     [field]: order
      //   },
      // }
      // TODO 等后端做好排序，解封即可
      // getTableData(finalParams)
    }
  }
  // 表格分页配置
  const paginationProps = {
    total: totalElements,
    current: pageInfo.pageNo,
    pageSize: pageInfo.pageSize,
    pageSizeOptions: [10, 20, 30],
    showTotal: (val: number | string) => `共${val}条`,

    defaultCurrent: 1,
    showQuickJumper: true,
    showSizeChanger: true,
    // locale: {},
    onChange(page: number, pageSize: number) {
      const finalParams: TDataSourceParams = {
        spaceId: 1,
        type: dataSourceType,
        name: inputValue === '' ? null : inputValue,
        pageNo: page,
        pageSize,
        map: tableMap
      }
      getTableData(finalParams)
    },
  }
  // Table columns
  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 250,
      className: 'customHeaderColor',
      ellipsis: true,
      render: (text: any) => <span>{text}</span>,
    },
    {
      title: '数据类型',
      key: 'type',
      ellipsis: true,
      dataIndex: 'type',
      width: 250,
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: '修改时间',
      key: 'updatedAt',
      sorter: true,
      width: 300,
      ellipsis: true,
      dataIndex: 'updatedAt',
      render: (time: any, data: any) => {
        // const a = new Date(time)
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
      ellipsis: true,
      width: 200,
      render: (text: any, record: any) => {
        return (
          <Space size="middle" >
            <span className='textInOperationColumn' onClickCapture={() => editClick(text)}>编辑</span>
            <span className='textInOperationColumn' onClickCapture={() => delClick(record.id)}>删除</span>
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
                    <Option key={item.key} value={item.key}>{item.name}</Option>
                  )
                })
              }
            </Select>
            <Input placeholder="搜索"
              allowClear
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
            scroll={{ y: 560 }}
            rowClassName='customRowClass'
            loading={tableLoading}
            columns={columns}
            dataSource={tableData}
            pagination={paginationProps}
            onChange={tableOnChange}
          />
        </section>
        {/* 添加数据源的弹窗 */}
        <AddDataSource
          visible={isShowAddModal}
          changeShowState={changeShowState}
          refreshTable={refreshTable}
        />
        {/* 编辑数据源的弹窗 */}
        <EditDataSource
          editDataSourceInfo={editDataSourceInfo}
          visible={isShowEditModal}
          changeShowState={changeShowState}
          refreshTable={refreshTable}
        />
      </div>
    </ConfigProvider>
  )
}


// SelectOptions
const selectOptions = [
  {
    name: '全部类型',
    key: null,
  },
  {
    name: 'RDBMS',
    key: 'RDBMS',
  },
  {
    name: 'API',
    key: 'RESTFUL_API',
  },
  {
    name: 'JSON',
    key: 'JSON',
  },
  {
    name: 'CSV',
    key: 'CSV'
  },
  {
    name: 'EXCEL',
    key: 'EXCEL',
  }
]
export default memo(DataSource)
