import { memo, useEffect, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input, Radio, Upload, message, Button } from 'antd'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload


const AddDataSource = (props: any) => {
  const [addForm] = Form.useForm()
  const { visible, changeShowState } = props

  const [curDataType, setCurDataType] = useState('')
  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([])

  const [loading, setLoading] = useState()

  // 获取到最新的curDataType
  useEffect(() => {
    setCurDataType(curDataType)
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
  const handleOk = async () => {
    alert('ok')
    try {
      const values: any = await addForm.validateFields()
      console.log('value', values);
      changeShowState('add')
    } catch (error) {
      console.log('error', error);
    }

  }
  const handleCancel = () => {
    changeShowState('add')
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
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        getContainer={false}
        confirmLoading={loading}
        footer={[
          <Button type='primary' className='modalBtn cancelBtn' onClick={handleCancel}>取消</Button>,
          <Button type='primary' className='modalBtn okBtn' onClick={handleOk}>确定</Button>
        ]}
      >
        <Form
          name="addDataSource"
          labelCol={{
            span: 5,
          }}
          form={addForm}
        >
          <Form.Item
            label="数据源类型"
            name="type"
            rules={generateSingleRules(true, '请选择数据源类型')}
          >
            <Select className='setBackColor' onChange={selectedChange} placeholder="请选择数据源类型"
              dropdownStyle={{ backgroundColor: '#232630' }}
            >
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
            // rules={generateSingleRules(true, '请输入数据源名称')}
            rules={[{
              required: true,
              message: '数据源名称不能为空',
            }]}
          >
            <Input className='setBackColor' placeholder='请输入数据源名称' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='description'
          >
            <TextArea
              className="setBackColor"
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入" maxLength={300} />
          </Form.Item>
          {/* CSV格式 */}
          {
            curDataType === '0' && (
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
                  style={{ marginBottom: '40px' }}
                  name="scwj"
                  rules={generateSingleRules(true, '请选择要上传的文件')}
                >
                  <div className="setBackColor"
                    style={{ height: '120px' }}>
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
            curDataType === '1' && (
              <>
                <Form.Item label="Base URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input className="setBackColor"></Input>
                </Form.Item>
              </>
            )
          }
          {/* MySQL数据库 */}
          {
            curDataType === '2' && (
              <>
                <Form.Item label="链接地址" name="ljdz" rules={generateSingleRules(true, '请输入链接地址')}>
                  <Input className="setBackColor" placeholder='请输入' />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={[
                  {
                    required: true,
                    validator(rule, value) {
                      const reg = /^\d{1,}$/
                      if (!reg.test(value)) {
                        return Promise.reject(new Error('端口号只能由数字组成'))
                      }
                    }
                  }
                ]}>
                  <Input className="setBackColor" placeholder='请输入数字' maxLength={10} />
                </Form.Item>
                <Form.Item label="用户名" name="username" rules={generateSingleRules(true, '请输入用户名')}>
                  <Input className="setBackColor" placeholder='请输入' />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={generateSingleRules(true, '请输入密码')}>
                  <Input className="setBackColor" placeholder='请输入' />
                </Form.Item>
                <Form.Item label="数据库名" name="database" rules={generateSingleRules(true, '请选择数据库')}>
                  <div className='dataBaseName'>
                    <div className='getDataListBtn' onClick={() => getDataBaseList()}>获取数据库列表</div>
                    <Select disabled={Array.isArray(dataBaseList) && dataBaseList.length === 0} className='dataBaseName-Select setBackColor'>
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
    value: '0'
  },
  {
    label: 'API接口',
    value: '1'
  },
  {
    label: 'MySQL数据库',
    value: '2'
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
  multiple: false,
  maxCount: 1,
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


