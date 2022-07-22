import { memo, useEffect,useState } from "react";
import "./index.less";
import { Modal, Upload, Form, Select, message } from "antd";
import { connect } from "dva";
import { http, BASEURL } from "@/services/request";
const UploadFile = (props: any) => {
  const { uploadVisible, changeShowState,groupList,refreshList,origin} = props;

  let selectList = []
  switch(origin){
    case 'myTemp':
    case 'myresource':
      selectList = groupList.children[0].children
      break
    case 'systemTemp':
    case 'design':
      selectList = groupList.children[1].children
      break
  }
  const { Option } = Select;
  const Dragger = Upload.Dragger;
  const [uploadForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState('')
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = async () => {
    const value = await uploadForm.validateFields()
    let { file,groupId } = value
    if(fileList && fileList.length) {
      const formData = new FormData();
      groupId = ['myTempOhter', 'sysTempOhter'].indexOf(groupId) > -1 ? 0 : groupId
      formData.append('file', file.file);
      formData.append('groupId', groupId);
      if(['myresource', 'myTemp'].indexOf(origin) > -1){
        formData.append('spaceId', '1');
      }
      let url = ['myTemp','systemTemp'].indexOf(origin) > -1 ? '/visual/appTemplate/import' : '/visual/file/uploadResource'
      setConfirmLoading(true);
      const data = await http({
        method: 'post',
        url,
        body: formData
      }).catch(() => {
        setConfirmLoading(false);
      })
      if(data){
        changeShowState(false)
        message.success('上传成功')
        uploadForm.resetFields()
        refreshList()
        setConfirmLoading(false);
      }
    }
  };
  const handleCancel = () => {
    changeShowState(false);
    uploadForm.resetFields()
  };

  const generateUploadProps = (
    fileSuffix: string = "",
    customProps?: object
  ) => {
    // 上传框配置
    let uploadProps = {
      name: "file",
      multiple: false,
      maxCount: 1,
      accept: fileSuffix || "",
      action: `${BASEURL}/visual/file/uploadResource`,
      beforeUpload(file: any) {
        const { name, size }: { name: string, size: number } = file
        if (size > 1024 * 1024 * 100) {
          message.warning('文件大小超过限制')
          file.status = 'error'
          return false
        }
        const fileSuffixArr = fileSuffix?.split(',');
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
        const fileSuffixArr = fileSuffix?.split(',');
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
    if (JSON.stringify(customProps) !== "{}") {
      uploadProps = { ...uploadProps, ...customProps };
    }

    return uploadProps;
  };

  const fileProps = generateUploadProps(".zip");

  const selectChange = (value: any) => {
  }

  return (
    <Modal
      title="自定义上传素材"
      visible={uploadVisible}
      maskClosable={false}
      destroyOnClose
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={confirmLoading}
      getContainer={false}
      okText="确定"
      cancelText="取消"
    >
      <Form name="importComponent"  form={uploadForm}>
        <Form.Item label="上传文件" name='file'  rules={generateSingleRules(true, '请选择要上传的组件')}>
          <Dragger {...fileProps}>
            <p className="ant-upload-text">点击或拖拽文件至此处进行上传</p>
            <p className="ant-upload-hint">大小不得超过100MB，且必须为.zip格式</p>
          </Dragger>
        </Form.Item>
        {/* <Form.Item label="资源名称"></Form.Item> */}
        <Form.Item label="选择分类" name='groupId' rules={generateSingleRules(true, '请选择分组')}>
        <Select placeholder="请选择"  onChange={selectChange}>
          {
            (selectList || []).map((item:any) => {
              if(['-1','sysMatAll','myTempAll', 'sysTempAll'].indexOf(item.groupId) === -1){
                return (<Option value={item.groupId} key={item.groupId}>{item.name}</Option> )
              }
            })
          }
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default memo(
  UploadFile
  );
// 生成单个校验规则
const generateSingleRules = (required: boolean, message: string | number): any[] => {
  return [
    {
      required,
      message
    }
  ]
}