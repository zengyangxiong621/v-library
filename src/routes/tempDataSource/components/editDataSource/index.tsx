import { memo, useEffect, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input, Radio, Upload, message, Button } from 'antd'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload


const EditDataSource = (props: any) => {
  const {
    id,
    baseUrl,
    code, database, description, name, password, port, type, username
  } = props.editDataSourceInfo
  // 获取表单实例准备做校验
  const [editForm] = Form.useForm()
  const { visible, changeShowState } = props

  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([])

  const [loading, setLoading] = useState()


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
  const handleOk = async () => {
    try {
      const values: any = await editForm.validateFields()
      console.log('编辑表单里的数据', values);
      // TODO 直接在这儿用value作为参数发送请求
      fetch('http://127.0.0.1:8080/file/upload', {
        method: 'POST',
        body: values,
      }).then((res) => {
        console.log('res');
      }).catch(err => console.log('ree', err)
      )
    } catch (error) {
      console.log('编辑数据源表单里的错误', error);
    }
    // 关闭框框
    changeShowState('edit')
  }
  const handleCancel = () => {
    changeShowState('edit')
  }

  return (
    <div className='EditDataSource-wrap'>
      <Modal
        title="编辑数据源"
        maskClosable={false}
        visible={visible}
        getContainer={false}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={[
          <Button type='primary' className='modalBtn cancelBtn' onClick={handleCancel}>取消</Button>,
          <Button type='primary' className='modalBtn okBtn' onClick={handleOk}>确定</Button>
        ]}
      >
        <Form
          name="EditDataSource"
          form={editForm}
          labelCol={{
            span: 5,
          }}
        >
          <Form.Item
            label="数据源类型"
            name="type"
            rules={[{ required: true }]}
          >
            <Input className='setBackColor'
              autoComplete='off'
              defaultValue={type}
              disabled>
            </Input>
          </Form.Item>
          <Form.Item
            label="数据源名称"
            name='name'
            rules={generateSingleRules(true, '请输入数据源名称')}>
            <Input defaultValue={name} className='setBackColor' placeholder='请输入数据源名称' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='description'
          >
            <TextArea
              defaultValue={description}
              className="setBackColor"
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入" />
          </Form.Item>
          {/* CSV格式 */}
          {
            type === '0' && (
              <>
                <Form.Item
                  label="编码格式"
                  name="code"
                  rules={generateSingleRules(true, '请选择编码格式')}
                >
                  <Radio.Group defaultValue={code} options={codeFormatOptions} />
                </Form.Item>
                <Form.Item
                  label="上传文件"
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
            type === '1' && (
              <>
                <Form.Item label="Base URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input autoComplete='off' defaultValue={baseUrl} className="setBackColor"></Input>
                </Form.Item>
              </>
            )
          }
          {/* MySQL数据库 */}
          {
            type === '2' && (
              <>
                <Form.Item label="链接地址" name="ljdz" rules={generateSingleRules(true, '请输入链接地址')}>
                  <Input className="setBackColor"
                    placeholder='请输入'
                    autoComplete='off'
                  />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={generateSingleRules(true, '请输入端口')}>
                  <Input defaultValue={port} className="setBackColor" placeholder='请输入' autoComplete='off' />
                </Form.Item>
                <Form.Item label="用户名" name="username" rules={generateSingleRules(true, '请输入用户名')}>
                  <Input defaultValue={username} className="setBackColor" placeholder='请输入' autoComplete='off' />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={generateSingleRules(true, '请输入密码')}>
                  <Input defaultValue={password} className="setBackColor" placeholder='请输入' autoComplete='off' />
                </Form.Item>
                <Form.Item label="数据库名" name="database" rules={generateSingleRules(true, '请输入')}>
                  <div className='dataBaseName'>
                    <div className='getDataListBtn' onClick={() => getDataBaseList()}>获取数据库列表</div>
                    <Select defaultValue={database} className='dataBaseName-Select setBackColor'>
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

export default memo(EditDataSource)

// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message
    }
  ]
}

// 数据源映射
const typeReflect: any = {
  0: 'CSV文件',
  1: 'API接口',
  2: 'MYSQL数据库'
}

// 单选框 CSV类型- 编码格式
const codeFormatOptions = [
  {
    label: '自动检测',
    value: '0',
  },
  {
    label: 'UTF-8',
    value: '1',
  },
  {
    label: 'GBK',
    value: '2',
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

