import { memo, useEffect,useState } from "react";
import "./index.less";
import { Modal, Upload, Form, Select, message } from "antd";
import { connect } from "dva";
import { http, BASEURL } from "@/services/request";
import type { UploadProps } from "antd";
import { Radio, Input } from "antd";
const UploadFile = (props: any) => {
  const { uploadVisible, changeShowState,groupList,refreshList,origin,spaceId} = props;

  let selectList = [];
  switch(origin){
    case "myTemp":
    case "myresource":
      selectList = groupList.children[0].children;
      break;
    case "systemTemp":
    case "design":
      selectList = groupList.children[1].children;
      break;
  }
  const { Option } = Select;
  const Dragger = Upload.Dragger;
  const [uploadForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [fileUrl, setFileUrl] = useState("");
  const [materialType, setMaterialType] = useState(0);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = async () => {
    const value = await uploadForm.validateFields();
    const isTemp = ["myTemp","systemTemp"].indexOf(origin) > -1
    let { file,groupId,materialName,materialType } = value;
    if(fileList && fileList.length) {
      let formData = new FormData();
      groupId = ["myTempOhter", "sysTempOhter"].indexOf(groupId) > -1 ? 0 : groupId;
      let formObj:any = {}
      if(isTemp){
        formData.append("groupId", groupId);
        formData.append("file", file.file);
      }else{
        if(!fileUrl){
          message.error(`请上传正确的文件格式`);
          return false
        }
        formObj = {
          name: materialName,
          format: materialType,
          fileUrl,
        }
      }
      if(["myresource", "myTemp"].indexOf(origin) > -1){
        formData.append("spaceId", spaceId);
        formObj.spaceId = spaceId
        formObj.groupId = groupId
      }
      if(origin === 'design'){
        formObj.type = groupId
      }
      const url = isTemp ? "/visual/appTemplate/import" : "/visual/file/uploadResourceFile";
      setConfirmLoading(true);
      const data = await http({
        method: "post",
        url,
        body: isTemp ? formData : formObj
      }).catch(() => {
        setConfirmLoading(false);
      });
      if(data){
        changeShowState(false);
        message.success("上传成功");
        uploadForm.resetFields();
        refreshList(true);
        setConfirmLoading(false);
      }
    }
  };
  const handleCancel = () => {
    changeShowState(false);
    uploadForm.resetFields();
  };

  const generateUploadProps = (
    customProps?: object
  ) => {
    let isTemp = ["myTemp","systemTemp"].indexOf(origin) > -1 
    let url = isTemp ? `${BASEURL}/visual/file/uploadResource` : `${BASEURL}/visual/file/upload`
    let fileSuffix = isTemp ? ".zip" : materialType ? 'video/mp4,video/avi,video/x-ms-wmv,video/rmvb,audio/mpeg,audio/ogg,audio/mp3,audio/wav,audio/m4a,audio/flac' : "image/png,image/jpeg,image/jpg"
    // 上传框配置
    let uploadProps:UploadProps = {
      name: "file",
      multiple: false,
      maxCount: 1,
      accept: fileSuffix || "",
      action: url,
      headers:{
        authorization:localStorage.getItem("token") || ""
      },
      beforeUpload(file: any) {
        const { name, size, type }: { name: string, size: number, type:any } = file;
        let max = isTemp ? 100 : materialType ? 200 : 20
        if (size > 1024 * 1024 * max) {
          message.warning("文件大小超过限制");
          file.status = "error";
          return false;
        }
        const fileSuffixArr = fileSuffix?.split(",");
        if(isTemp){
          // 考虑 date.1.0.1.zip 这个文件名;
          const lastPointIndex = name.lastIndexOf(".");
          const nameSuffix = name.slice(lastPointIndex);
          if (!fileSuffixArr?.includes(nameSuffix)) {
            message.error({
              content: "请上传符合格式的文件",
              duration: 2
            });
            file.status = "error";
            return false;
          }
          return false; // 上传时不调取接口
        }else{
          if(!fileSuffixArr?.includes(type)){
            message.error({
              content: "请上传符合格式的文件",
              duration: 2
            });
            file.status = "error";
            return false;
          }
        }
      },
      onChange(info: any) {
        setFileList(info.fileList);
        const { status, response } = info.file;
        if (status === "done") {
          message.success(`${info.file.name} 上传成功`);
          setFileUrl(response.data);
        } else if (status === "error") {
          message.error(`${info.file.name} 上传失败`);
        } else if (status === "removed"){
          setFileUrl('');
          setFileList([])
          uploadForm.setFieldsValue({
            file: []
          })

        }
      },
      onDrop(e: any) {
        const { name } = e.dataTransfer.files[0];
        if(isTemp){
          const fileSuffixArr = fileSuffix?.split(",");
          // 考虑 date.1.0.1.zip 这个文件名
          const lastPointIndex = name.lastIndexOf(".");
          const nameSuffix = name.slice(lastPointIndex);
          if (!fileSuffixArr?.includes(nameSuffix)) {
            message.error({
              content: "文件格式不符",
              duration: 2
            });
            return;
          }
        }
      },
    };
    if (JSON.stringify(customProps) !== "{}") {
      uploadProps = { ...uploadProps, ...customProps };
    }

    return uploadProps;
  };

  const fileProps = generateUploadProps();

  const selectChange = (value: any) => {
  };

  const onChange = (e: any) => {
    setMaterialType(e.target.value)
    uploadForm.setFieldsValue({
      file: []
    })
    setFileUrl('');
    setFileList([])
  }

  const setUploadText =() => {
    if(["myTemp","systemTemp"].indexOf(origin) > -1){
      return '大小不得超过100MB，且必须为.zip格式'
    }else{
      return materialType ? '不得超过200M' : '不得超过20M'
    }
  }

  return (
    <div className='upload-file'>
      <Modal
        title={`自定义上传${["myTemp","systemTemp"].indexOf(origin) > -1 ? "模板" : "素材"}`}
        visible={uploadVisible}
        maskClosable={false}
        destroyOnClose
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={confirmLoading}
        getContainer={false}
        style={{
          top: "20%"
        }}
        okText="确定"
        cancelText="取消"
      >
        <Form
          name="importComponent"
          colon={false}
          form={uploadForm}
          initialValues={{ materialType: 0 }}
        >
          {
            ["myTemp","systemTemp"].indexOf(origin) == -1  &&
            <Form.Item label="素材类型" name='materialType' rules={generateSingleRules(true, "请选择素材类型")}>
              <Radio.Group onChange={onChange} value={materialType}>
                <Radio value={0}>图片</Radio>
                <Radio value={1}>音视频</Radio>
              </Radio.Group>
            </Form.Item>
          }
          <Form.Item label="上传文件" name='file'  rules={generateSingleRules(true, "请选择要上传的文件")}>
            <div className='setBackColor'>
              <Dragger {...fileProps} fileList={fileList}>
                <p className="ant-upload-text">点击或拖拽文件至此处进行上传</p>
                <p className="ant-upload-hint">{setUploadText()}</p>
              {/*  */}
              </Dragger>
            </div>
          </Form.Item>
          {
            ["myTemp","systemTemp"].indexOf(origin) == -1  &&
            <Form.Item label="资源名称" name='materialName' rules={generateSingleRules(true, "请输入资源名称")}>
              <Input placeholder="请输入名称"/>
            </Form.Item>
          }
          <Form.Item label="选择分类" name='groupId' rules={generateSingleRules(true, "请选择分组")}>
          <Select className='setBackColor' placeholder="请选择"  onChange={selectChange}>
            {
              (selectList || []).map((item:any) => {
                if(["-1","sysMatAll","myTempAll", "sysTempAll"].indexOf(item.groupId) === -1){
                  return (<Option value={item.groupId} key={item.groupId}>{item.name}</Option> );
                }
              })
            }
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
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
  ];
};