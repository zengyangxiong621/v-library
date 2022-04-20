import React, { memo, useState, useEffect } from 'react';
import './index.less';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash/debounce';

import {
  Drawer,
  Form,
  Button,
  Collapse,
  Select,
  Input,
  Modal,
  Tabs
} from 'antd';

import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons';

import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/theme-twilight"

const cfilters = [
  {
    id: uuidv4(),
    name: '过滤器1',
    isEditName: false,
    callbacks: [
      {
        id: uuidv4(),
        name: '111',
        code: `return data`,
      }
    ],
    status: 0 // 0: 未编辑 1：编辑
  },
  {
    id: uuidv4(),
    name: '过滤器2',
    isEditName: false,
    callbacks: [
      {
        id: uuidv4(),
        name: '111',
        code: `return data`,
      }
    ],
    status: 0,
  },
]

const DataConfigDrawer = props => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const { confirm } = Modal;
  const { TabPane } = Tabs;
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(props.visible)
  const [filters, setFilters] = useState(cfilters)
  const [currentFilter,setCurrentFilter] = useState(null)
  const [isModalVisible, setModalVisible] = useState(false)
  const [isEdit,setEdit] = useState(false)

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  useEffect(() => {
    const flag = filters.find(item=>item.status === 1)
    if(flag){
      setEdit(true)
    }
  }, [filters])

  const onClose = () => {
    console.log('11111')
    setVisible(false)
    props.onClose()
  }

  const selectedFiltersChange = (val) => {
    console.log('val', val)
  }

  const addFilter = () => {
    const all = [...filters]
    all.push({
      id: uuidv4(),
      name: '新增过滤器',
      isEditName: false,
      callbacks: [
        {
          id: uuidv4(),
          name: '111',
          code: `return data`,
        }
      ],
      status: 1 // 0: 未编辑 1：编辑
    })
    setFilters(all)
  }

  const genHeader = filter => (
    <React.Fragment>
      {
        filter.isEditName ?
          <Input style={{ width: '84px', float: 'left' }}
            className="cus-input"
            placeholder={filter.name}
            defaultValue={filter.name}
            onChange={e => editName(e, filter)}
            onClick={e => e.stopPropagation()}
          />
          :
          <React.Fragment>
            <span>{filter.name}</span>
            <EditOutlined style={{ color: '#2482FF', lineHeight: '32px', marginLeft: '8px' }} onClick={e => editFilterName(e, filter)} />
          </React.Fragment>
      }
    </React.Fragment>
  )

  const editFilterName = (e, filter) => {
    console.log('11111')
    e.stopPropagation()
    filter.status = 1
    filter.isEditName = true
    const all = [...filters]
    setFilters(all)
  }

  const editName = (e, filter) => {
    e.stopPropagation();
    filter.name = e.target.value
    // TODO: 调用接口保存
  }

  const genExtra = (id) => (
    <React.Fragment>
      <span className="collapse-header-opt">
        <span className="collapse-header-num">2</span>
        个组件正在调用
      </span>
      <DeleteOutlined
        style={{ color: '#2482FF' }}
        onClick={event => {
          deleteFilter(event, id)
        }}
      />
    </React.Fragment>
  )

  const deleteFilter = (event, id) => {
    event.stopPropagation()
    showConfirm(id)
  }

  const showConfirm = (id) => {
    confirm({
      title: '删除后可能导致相关组件不可用，是否删除数据过滤器？',
      icon: <ExclamationCircleOutlined />,
      content: '',
      okText: '确认',
      cancelText: '取消',
      onOk() {
        deleteFilterHandle(id)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const deleteFilterHandle = (id) => {
    const allFilters = [...filters]
    const rest = allFilters.filter(item => item.id !== id)
    setFilters(rest)
    // TODO 接口保存
  }

  const addCallBack = (item) => {
    setModalVisible(true)
    setCurrentFilter(item)
  }

  const tabEdit = (key, action, item) => {
    console.log('key', key, action)
    if (action === 'remove') {
      item.callbacks = item.callbacks.filter(cb => cb.id !== key)
    }
    const all = [...filters]
    setFilters(all)
  }

  const codeChange = debounce((e, code, item) => {
    code.code = e
    item.status = 1
    const all = [...filters]
    setFilters(all)
  }, 300)

  const resetFilter = (pane) => {
    console.log('pane', pane)
  }

  const confirmFilter = (item) => {
    // TODO 保存接口
    item.status =0
    const all = [...filters]
    setFilters(all)
    props.onSave(filters)
  }

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      currentFilter.callbacks.push({
        id: uuidv4(),
        name: values.field,
        code: `return data`,
      })
      currentFilter.status = 1
      const all = [...filters]
      setFilters(all)
      setModalVisible(false)
    } catch (errorInfo) {
      console.log('Failed:', errorInfo);
    }
  }

  const handleCancel = () => {
    setModalVisible(false)
    form.setFieldsValue({ field: '' })
  }

  return (
    <Drawer
      title="数据过滤器"
      placement='right'
      closable={true}
      onClose={onClose}
      visible={visible}
      className='event-drawer data-config-drawer'
    >
      <div className="drawer-tool">
        <Select
          className="custom-select"
          placeholder="请选择过滤器"
          onChange={selectedFiltersChange}
          style={{ marginBottom: 0, width: '220px' }}
        >
          <Option value='1' key='1'>过滤器1</Option>
          <Option value='2' key='2'>过滤器2</Option>
        </Select>
        <Button disabled={isEdit} type="primary" onClick={addFilter}>添加条件</Button>
      </div>
      {filters.map((item) => {
        return (
          <Collapse
            accordion
            key={item.id}
            className="custom-collapse">
            <Panel header={genHeader(item)} key={item.id} extra={genExtra(item.id)}>
              <div className="filter-wraper">
                <div className="header">
                  <span className="fif-title">回调字段</span>
                  <Button ghost type="primary" onClick={() => { addCallBack(item) }}>添加回调</Button>
                </div>
                <div className="body">
                  <Tabs
                    hideAdd
                    defaultActiveKey={item.callbacks.length ? item.callbacks[0].id : null}
                    type="editable-card"
                    onEdit={(key, action) => tabEdit(key, action, item)}
                  >
                    {item.callbacks.map(pane => (
                      <TabPane tab={pane.name} key={pane.id}>
                        <div className="code-editor">
                          <div className="cus-code">{`function filter(data){`}</div>
                          <div className="code-wraper">
                            <AceEditor
                              mode='javascript'
                              theme="twilight"
                              onChange={e => codeChange(e, pane, item)}
                              name={uuidv4()}
                              editorProps={{ $blockScrolling: true }}
                              value={pane.code}
                              setOptions={{
                                enableBasicAutocompletion: true,
                                enableLiveAutocompletion: true,
                                enableSnippets: true,
                                showGutter: true,
                              }}
                              style={{ width: '100%', height: '100%' }}
                            />
                          </div>
                          <div className="cus-code">{`}`}</div>
                        </div>
                      </TabPane>
                    ))}
                  </Tabs>
                </div>
                <div className="bottom">
                  <p className={['status', item.status === 0 ? 'saved' : 'unsave'].join(' ')}>
                    {item.status === 0 ? '已保存' : '未保存'}
                  </p>
                  <div className="btn-group">
                    <Button ghost onClick={() => { resetFilter(item) }} style={{ marginRight: '8px' }}>取消</Button>
                    <Button type="primary" onClick={() => { confirmFilter(item) }}>确认</Button>
                  </div>
                </div>
              </div>
            </Panel>
          </Collapse>
        )
      })}
      <Modal
        title="添加回调"
        visible={isModalVisible}
        cancelText='取消'
        okText='确认'
        onOk={handleOk}
        onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={{ field: 'aaa' }}
          autoComplete="off"
          labelAlign="left"
          form={form}
        >
          <Form.Item
            label="回调字段名"
            name="field"
            rules={[
              {
                required: true,
                message: '回调字段名不能为空!',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Drawer>
  )
}

export default memo(DataConfigDrawer)