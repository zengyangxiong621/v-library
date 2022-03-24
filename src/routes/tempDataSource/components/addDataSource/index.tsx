import { memo, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input } from 'antd'

const { Option } = Select
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};
const AddDataSource = (props: any) => {
  const { visible, changeShowState } = props

  const [loading, setLoading] = useState()

  const handleOk = () => {
    changeShowState()
  }
  const handleCancel = () => {
    changeShowState()
  }


  return (
    <div className='AddDataSource-wrap'>
      <Modal
        title="添加数据源"
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        onCancel={handleCancel}
      >
        <Form
          name="addDataSource"
          {...formItemLayout}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Form.Item
            name="select"
            label="Select"
            rules={[
              {
                required: true,
                message: 'Please select your country!',
              },
            ]}
          >
            <Select placeholder="Please select a country">
              {
                dataSourceType.map((item: any) => (
                  <Option key={item.key} value={item.name}>
                    {item.name}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="数据源名称"
            name='dataSourceName'
            rules={[
              {
                required: true,
                message: 'Please select your country!',
              },
            ]}>
            <Input placeholder='请输入数据源名称' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='describe'
          >
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
          {
            formList.map((item: any) => {
              return (
                <Form.Item
                  label={item.label}
                >

                </Form.Item>
              )
            })
          }
        </Form>
      </Modal>
    </div>
  )
}

export default memo(AddDataSource)

// 数据源类型
const dataSourceType = [
  {
    name: 'CSV文件',
    key: 'CSV文件'
  },
  {
    name: 'MySQL数据库',
    key: 'MySQL数据库'
  }, {
    name: 'API接口',
    key: 'API接口'
  }
]

// 动态表单选项
const formList = [
  {
    label: '编码格式',
    name: 'bianmageshi',
    // component: <Radio.Group options={plainOptions} onChange={this.onChange1} value={value1} />
  }
]

