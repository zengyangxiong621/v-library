import { memo } from 'react'
import { connect } from 'dva'
import './index.css'

import {
  Form,
  Select,
  InputNumber,
  Input,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Space,
  Collapse,
  Tabs,
  Table
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'


const SingleLayer = props => {
  const { Option } = Select;
  const { Panel } = Collapse;
  const { TabPane } = Tabs;
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 14,
    },
  };

  const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  const sizeChange = (e) => {
    console.log('e', e)
    // dispatch({
    //   type: 'pageSetting/sizeChange',
    //   payload: {
    //     width: ,
    //     height: !isLock,
    //   }
    // })
  }

  const setColor = (e) => {
    console.log('e', e)
  }

  const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];

  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  return (
    <div className="SingleLayer-wrap">
      <h3 className="header">
        组件设置
      </h3>
      <div className="content">
        <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="样式" key="1">
            <Form
              className="custom-form"
              name="validate_other"
              {...formItemLayout}
              onFinish={onFinish}
            >
              <Form.Item label="位置尺寸">
                <Space direction="vertical">
                  <Input.Group compact>
                    <Form.Item name="x" noStyle>
                      <InputNumber className="size-input" style={{ marginRight: '5px' }} addonAfter="X" />
                    </Form.Item>
                    <Form.Item name="y" noStyle>
                      <InputNumber className="size-input" addonAfter="Y" />
                    </Form.Item>
                  </Input.Group>
                  <Input.Group compact>
                    <Form.Item name="width" noStyle>
                      <InputNumber disabled className="size-input" style={{ marginRight: '5px' }} addonAfter="W" />
                    </Form.Item>
                    <Form.Item name="height" noStyle>
                      <InputNumber disabled className="size-input" addonAfter="H" />
                    </Form.Item>
                  </Input.Group>
                </Space>
              </Form.Item>
              <Form.Item label="默认隐藏">
                <Checkbox style={{ float: 'left' }}></Checkbox>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="数据" key="2">
            <Table dataSource={dataSource} columns={columns} pagination={false}/>
          </TabPane>
          <TabPane tab="交互" key="3">
            <Form className="custom-form">
              <Collapse accordion className="custom-collapse" defaultActiveKey={['1']}>
                <Panel header="载入动画" key="1">
                  <Form.Item label="动画类型">
                    <Select placeholder="请选择" defaultValue="t2" onChange={sizeChange}>
                      <Option value="t1">无</Option>
                      <Option value="t2">移入</Option>
                      <Option value="t3">移入(小)</Option>
                      <Option value="t4">划变</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="渐隐渐现">
                    <Checkbox style={{ float: 'left' }}></Checkbox>
                  </Form.Item>
                  <Form.Item label="速率">
                    <Select placeholder="请选择" defaultValue="t2" onChange={sizeChange}>
                      <Option value="t1">匀速</Option>
                      <Option value="t2">慢快慢</Option>
                      <Option value="t3">低速开始</Option>
                      <Option value="t4">低速结束</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="方向">
                    <Select placeholder="请选择" defaultValue="t2" onChange={sizeChange}>
                      <Option value="t1">从左至右</Option>
                      <Option value="t2">从右至左</Option>
                      <Option value="t3">从上至下</Option>
                      <Option value="t4">从下至上</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item label="持续时间(ms)">
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                  <Form.Item label="延时(ms)">
                    <InputNumber style={{ width: '100%' }} />
                  </Form.Item>
                </Panel>
              </Collapse>
            </Form>
          </TabPane>
        </Tabs>
      </div>
    </div>
  )
}

export default memo(SingleLayer)