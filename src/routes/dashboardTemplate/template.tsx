/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import "./index.less";

import { IconFont } from "../../utils/useIcon";
import { SearchOutlined } from "@ant-design/icons";
import { Input, Row, Col, Modal, Form, Select, Button } from "antd";

import TemplateCard from "./templateCard/index";
import Preview from "./preview/index";
import DarkModal from "../myDashboard/components/darkThemeModal/index";
import { http } from "@/services/request";

const { Option } = Select;

const DashboardTemplate = (props: any) => {
  const { history } = props;
  const [createForm] = Form.useForm();
  const [listData, setListData] = useState([]);
  const [urlArr, setUrlArr] = useState([]);
  // 放入预览模板中的图片链接数组
  // const urlArr = listData.map((item: any) => item.imgUrl)

  const [curImgIndex, setCurImgIndex] = useState(-1);
  const [inputValue, setInputValue] = useState("");
  const [showCreateAppModal, setShowCreateAppModal] = useState(false);
  const curWorkspace:any = localStorage.getItem("curWorkspace"); 
  const spaceId = JSON.parse(curWorkspace)?.id;

  const [groupOptions, setGroupOptions] = useState([]);
  // 不选择分组的时候，默认选择未分组,未分组的groupId是 0 <string>
  const [selectedGroup, setSelectedGroup] = useState("0");
  const [appName, setAppName] = useState("");
  // 点击 推荐/我的 模板时传过来的模板id
  const [templateId, setTemplateId] = useState<string>("");

  useEffect(() => {
    getHotTemplate();
  },[]);
  
  const getHotTemplate = async(value?:any) => {
    const data = await http({
      url: "/visual/appTemplate/list",
      method: "post",
      body: {
        map: {created_time:false},
        pageNo: 1,
        pageSize: 10,
        groupId: null,
        spaceId: null,
        name: value
      }
    });
    if(data){
      setListData(data.content);
      const urlArr = data.content.map((item: any) => item.photoUrl);
      setUrlArr(urlArr);
    }
  };

  const GetGroups = async () => {
    const data = await http({
      url: `/visual/application/queryGroupList?spaceId=${spaceId}`,
      method: "get"
    });
    const pickNameArr = data.slice(1).map((item: any) => ({ label: item.name, value: item.groupId }));
    setGroupOptions(pickNameArr);
  };
  // 搜索
  const search = (value: any) => {
    getHotTemplate(value);
  };
  const backClick = () => {
    history.goBack();
  };

  // 新建应用弹窗 1.点击空白模板
  // 2.通过已有模板创建(带模板id的)
  const addTemplate = (mobanId?: string) => {
    setShowCreateAppModal(true);
    // 弹窗出现，发送请求
    // 有的话再设置
    mobanId && setTemplateId(mobanId);
    GetGroups();
  };
  // 确认新建
  const createApp = async () => {
    // 先校验
    const values: any = await createForm.validateFields();
    //TODO 发送请求
    const finalBody = {
      spaceId,
      ...values,
      groupId: selectedGroup
    };
    // templateId && (finalBody.templateId = templateId)
    const data = await http({
      url: "/visual/application/createBlankApp",
      method: "post",
      body: finalBody
    });
    // 请求成功
    // 关闭弹窗 - 清除弹窗缓存 - 跳转至应用所属的画布
    if (data) {
      setShowCreateAppModal(false);
      createForm.resetFields();
      history.push(`/dashboard/${data.screenId}`);
    }
  };
  //关闭弹窗
  const cancelCreateApp = () => {
    setShowCreateAppModal(false);
    createForm.resetFields();
  };

  const appNameChange = (val: any) => {
    setAppName(val);
  };
  // 手动选择分组
  const groupSelectSelect = (val: any) => {
    setSelectedGroup(val);
  };

  // 获取当前需要预览的模板 的index
  const getCurImgIndex = (i: number) => {
    setCurImgIndex(i);
  };

  // 关闭预览弹窗
  const modalCancel = () => {
    setCurImgIndex(-1);
  };

  return (
    <div key={props.location.pathname}>
      <div className='DashboardTemplate-wrap'>
        <header className='back-bar'>
          <IconFont onClick={() => backClick()} className='back-icon' type='icon-fanhui' />
          <span className='text'>取消创建</span>
        </header>
        <div className="search-wrap">
          <Input.Search placeholder="搜索"
            className='search'
            allowClear
            maxLength={40}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onSearch={search}
          />
        </div>
        {/* 模板列表 */}
        <div className="list-wrap">
          <Row gutter={[26, 25]} justify='start'>
            <Col span={6}>
              <div className="blank-template" onClickCapture={() => addTemplate()}>
                <span className='text'>
                  <IconFont className='tianjia-icon' type='icon-xinjianfenzu' />
                  空白模板
                </span>
              </div>
            </Col>
            {
              listData.map((item: any, index: number) => (
                <Col span={6} >
                  <TemplateCard {...item}
                    spaceId={spaceId}
                    curIndex={index}
                    getCurImgIndex={getCurImgIndex}
                    addTemplate={addTemplate}
                  />
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
      {/* 预览模板 */}
      {
        curImgIndex > -1 &&
        <Modal
          visible={curImgIndex > -1}
          width="90vw"
          footer={null}
          keyboard={true}
          closeIcon={() => <></>} // 除去关闭按钮
          style={{
            top: "8vh"
          }}
          bodyStyle={{
            padding: "0"
          }}
          onCancel={() => modalCancel()}
        >
          <Preview srcUrlArr={urlArr} curIndex={curImgIndex} />
        </Modal>
      }
      {/* 创建应用弹窗 */}
      <DarkModal
        title='创建应用'
        className="createApp-modal"
        destroyOnClose={true}
        getContainer={false}
        visible={showCreateAppModal}
        onCancel={cancelCreateApp}
        footer={[
          <div className='custom-btn-wrap'>
            <Button className='my-btn cancel-btn' onClickCapture={cancelCreateApp}>取消</Button>
            <Button className='my-btn confirm-btn' onClickCapture={createApp}>确定</Button>
          </div>
        ]}
        style={{
          top: "25%",
        }}
      >
        <Form
          name="createForm"
          form={createForm}
          labelCol={{
            span: 5
          }}
        >
          <Form.Item
            label="应用名称"
            name="name"
            colon={false}
            rules={[{ required: true, message: "请输入应用名称" }]}
          >
            <Input 
              placeholder='请输入应用名称'
              className='setBackColor'
              autoComplete='off'
              value={appName}
              maxLength={20}
              showCount={true}
              onChange={(e) => appNameChange(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="所属分组"
            colon={false}
          >
            <Select
              className='setBackColor'
              defaultValue='未分组'
              onChange={(val) => groupSelectSelect(val)}
            >
              {
                groupOptions.map((item: any) => (
                  <Option key={item.value} value={item.value}>{item.label}</Option>
                ))
              }
            </Select>
          </Form.Item>
        </Form>
      </DarkModal>
    </div>
  );
};

export default memo(DashboardTemplate);