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
  Space
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { SketchPicker } from 'react-color'

const GroupConfig = props => {
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      span: 6,
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

  return (
    <div className="GroupConfig-wrap">
      <h3 className="header">
        组设置
      </h3>
      <div className="content">
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
          <Form.Item label="透明度">
            <Form.Item name="input-number" noStyle>
              <Row>
                <Col span={12}>
                  <Slider
                    min={1}
                    max={100}
                    tooltipVisible={false}
                    // onChange={this.onChange}
                    // value={typeof inputValue === 'number' ? inputValue : 0}
                  />
                </Col>
                <Col span={4}>
                  <InputNumber
                    min={1}
                    max={100}
                    style={{ margin: '0 16px' }}
                    // value={inputValue}
                    // onChange={this.onChange}
                  />
                </Col>
              </Row>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(GroupConfig)

