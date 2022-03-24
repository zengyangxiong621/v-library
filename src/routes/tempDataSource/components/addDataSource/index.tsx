import { memo, useEffect, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input, Radio, Upload, message, Button } from 'antd'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload


const AddDataSource = (props: any) => {
  const { visible, changeShowState } = props

  const [curDataType, setCurDataType] = useState('')
  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([])

  const [loading, setLoading] = useState()

  // 获取到最新的curDataType
  useEffect(() => {
    setCurDataType(curDataType)
    console.log('curData', curDataType);
  }, [curDataType])

  const getDataBaseList = () => {
    const res: any = [{
      label: 'MySQL',
      value: 'MySQL'
    }, {
      label: 'Oracle',
      value: 'Oracle'
    }]
    setDataBaseList(res)
  }
  // 新增数据源
  // const obj = {
  //   baseUrl: '',
  //   code: '',
  //   database: '', description: '', id: '', name: '', password: '', port: '', type: '', username: ''
  // }
  const handleOk = () => {
    changeShowState()
  }
  const handleCancel = () => {
    changeShowState()
  }

  const selectedChange = (val: any) => {
    setCurDataType(val)
  }


  return (
    <div className='AddDataSource-wrap'>
      <Modal
        title="添加数据源"
        maskClosable={false}
        visible={visible}
        onOk={handleOk}
        confirmLoading={loading}
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Form
          name="addDataSource"
          labelCol={{
            span: 5,
          }}
          initialValues={{
            'input-number': 3,
            'checkbox-group': ['A', 'B'],
            rate: 3.5,
          }}
        >
          <Form.Item
            label="Select"
            name="type"
            rules={generateSingleRules(true, '请选择数据源类型')}
          >
            <Select onChange={selectedChange} placeholder="Please select a country">
              {
                dataSourceType.map((item: any) => (
                  <Option key={item.value} value={item.value}>
                    {item.label}
                  </Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item
            label="数据源名称"
            name='name'
            rules={generateSingleRules(true, '请输入数据源名称')}>
            <Input placeholder='请输入数据源名称' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='description'
          >
            <TextArea
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="maxLength is 6" maxLength={6} />
          </Form.Item>
          {/* CSV格式 */}
          {
            curDataType === 'CSV' && (
              <>
                <Form.Item
                  label="编码格式"
                  name="code"
                  rules={generateSingleRules(true, '请选择编码格式')}
                >
                  <Radio.Group options={codeFormatOptions} />
                </Form.Item>
                <Form.Item
                  label="上传文件"
                  name="scwj"
                  rules={generateSingleRules(true, '请选择要上传的文件')}
                >
                  <div style={{ height: '120px' }}>
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-hint">
                        点击或拖拽文件至此处进行上传，10M以内
                      </p>
                    </Dragger>
                  </div>
                </Form.Item>
              </>
            )
          }
          {/* API接口 */}
          {
            curDataType === 'API' && (
              <>
                <Form.Item label="Base URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input ></Input>
                </Form.Item>
              </>
            )
          }
          {/* MySQL数据库 */}
          {
            curDataType === 'MySQL' && (
              <>
                <Form.Item label="链接地址" name="ljdz" rules={generateSingleRules(true, '请输入链接地址')}>
                  <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={generateSingleRules(true, '请输入端口')}>
                  <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label="用户名" name="username" rules={generateSingleRules(true, '请输入用户名')}>
                  <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={generateSingleRules(true, '请输入密码')}>
                  <Input placeholder='请输入' />
                </Form.Item>
                <Form.Item label="数据库名" name="database" rules={generateSingleRules(true, '请输入')}>
                  <div className='dataBaseName'>
                    <div className='getDataListBtn' onClick={() => getDataBaseList()}>获取数据库列表</div>
                    <Select className='dataBaseName-Select'>
                      {
                        dataBaseList.map((item: any) => {
                          return <Option value={item.value} key={item.value}>{item.label}</Option>
                        })
                      }
                    </Select>
                  </div>
                </Form.Item>
              </>
            )
          }
        </Form>
      </Modal>
    </div >
  )
}

export default memo(AddDataSource)

// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message
    }
  ]
}


// 数据源类型
const dataSourceType = [
  {
    label: 'CSV文件',
    value: 'CSV'
  },
  {
    label: 'MySQL数据库',
    value: 'MySQL'
  }, {
    label: 'API接口',
    value: 'API'
  }
]

// 单选框 CSV类型- 编码格式
const codeFormatOptions = [
  {
    label: '自动检测',
    value: '自动检测',
  },
  {
    label: 'UTF-8',
    value: 'UTF-8',
  },
  {
    label: 'GBK',
    value: 'GBK',
  },
]

// 上传框配置
const uploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info: any) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e: any) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};
// 动态表单选项
const formList = [
  {
    label: '编码格式',
    name: 'bianmageshi',
    // component: <Radio.Group options={plainOptions} onChange={this.onChange1} value={value1} />
  }
]

