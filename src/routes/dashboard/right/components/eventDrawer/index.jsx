import React, { useState, useEffect } from 'react';
import { connect } from 'dva'
import './index.less'
import MonacoEditor from 'react-monaco-editor';
import CodeEditor from '../codeEditor/editor'

import {
  Drawer,
  Form,
  Radio,
  Space,
  Button,
  Collapse,
  Select,
  Input,
  Popover,
  Table,
  message
} from 'antd';

import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const columns = [
  {
    title: '字段',
    dataIndex: 'field',
    key: 'field',
  },
  {
    title: '类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '说明',
    dataIndex: 'desc',
    key: 'desc',
  },
];

const EventDrawer = ({ bar, dispatch, ...props }) => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(props.visible)
  const [conditions, setConditions] = useState([])
  const [conditionType, setConditionType] = useState(props.data?.conditionType || 'all')
  const [expandKey, setExpandKey] = useState(props.expandKey)
  const [tableData, setTableData] = useState([])
  const [comData, setComData] = useState('')
  const [comDataType, setComDataType] = useState('--')
  const [refreshKey,setRefreshKey] = useState(uuidv4())

  // 监听组件的数据变化，设置popover的弹框table及数据
  useEffect(() => {
    const componentId = bar.key[0]
    const componentData = bar.componentData[componentId] || ''
    setComData(componentData ? JSON.stringify(componentData, null, 2) : '')
    if (componentData) {
      setComDataType(getType(componentData))
    } else {
      setComDataType('--')
    }
    let table = []
    const dataType = bar.componentConfig.dataType
    if (dataType === 'static') {
      table = bar.componentConfig.staticData.fields.map(item => {
        return {
          field: item.value,
          type: getFieldType(componentData, item.value),
          desc: item.desc
        }
      })
      setTableData(table)
    } else {
      if (bar.componentConfig.dataConfig[dataType]?.fields) {
        table = bar.componentConfig.dataConfig[dataType].fields.map(item => {
          return {
            field: item.value,
            type: getFieldType(componentData, item.value),
            desc: item.desc
          }
        })
        setTableData(table)
      } else {
        table = bar.componentConfig.staticData.fields.map(item => {
          return {
            field: item.value,
            type: getFieldType(componentData, item.value),
            desc: item.desc
          }
        })
        setTableData(table)
      }
    }
  }, [bar.componentData, bar.componentConfig.dataType, bar.componentConfig.dataConfig])

  useEffect(() => {
    const conds = props.data?.conditions || []
    let condsNew = []
    if (conds.length) {
      condsNew = conds.map(item => {
        return {
          ...item,
          isAdd: false,
          titleEdit: false
        }
      })
    }
    setConditions(condsNew)
    setConditionType(props.data?.conditionType || 'all')
  }, [props.data])

  useEffect(() => {
    setExpandKey(props.expandKey)
    setRefreshKey(uuidv4())
  }, [props.expandKey])

  const getFieldType = (data, field) => {
    if (data) {
      if (getType(data) === 'object') {
        return getType(data[field])
      } else if (getType(data) === 'array') {
        if (data.length) {
          if (getType(data[0]) === 'object') {
            return getType(data[0][field])
          } else if (getType(data[0]) === 'array') {
            return getFieldType(data[0], field)
          }
        } else {
          return '--'
        }
      }
    } else {
      return '--'
    }
  }

  // 判断类型
  const getType = data => {
    let type = typeof data
    if (type === 'object') {
      if (data instanceof Array) {
        type = 'array'
      } else if (data instanceof Object) {
        type = 'object'
      } else {
        type = '--'
      }
    }
    return type
  }




  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  const onClose = () => {
    setVisible(false)
    props.onClose()
  }

  const selectChange = (event) => {
    setConditionType(event.target.value)
    props.setConditionType(event.target.value)
  }

  const addConditon = () => {
    const conds = [...conditions]
    const newCond = conds.find(item => {
      return item.isAdd
    })
    if (newCond) {
      message.error('当前有未编辑完的条件')
    } else {
      const id = uuidv4()
      conds.push({
        name: `条件${conds.length+1}`,
        type: "field",
        field: "",
        compare: "==",
        expected: "",
        code: "return data",
        id,
        isAdd: true,
        titleEdit: false
      })
      setConditions(conds)
    }

  }

  const genHeader = (item) => (
    <div className="cus-event-pan-header">
      <span className="cus-event-pan-title">
        {
          item.titleEdit ?
            <Input
              defaultValue={item.name}
              onClick={e => { e.stopPropagation() }}
              onBlur={(e) => setCondName(e, item)}
              onPressEnter={(e) => setCondName(e, item)} />
            : <span title={item.name}>{item.name}</span>
        }
      </span>
      <EditOutlined onClick={event => editCondition(event, item)} />
      {
        item.isAdd ? <span className="cus-event-pan-add-status">
          <i></i>未保存
        </span> : null
      }
      <div style={{ flex: '1 1 0%' }}></div>
      <DeleteOutlined
        onClick={event => {
          deleteCondition(event, item.id)
        }}
      />
    </div>
  )

  const editCondition = (event, item) => {
    event.stopPropagation()
    item.titleEdit = true
    const condsNew = [...conditions]
    setConditions(condsNew)
  }

  const deleteCondition = (event, id) => {
    event.stopPropagation()
    const newConditions = conditions.filter(cond => cond.id !== id)
    setConditions(newConditions)
    const emitConds = newConditions.map(item=>{
      let {isAdd,titleEdit, ...rest} = item
      return rest
    })
    props.confirm(emitConds)
  }

  const setCondName = (e, item) => {
    item.name = e.target.value
    item.titleEdit = false
    const condsNew = [...conditions]
    setConditions(condsNew)
  }

  const typeChange = (e, item) => {
    item.type = e
    const conds = [...conditions]
    setConditions(conds)
  }

  const fieldChange = (e, item) => {
    item.field = e.target.value
  }

  const compareChange = (e, item) => {
    item.compare = e
  }

  const expectedChange = (e, item) => {
    item.expected = e.target.value
  }

  const codeChange = (e, item) => {
    item.code = e
  }

  const resetCondition = (condition) => {
    const conds = [...conditions]
    if(condition.isAdd){
      const condsNew = conds.filter(item=>item.id !== condition.id)
      setConditions(condsNew)
    }
    setRefreshKey(uuidv4())
    setExpandKey('null')
  }

  const confirmConditon = (item) => {
    item.isAdd = false
    const conds = [...conditions]
    setConditions(conds)
    const emitConds = conds.map(item=>{
      let {isAdd,titleEdit, ...rest} = item
      return rest
    })
    props.confirm(emitConds)
    setRefreshKey(uuidv4())
    setExpandKey('null')
  }

  const editorDidMountHandle = (editor, monaco) => {
    editor.getAction('editor.action.formatDocument').run()  //格式化
  }

  const tipsContent = (
    <div>
      <div className="fields-wraper">
        <p>事件传出的数据为{comDataType}类型，包含以下字段</p>
        <Table
          dataSource={tableData}
          columns={columns}
          pagination={false} />
      </div>
      <div className="data-wraper">
        <p>数据示例</p>
        <MonacoEditor
          height="300"
          language="json"
          theme="vs-dark"
          value={comData}
          editorDidMount={editorDidMountHandle}
          options={{
            contextmenu: false,
            readOnly: true
          }}
        />
      </div>

    </div>
  )

  return (
    <Drawer
      title="自定义条件编辑"
      placement='right'
      closable={true}
      onClose={onClose}
      visible={visible}
      className='event-drawer'
    >
      <Form
        className="custom-form"
        form={form}
        {...formItemLayout}
        colon={false}
      >
        <Form.Item name='type' label='判断类型'>
          <Radio.Group defaultValue={conditionType} className="zoom-set" onChange={selectChange}>
            <Space direction='horizontal'>
              <Radio value='all' key='all' style={{ float: 'left' }}>满足全部条件</Radio>
              <Radio value='one' key='one' style={{ float: 'left' }}>满足任意条件</Radio>
            </Space>
          </Radio.Group>
        </Form.Item>
        <Button ghost type="primary" style={{ width: '100%', marginBottom: '16px' }} onClick={addConditon}>添加条件</Button>
        <React.Fragment key={refreshKey}>
          {conditions.map((item) => {
            return (
              <Collapse
                key={item.id}
                defaultActiveKey={expandKey}
                className="custom-collapse">
                <Panel
                  // header={item.name}
                  header={genHeader(item)}
                  key={item.id}
                // extra={genExtra(item.id)}
                >
                  <Form.Item label='类型'>
                    <Select
                      className="custom-select"
                      placeholder="请选择"
                      defaultValue={item.type}
                      onChange={(e) => typeChange(e, item)}
                      style={{ marginBottom: 0 }}
                    >
                      <Option value='field' key='field'>字段</Option>
                      <Option value='custom' key='custom'>自定义条件</Option>
                    </Select>
                  </Form.Item>
                  {item.type === 'field' ?
                    <Form.Item label='设置条件'>
                      <Input style={{ width: '84px', float: 'left' }}
                        className="cus-input"
                        placeholder="字段名"
                        defaultValue={item.field}
                        onChange={(e) => fieldChange(e, item)} />
                      <Select
                        className="custom-select"
                        placeholder="请选择"
                        defaultValue={item.compare}
                        onChange={(e) => compareChange(e, item)}
                        style={{ width: '88px', float: 'left', marginRight: '8px', marginBottom: 0 }}
                      >
                        <Option value='=='> = </Option>
                        <Option value='!='> != </Option>
                        <Option value='<'>&lt;</Option>
                        <Option value='>'>&gt;</Option>
                        <Option value='<='>&lt;=</Option>
                        <Option value='>='>&gt;=</Option>
                        <Option value='include'>包含</Option>
                        <Option value='exclude'>不包含</Option>
                      </Select>
                      <Input
                        style={{ width: '84px', marginRight: 0, float: 'left' }}
                        className="cus-input"
                        placeholder="预期值"
                        defaultValue={item.expected}
                        onChange={(e) => expectedChange(e, item)} />
                    </Form.Item>
                    :
                    <div className="code-editor">
                      <div className="cus-code">{`function filter(data){`}</div>
                      <div className="code-wraper">
                        <CodeEditor value={item.code} language="javascript" onChange={(e) => codeChange(e, item)}></CodeEditor>
                      </div>
                      <div className="cus-code">{`}`}</div>
                    </div>
                  }
                  <div className="btn-group">
                    <Button ghost onClick={() => { resetCondition(item) }} style={{ marginRight: '8px' }}>取消</Button>
                    <Button type="primary" onClick={() => { confirmConditon(item) }}>确认</Button>
                  </div>
                </Panel>
              </Collapse>
            )
          })}
        </React.Fragment>

      </Form>
      <div className="event-footer">
        <Popover
          overlayClassName="custom-event-popover"
          content={tipsContent}
          title="数据字段参考"
          trigger="click"
          placement="leftBottom">
          <div className="event-popover-tip">查看条件数据参数提示</div>
        </Popover>
      </div>
    </Drawer>
  )
}

export default connect(({ bar }) => ({
  bar
}))(EventDrawer)