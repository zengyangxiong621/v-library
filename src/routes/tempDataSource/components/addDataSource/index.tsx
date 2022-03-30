import { memo, useEffect, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input, Radio, Upload, message, Button, Spin } from 'antd'

import { useFetch } from '../../tool/useFetch'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload


const AddDataSource = (props: any) => {
  const [addForm] = Form.useForm()
  const { visible, changeShowState, refreshTable } = props

  const [curDataType, setCurDataType] = useState('')
  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([])
  // 最终选择的数据库的名称
  // const [selectDB, setSelectDB] = useState('')
  // 上传的文件在后端存储的地址
  const [fileUrl, setFileUrl] = useState('')

  const [loading, setLoading] = useState()
  const [getDBListLoading, setGetDBListLoading] = useState(false)

  // 获取到最新的curDataType
  useEffect(() => {
    setCurDataType(curDataType)
  }, [curDataType])
  /**
   * description: 获取可选择的数据库名称列表
   */
  const getDataBaseList = async () => {
    // 点击  获取数据库列表 按钮时 先校验是否已经填了相关字段
    const values = await addForm.validateFields(['port', 'username', 'password', 'host'])
    // 通过表单实例方法拿到 需要的几个字段
    // const values = addForm.getFieldsValue(['port', 'username', 'password', 'host'])
    // 攒成目标参数
    const finalParams = {
      ...values,
      dataBaseType: curDataType
    }
    //！ 请求数据库列表
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/queryDataBaseList', {
      body: JSON.stringify(finalParams)
    })
    // data 只是个数组，处理成select需要的形式
    const formatData = data.map((item: any) => ({
      label: item,
      value: item
    }))
    setDataBaseList(formatData)
  }
  /**
   * description: 新增数据源
   */
  const handleOk = async () => {
    const values: any = await addForm.validateFields()
    const { name, type, description, ...rest } = values
    // 判断当前是否是数据库
    const dataBaseOrNormal = dataTypeClassify.get(curDataType)
    let finalType = type
    let finalSourceConfig = rest
    //如果是数据库类型的数据源的话，要加上 dataBaseType 字段
    // 数据资源类型type 也要变成 'RDBMS'

    if (dataBaseOrNormal === 'rdbms') {
      finalSourceConfig.dataBaseType = curDataType
      finalType = 'RDBMS'
    }
    if (dataBaseOrNormal === 'csv') {
      finalSourceConfig.fileUrl = fileUrl
    }
    // 东拼西凑攒参数
    const finalParams = {
      workSpaceId: 1,
      name,
      type: finalType,
      description,
      [`${dataBaseOrNormal}SourceConfig`]: finalSourceConfig
    }
    console.log('value', finalParams);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/add', {
      body: JSON.stringify(finalParams)
    })
    console.log('添加Mysql数据源', data);
    if (data) {
      // 成功后  -关闭弹窗 -清除表单 -刷新表格
      changeShowState('add')
      addForm.resetFields()
      refreshTable()
    }
  }

  const handleCancel = () => {
    changeShowState('add')
  }
  // 选择数据源类型
  const selectedChange = (val: any) => {
    setCurDataType(val)
  }
  // 选择数据库名
  const selectDatabase = (val: any) => {
    // setSelectDB(val)
    addForm.setFieldsValue({ database: val })
  }


  // 上传框配置
  const uploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    action: 'http://10.202.233.230:9572/visual/file/upload',
    onChange(info: any) {
      const { status, response } = info.file;
      if (status === 'done') {
        message.success(`${info.file.name} 上传成功`);
        setFileUrl(response.data)
      } else if (status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    // onDrop(e: any) {
    //   console.log('Dropped files', e.dataTransfer.files);
    // },
  };
  return (
    <div className='AddDataSource-wrap'>
      <Modal
        title="添加数据源"
        destroyOnClose
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
            <Select
              className='setBackColor' onChange={selectedChange} placeholder="请选择数据源类型"
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
            <Input
              className='setBackColor' placeholder='请输入数据源名称' autoComplete='off' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='description'
          >
            <TextArea
              // value={baseParams.description}
              className="setBackColor"
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入" maxLength={300} />
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
                  style={{ marginBottom: '40px' }}
                  // name="fileUrl"
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
            curDataType === 'RESTFUL_API' && (
              <>
                <Form.Item label="Base URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input
                    className="setBackColor" autoComplete='off' ></Input>
                </Form.Item>
              </>
            )
          }
          {/* MYSQL数据库 */}
          {
            curDataType === 'MYSQL' && (
              <>
                <Form.Item label="链接地址" name="host" rules={generateSingleRules(true, '请输入链接地址')}>
                  <Input className="setBackColor"
                    // autoComplete='off'
                    placeholder='请输入' />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={[
                  {
                    required: true,
                    // validator(rule, value) {
                    //   const reg = /^\d{1,}$/
                    //   if (!reg.test(value)) {
                    //     return Promise.reject(new Error('端口号只能由数字组成'))
                    //   }
                    // }
                  }
                ]}>
                  <Input
                    autoComplete='off'
                    className="setBackColor" placeholder='请输入数字' maxLength={10} />
                </Form.Item>
                <Form.Item label="用户名" name="username" rules={generateSingleRules(true, '请输入用户名')}>
                  <Input
                    autoComplete='off'
                    className="setBackColor" placeholder='请输入' />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={generateSingleRules(true, '请输入密码')}>
                  <Input
                    autoComplete='off'
                    className="setBackColor" placeholder='请输入' />
                </Form.Item>
                <Form.Item label="数据库名" name="database" rules={generateSingleRules(true, '请选择数据库')}>
                  <div className='dataBaseName'>
                    <Spin spinning={getDBListLoading}>
                      <div className='getDataListBtn' onClick={() => getDataBaseList()}>获取数据库列表</div>
                    </Spin>
                    <Select
                      placeholder="请选择数据库"
                      disabled={Array.isArray(dataBaseList) && dataBaseList.length === 0}
                      onChange={selectDatabase}
                      className='dataBaseName-Select setBackColor'>
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
          {/* JSON */}
          {
            curDataType === 'JSON' && (
              <>
                <Form.Item label="JSON URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input
                    className="setBackColor" autoComplete='off' ></Input>
                </Form.Item>
              </>
            )
          }
          {/* EXCEL */}
          {
            curDataType === 'EXCEL' && (
              <>
                <Form.Item label="EXCEL URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input
                    className="setBackColor" autoComplete='off' ></Input>
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

type TSelectOptionItems = {
  label: string,
  value: string,
}
// 可选择的数据源类型
const dataSourceType: TSelectOptionItems[] = [
  {
    label: 'CSV文件',
    value: 'CSV'
  },
  {
    label: 'POSTGRESQL',
    value: 'POSTGRESQL',
  },
  {
    label: 'MYSQL',
    value: 'MYSQL',
  },
  {
    label: 'ES',
    value: 'ES'
  },
  {
    label: 'API',
    value: 'RESTFUL_API',
  },
  {
    label: 'JSON',
    value: 'JSON',
  },
  {
    label: 'EXCEL',
    value: 'EXCEL',
  },
]
// 根据选择的数据源类型，来动态生成 []SourceConfig
const dataTypeClassify: any = new Map([
  ['CSV', 'csv'],
  ['RESTFUL_API', 'api'],
  ['JSON', 'json'],
  ['EXCEL', 'excel'],
  ['POSTGRESQL', 'rdbms'],
  ['MYSQL', 'rdbms'],
  ['ES', 'rdbms'],
])

// 单选框 CSV类型- 编码格式
const codeFormatOptions: TSelectOptionItems[] = [
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



