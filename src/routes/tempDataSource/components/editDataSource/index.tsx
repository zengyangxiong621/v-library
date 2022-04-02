/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useEffect, useState } from 'react'
import './index.less'

import { Modal, Form, Select, Input, Radio, Upload, message, Button, Spin } from 'antd'

import { useFetch, BASE_URL } from '../../tool/useFetch'
import { info } from 'console'

const { Option } = Select
const { TextArea } = Input
const { Dragger } = Upload


const EditDataSource = (props: any) => {
  const {
    id,
    description,
    name,
    type,
    apiSourceConfig,
    csvSourceConfig,
    jsonSourceConfig,
    excelSourceConfig,
    rdbmsSourceConfig,
  } = props.editDataSourceInfo
  const { visible, changeShowState, refreshTable } = props

  console.table('看一下props', props.editDataSourceInfo);
  // 获取表单实例准备做校验
  const [editForm] = Form.useForm()


  // 与添加数据源不同，这里需要判断数据源的类型(csv,json,excel)来确定初始的fileUrl
  const [fileUrl, setFileUrl] = useState('')
  useEffect(() => {
    setFileUrl(fileUrl)
    console.log('最新的fileUrl', fileUrl);
  }, [fileUrl])

  // 因为后端中关系型数据库统一表示为RDBMS, 此处将数据库数据源类型拆解出来
  const [dataSourceType, setDataSourceType] = useState()
  useEffect(() => {
    if (type === 'RDBMS') {
      // 获取当前是那种类型的数据库
      setDataSourceType(rdbmsSourceConfig.dataBaseType)
    } else {
      // 根据数据源类型来获取fileUrl
      setDataSourceType(type)
      switch (type) {
        case 'CSV':
          setFileUrl(csvSourceConfig?.fileUrl);
          break;
        case 'JSON':
          setFileUrl(jsonSourceConfig?.fileUrl);
          break;
        case 'EXCEL':
          setFileUrl(excelSourceConfig?.fileUrl);
          break;
        default: break;
      }
    }
  }, [id])


  // 通过后台获取到的数据库列表
  const [dataBaseList, setDataBaseList] = useState([])
  // 上传的文件在后端存储的地址,
  // 数据库连接是否测试成功
  const [isConnect, setIsConnect] = useState(false)

  const [loading, setLoading] = useState(false)
  const [getDBListLoading, setGetDBListLoading] = useState(false)
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [testConnectLoading, setTestConnectLoading] = useState(false)
  /**
   * description: 测试数据库连接
   */
  const testConnect = async () => {
    // 点击  获取数据库列表 按钮时 先校验是否已经填了相关字段
    const values = await editForm.validateFields(['port', 'username', 'password', 'host', 'database'])
    const finalParams = {
      ...values,
      dataBaseType: dataSourceType
    }
    setTestConnectLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/connectTest', {
      body: JSON.stringify(finalParams)
    })
    setTestConnectLoading(false)
    if (data) {
      message.success({ content: '连接成功', duration: 2 })
      setIsConnect(true)
    }
  }
  /**
   * description: 获取可选择的数据库名称列表
   */
  const getDataBaseList = async () => {
    // 点击  获取数据库列表 按钮时 先校验是否已经填了相关字段
    const values = await editForm.validateFields(['port', 'username', 'password', 'host'])
    // 攒成目标参数
    const finalParams = {
      ...values,
      dataBaseType: dataSourceType
    }
    //！ 请求数据库列表
    setGetDBListLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/queryDataBaseList', {
      body: JSON.stringify(finalParams)
    })
    setGetDBListLoading(false)
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
    /***** 点击确定btn时，应该先触发表单校验，再对数据库测试连接进行判断****/
    const values: any = await editForm.validateFields()
    //------ 由于表单initValues里的 <<type>> 为 RESTFUL_API 的时候已经被转成了 API
    //-----所以这里解构出来的type已经是API了
    const { name, type, description, ...rest } = values
    // 判断当前是否是数据库(这儿是为了凑 (rdbms/api/csv)SourceConfig这种格式的参数的  和上方的dataSourceType不同的)
    const dataBaseOrNormal = dataTypeClassify.get(type)
    // 最终数据源的类型, 如果是特殊的类型（RDBMS和API),需要在下面处理一下
    let finalType = type
    let finalSourceConfig = rest
    //如果是数据库类型的数据源的话，
    //-- 先判断数据库测试连接是否成功
    //-- 要加上 dataBaseType 字段
    //-- 数据资源类型type 也要变成 'RDBMS'
    if (dataBaseOrNormal === 'rdbms') {
      // 如果数据库测试连接不成功，直接中止
      if (!isConnect) {
        message.warning({ content: '数据库测试连接失败或未执行，请检查相关连接参数后重试', duration: 2 })
        return
      }
      finalSourceConfig.dataBaseType = type
      finalType = 'RDBMS'
    }
    // 如果是需要上传文件的这几种类型，先检查有没有fileUrl
    if (['csv', 'json', 'excel'].includes(dataBaseOrNormal)) {
      if (!fileUrl) {
        message.error('上传文件格式错误或未上传文件')
        return
      }
      finalSourceConfig = {}
      finalSourceConfig.fileUrl = fileUrl
    }
    // 如果是API类型,参数中的type类型需要变成RESTFUL_API
    if (dataBaseOrNormal === 'api') {
      finalType = 'RESTFUL_API'
    }

    // 东拼西凑攒参数
    const finalParams = {
      spaceId: 1,
      id,
      name,
      type: finalType,
      description,
      [`${dataBaseOrNormal}SourceConfig`]: finalSourceConfig
    }
    // 发送请求
    setLoading(true)
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [err, data] = await useFetch('/visual/datasource/update', {
      body: JSON.stringify(finalParams)
    })
    setLoading(false)
    if (data) {
      // 成功后  -关闭弹窗 -清除表单 -刷新表格
      changeShowState('edit')
      editForm.resetFields()
      refreshTable()
    }
  }

  const handleCancel = () => {
    changeShowState('edit')
  }
  // 选择数据库名
  const selectDatabase = (val: any) => {
    editForm.setFieldsValue({ database: val })
    // 选择了数据库名，开放测试连接按钮
    setBtnDisabled(false)
  }

  /**
   * description: 针对不同格式文件的上传 生成 相应的uploadProps
   * params: @customProps -- 要新增或者覆盖的配置,
   *         @fileSuffix -- 支持的文件后缀
   * return:
   */
  const generateUploadProps = (fileSuffix: string = '', customProps?: object) => {
    // 上传框配置
    let uploadProps = {
      name: 'file',
      multiple: false,
      maxCount: 1,
      accept: fileSuffix || '',
      action: `${BASE_URL}/visual/file/upload`,
      beforeUpload(file: any) {
        const { name }: { name: string } = file
        const fileSuffixArr = fileSuffix?.split(',')
        // 考虑 cdb.la...yer.json / ......csv 这种文件名
        const lastPointIndex = name.lastIndexOf('.')
        const nameSuffix = name.slice(lastPointIndex)
        if (!fileSuffixArr?.includes(nameSuffix)) {
          message.error({
            content: '请上传符合格式的文件',
            duration: 2
          })
          file.status = 'error'
          return false
        }
      },
      onChange(info: any) {
        const { status, response } = info.file;
        if (status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          setFileUrl(response.data)
        } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败`);
          return
        }
      }
    };
    if (JSON.stringify(customProps) !== '{}') {
      uploadProps = { ...uploadProps, ...customProps }
    }
    return uploadProps
  }
  // .json 文件
  const jsonUploadProps = generateUploadProps('.json')
  // .csv 文件
  const csvUploadProps = generateUploadProps('.csv')
  // .excel 文件
  const excelUploadProps = generateUploadProps('.excel')

  /*** 编辑表单各项初始值 */
  const editFormInitValues = {
    description,
    name,
    // 后端的 API 对应的枚举值为 RESTFUL_API,转一手
    type: dataSourceType === 'RESTFUL_API' ? 'API' : dataSourceType,
    baseUrl: apiSourceConfig?.baseUrl,
    code: csvSourceConfig?.code,
    database: rdbmsSourceConfig?.database,
    password: rdbmsSourceConfig?.password,
    port: rdbmsSourceConfig?.port,
    host: rdbmsSourceConfig?.host,
    username: rdbmsSourceConfig?.username,
    jsonFileUrl: jsonSourceConfig?.fileUrl,
    csvFileUrl: csvSourceConfig?.fileUrl,
    excelFileUrl: excelSourceConfig?.fileUrl,
  }
  return (
    <div className='EditDataSource-wrap'>
      <Modal
        title="编辑数据源"
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
          name="editDataSource"
          labelCol={{
            span: 5,
          }}
          form={editForm}
          initialValues={editFormInitValues}
        >
          <Form.Item
            label="数据源类型"
            name="type"
            rules={[{ required: true }]}
          >
            <Input className='setBackColor'
              autoComplete='off'
              // defaultValue={type}
              disabled>
            </Input>
          </Form.Item>
          <Form.Item
            label="数据源名称"
            name='name'
            rules={generateSingleRules(true, '请输入数据源名称')}
          >
            <Input
              // defaultValue={name}
              className='setBackColor'
              placeholder='请输入数据源名称'
              autoComplete='off' />
          </Form.Item>
          <Form.Item
            label="描述"
            name='description'
          >
            <TextArea
              // defaultValue={description}
              className="setBackColor"
              autoSize={{ minRows: 3, maxRows: 6 }}
              placeholder="请输入" maxLength={300} />
          </Form.Item>
          {/* CSV格式 */}
          {
            dataSourceType === 'CSV' && (
              <>
                <Form.Item
                  label="编码格式"
                  name="code"
                  rules={generateSingleRules(true, '请选择编码格式')}
                >
                  <Radio.Group
                    // defaultValue={code}
                    options={codeFormatOptions}
                  />
                </Form.Item>
                <Form.Item
                  label="上传文件"
                  style={{ marginBottom: '40px' }}
                  name="csvFileUrl"
                  rules={generateSingleRules(true, '请重新上传文件')}
                >
                  <div className="setBackColor"
                    style={{ height: '120px' }}>
                    <Dragger {...csvUploadProps}>
                      <p className="ant-upload-hint">
                        点击或拖拽上传新的 <span style={{ color: '#ccc', fontSize: '18px' }}>csv</span> 格式文件，10M以内
                      </p>
                    </Dragger>
                  </div>
                </Form.Item>
              </>
            )
          }
          {/* API接口 */}
          {
            dataSourceType === 'RESTFUL_API' && (
              <>
                <Form.Item label="Base URL"
                  name='baseUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <Input
                    className="setBackColor" autoComplete='off'
                  // defaultValue={baseUrl}
                  ></Input>
                </Form.Item>
              </>
            )
          }
          {/*//TODO MYSQL数据库 和 PGSQL暂时先共用一个，已经明确两者有差异，视后续的改动决定是否单独抽出去 */
          }
          {
            (dataSourceType === 'MYSQL' || dataSourceType === 'POSTGRESQL') && (
              <>
                <Form.Item label="链接地址" name="host" rules={generateSingleRules(true, '请输入链接地址')}>
                  <Input className="setBackColor"
                    autoComplete='off'
                    placeholder='请输入'
                  // defaultValue={host}
                  />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={[
                  {
                    required: true,
                    validator(rule, value) {
                      const reg = /^\d{1,}$/
                      if (!reg.test(value)) {
                        return Promise.reject(new Error('端口号只能由数字组成'))
                      } else {
                        return Promise.resolve()
                      }
                    }
                  }
                ]}>
                  <Input
                    autoComplete='off'
                    // defaultValue={port}
                    className="setBackColor"
                    placeholder='请输入数字'
                    maxLength={10} />
                </Form.Item>
                <Form.Item label="用户名" name="username" rules={generateSingleRules(true, '请输入用户名')}>
                  <Input
                    autoComplete='off'
                    // defaultValue={username}
                    className="setBackColor"
                    placeholder='请输入' />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={generateSingleRules(true, '请输入密码')}>
                  <Input.Password
                    autoComplete='off'
                    className="setBackColor"
                    placeholder='请输入'
                  // defaultValue={password}
                  />
                </Form.Item>
                <Form.Item label="数据库名" name="database" rules={generateSingleRules(true, '请选择数据库')}>
                  <div className='dataBaseName'>
                    <Spin spinning={getDBListLoading}>
                      <div className='getDataListBtn' onClick={() => getDataBaseList()}>获取数据库列表</div>
                    </Spin>
                    <Select
                      // defaultValue={database}
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
                  <Spin wrapperClassName='testConnectWrap' spinning={testConnectLoading}>
                    <div style={{ cursor: btnDisabled ? 'not-allowed' : 'pointer' }}>
                      <div className={`${btnDisabled && 'btnDisabled'} testConnect`} onClick={() => testConnect()}>测试连接</div>
                    </div>
                  </Spin>
                </Form.Item>
              </>
            )
          }
          {/* JSON */}
          {
            dataSourceType === 'JSON' && (
              <>
                <Form.Item
                  label="上传文件"
                  style={{ marginBottom: '40px' }}
                  name="jsonFileUrl"
                  rules={generateSingleRules(true, '请选择要上传的文件')}
                >
                  <div className="setBackColor"
                    style={{ height: '120px' }}>
                    <Dragger {...jsonUploadProps}>
                      <p className="ant-upload-hint">
                        点击或拖拽上传新的 <span style={{ color: '#ccc', fontSize: '18px' }}>json</span> 格式文件，10M以内
                      </p>
                    </Dragger>
                  </div>
                </Form.Item>
              </>
            )
          }
          {/* EXCEL */}
          {
            dataSourceType === 'EXCEL' && (
              <>
                <Form.Item label="上传文件"
                  name='excelFileUrl'
                  rules={generateSingleRules(true, '请输入Base URL')}
                >
                  <div className="setBackColor"
                    style={{ height: '120px' }}>
                    <Dragger {...excelUploadProps}>
                      <p className="ant-upload-hint">
                        点击或拖拽上传新的 <span style={{ color: '#ccc', fontSize: '18px' }}>excel</span> 格式文件，10M以内
                      </p>
                    </Dragger>
                  </div>
                </Form.Item>
              </>
            )
          }
        </Form >
      </Modal >
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

type TSelectOptionItems = {
  label: string,
  value: string,
}
// 根据选择的数据源类型，来动态生成 []SourceConfig
const dataTypeClassify: any = new Map([
  ['CSV', 'csv'],
  // ['RESTFUL_API', 'api'],
  ['API', 'api'],
  ['JSON', 'json'],
  ['EXCEL', 'excel'],
  ['POSTGRESQL', 'rdbms'],
  ['MYSQL', 'rdbms'],
  ['ES', 'rdbms'],
])
// ['CSV', 'CSV'],
//   ['RESTFUL_API', 'RESTFUL_API'],
//   ['JSON', 'JSON'],
//   ['EXCEL', 'EXCEL'],
//   ['POSTGRESQL', 'RDBMS'],
//   ['MYSQL', 'RDBMS'],
//   ['ES', 'RDBMS'],

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


