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



// const PageSetting = ({ dispatch, bar }) => {
const PageSetting = (props) => {
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
    <div className="PageSetting-wrap">
      <h3 className="header">
        页面设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          name="validate_other"
          {...formItemLayout}
          onFinish={onFinish}
        >
          <Form.Item
            name="select"
            label="屏幕大小"
            hasFeedback
          >
            <Select placeholder="请选择" defaultValue="t1" onChange={sizeChange}>
              <Option value="t1">1920*1080</Option>
              <Option value="t2">1366*768</Option>
            </Select>
          </Form.Item>

          <Form.Item label="位置尺寸">
            <Input.Group compact>
              <Form.Item name="width" noStyle>
                <InputNumber disabled className="size-input" style={{ marginRight: '5px' }} addonAfter="W" />
              </Form.Item>
              <Form.Item name="height" noStyle>
                <InputNumber disabled className="size-input" addonAfter="H" />
              </Form.Item>
            </Input.Group>
          </Form.Item>
          <Form.Item label="背景">
            {/* <div style={styles.swatch} onClick={selectBgc}>
              <div style={styles.color} />
            </div>
            {this.state.displayColorPicker ? <div style={styles.popover}>
              <div style={styles.cover} onClick={this.handleClose} />
              <SketchPicker color={this.state.color} onChange={this.handleBgcChange} />
            </div> : null} */}
          </Form.Item>
          <Form.Item label="背景图">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">点击修改</p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
          <Form.Item label="栅格间距">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={0} style={{ width: '100%' }} defaultValue={20} />
            </Form.Item>
          </Form.Item>
          <Form.Item name="zoom" label="缩放设置">
            <Radio.Group defaultValue="a" className="zoom-set">
              <Space direction="vertical">
                <Radio value="a" style={{
                  width: '100%',
                }}>按屏幕比例适配</Radio>
                <Radio value="b" style={{
                  width: '100%',
                }}>强制铺满</Radio>
                <Radio value="c" style={{
                  width: '100%',
                }}>原比例展示溢出滚动</Radio>
              </Space>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle>
              <Upload.Dragger name="files" action="/upload.do">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
              </Upload.Dragger>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default memo(PageSetting)

// export default connect(
//   ({ bar }) => ({ bar })
// )(PageSetting)
  
