import React, { memo, useState, useEffect } from 'react';
import './index.less'
import CodeEditor from '../codeEditor'

import {
  Drawer,
  Form,
  Radio,
  Space,
  Button,
  Collapse,
  Select,
  Input
} from 'antd';

import { DeleteOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";
import "ace-builds/src-noconflict/mode-javascript"
import "ace-builds/src-noconflict/snippets/javascript"
import "ace-builds/src-noconflict/theme-twilight"

const EventDrawer = props => {
  const { Panel } = Collapse;
  const { Option } = Select;
  const formItemLayout = {
    labelAlign: 'left'
  };
  const [form] = Form.useForm();

  const [visible, setVisible] = useState(props.visible)
  const [conditions, setConditions] = useState(props.data?.conditions || [])
  const [conditionType,setConditionType] = useState(props.data?.conditionType || 'all')

  useEffect(() => {
    setVisible(props.visible)
  }, [props.visible])

  const onClose = () => {
    console.log('11111')
    setVisible(false)
    props.onClose()
  }

  const selectChange = (val) => {
    setConditionType(val)
    props.setConditionType(val)
  }

  const addConditon = () => {
    console.log('addConditon')
    const conds = [...conditions]
    const id = uuidv4()
    conds.push({
      name: "条件",
      type: "field",
      field: "",
      compare: "==",
      expected: "",
      code: "return data",
      id
    })
    setConditions(conds)
  }

  const genExtra = (id) => (
    <DeleteOutlined
      onClick={event => {
        deleteCondition(event, id)
      }}
    />
  )

  const deleteCondition = (event, id) => {
    event.stopPropagation()
    const newConditions = conditions.filter(cond => cond.id !== id)
    setConditions(newConditions)
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

  const codeChange=(e,item)=>{
    item.code = e
  }

  const resetCondition=(item) => {
    item.type='field'
    item.field=''
    item.compare='=='
    item.expected=''
    item.code='return data'
    const conds = [...conditions]
    setConditions(conds)
  }

  const confirmConditon = (item)=>{
    const conds = [...conditions]
    setConditions(conds)
    props.confirm(conds)
  }

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
        {conditions.map((item) => {
          return (
            <Collapse accordion key={item.id} className="custom-collapse">
              <Panel header={item.name} extra={genExtra(item.id)}>
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
                      <AceEditor
                        mode='javascript'
                        theme="twilight"
                        onChange={e=>codeChange(e,item)}
                        name={uuidv4()}
                        editorProps={{ $blockScrolling: true }}
                        value={item.code}
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
                }
                <div className="btn-group">
                <Button ghost onClick={()=>{resetCondition(item)}} style={{marginRight: '8px'}}>取消</Button>
                <Button type="primary" onClick={()=>{confirmConditon(item)}}>确认</Button>
                </div>
              </Panel>
            </Collapse>
          )
        })}
      </Form>
    </Drawer>
  )
}

export default memo(EventDrawer)