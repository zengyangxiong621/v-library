/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from 'react'
import './index.less'
import { Modal, Form,  Upload, message, Button } from 'antd'
import { http, BASEURL } from '@/services/request'

const { Dragger } = Upload

const importComponent = (props: any) => {
  const [addForm] = Form.useForm()
  const { visible, changeShowState, refreshTable } = props
  const [fileList, setFileList] = useState([]);
  // 上传的文件在后端存储的地址
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState()
  /**
   * description: 清除弹窗内部维护的所有状态
   */
  const clearModalState = () => {
    setFileUrl('')
    setFileList([])
  }
  /**
   * description: 上传组件
   */
  const handleOk  = async () => {
    // const values: any = await addForm.validateFields()
    if (fileList && fileList.length) { //检验是否有上传文件
      const formData = new FormData();
      formData.append('file', fileList[0]['originFileObj']);
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const data = await http({
        method: 'post',
        url: `/visual/file/uploadModule`,
        body: formData
      })
      if (data) {
        changeShowState('add')
        addForm.resetFields()
        refreshTable()
      }
    } else {
        message.error('上传文件格式错误或未上传文件!');
        return
    }
  }
  const handleCancel = () => {
    changeShowState('add')
    addForm.resetFields()
    clearModalState()
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
      action: `${BASEURL}/visual/file/uploadModule`, 
      beforeUpload(file: any) {
        const { name, size }: { name: string, size: number } = file
        if (size > 1024 * 1024 * 20) {
          message.warning('文件大小超过限制')
          file.status = 'error'
          return false
        }
        const fileSuffixArr = fileSuffix?.split(',')
        // 考虑 date.1.0.1.zip 这个文件名;
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
        return false // 上传时不调取接口        
      },
      onChange(info: any) {
        setFileList(info.fileList);
        const { status, response } = info.file;
        if (status === 'done') {
          message.success(`${info.file.name} 上传成功`);
          setFileUrl(response.data)
        } else if (status === 'error') {
          message.error(`${info.file.name} 上传失败`);
        }
      },
      onDrop(e: any) {
        const { name } = e.dataTransfer.files[0]
        const fileSuffixArr = fileSuffix?.split(',')
        // 考虑 date.1.0.1.zip 这个文件名
        const lastPointIndex = name.lastIndexOf('.')
        const nameSuffix = name.slice(lastPointIndex)
        if (!fileSuffixArr?.includes(nameSuffix)) {
          message.error({
            content: '文件格式不符',
            duration: 2
          })
          return
        }
      },
    };
    if (JSON.stringify(customProps) !== '{}') {
      uploadProps = { ...uploadProps, ...customProps }
    }

    return uploadProps
  }
  // .zip 文件
  const tarUploadProps = generateUploadProps('.zip')
  return (
    <div className='importComponent-wrap'>
      <Modal
        title="导入组件"
        destroyOnClose
        maskClosable={false}
        visible={visible}
        okText="确定"
        cancelText="取消"
        onCancel={handleCancel}
        getContainer={false}
        confirmLoading={loading}
        footer={[
          <div key='footer'>
            <Button type='primary' className='modalBtn cancelBtn' onClick={handleCancel}>取消</Button>
            <Button type='primary' className='modalBtn okBtn' onClick={handleOk}>确定</Button>
          </div>
        ]}
      >
        <Form
          name="importComponent"
          labelCol={{
            span: 5,
          }}
          form={addForm}
        >
          {
             (
              <>
                <Form.Item
                  label="上传组件"
                  style={{ marginBottom: '40px' }}
                  rules={generateSingleRules(true, '请选择要上传的组件')}
                >
                  <div className="setBackColor"
                    style={{ height: '120px' }}>
                    <Dragger {...tarUploadProps}>
                      <p className="ant-upload-hint">
                        点击或拖放文件至此处进行上传<br/>
                        大小不得超过20MB，且必须为.zip格式
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

export default memo(importComponent)

// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message
    }
  ]
}


