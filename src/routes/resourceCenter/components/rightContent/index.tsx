/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from "dva";
import { http, BASEURL } from "@/services/request";
import MaterialCard from "../materialCard/index";
import DarkModal from "../darkThemeModal/index";
import PreviewModal from "../previewModal/index";


import {
  Row, Col, Button, Spin, message, Form,
  Switch, Input, Upload, Select, Typography, Tooltip,Empty 
} from "antd";
import { IconFont } from "../../../../utils/useIcon";

const { Option } = Select;
const { Paragraph } = Typography;


const RightContent = (props: any) => {
  const { listData, resourceCenter, dispatch,refreshList, spaceId } = props;
  const [showMoveGroupModal, setShowMoveGroupModal] = useState(false);
  const [newGroupId, setNewGroupId] = useState("");
  const [currentItem, setCurrentItem] = useState<any>({});
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  // 发布应用时的参数
  const [curAppId, setCurAppId] = useState("");


  // ************** 可复用方法 ************
  /**  每个appCard 进行复制、删除等操作后都需要刷新内容列表 && 更新左侧分组树  */
  // const refreshList = () => {
  //   const transformId = resourceCenter.curSelectedGroup[0] === '-1' ? null : resourceCenter.curSelectedGroup[0]
  //   const finalBody = {
  //     pageNo: 1,
  //     pageSize: 1000,
  //     spaceId,
  //     subType: transformId ? [null] : [],
  //     type: ['design']
  //   }
  //   dispatch({
  //     type: 'resourceCenter/getRightLists',
  //     payload: finalBody,
  //   })
  //   dispatch({
  //     type: 'resourceCenter/getGroupTree',
  //     payload: {
  //       spaceId
  //     }
  //   })
  // }

  /**** 移动分组Modal相关代码*** */
  const openMoveGroupModal = (appId: string) => {
    setShowMoveGroupModal(true);
    setCurAppId(appId);
  };
  // 关闭移动分组弹窗
  const cancelmoveGroupModal = () => {
    setShowMoveGroupModal(false);
  };
  // 选择 新的分组
  const selectGroup = (val: any) => {
    const reg = RegExp(/Ohter/);
    const id = reg.test(val) ? 0 : val;
    setNewGroupId(id);
  };
  // 确认移动分组
  const confirmMoveGroup = async () => {
    const url = ["myTemp", "systemTemp"].indexOf(currentItem.moduleType) > -1  ? "/visual/appTemplate/updateTemplateGroup" : "/visual/resource/changeGroup";
    const obj = ["myTemp", "systemTemp"].indexOf(currentItem.moduleType) > -1 ? {id: curAppId} : {resourceId: curAppId};
    const data = await http({
      url,
      method: "post",
      body: {
        spaceId: ["systemTemp",'design'].indexOf(currentItem.moduleType) > -1 ? null : spaceId ,
        newGroupId:currentItem.moduleType === 'design' ? null : newGroupId,
        type: currentItem.moduleType === 'design' ? newGroupId : null,
        ...obj
      }
    });
    if (data) {
      message.success({ content: "移动分组成功", duration: 2 });
      // 移入分组成功后，需要刷新当前分组下的模板以及刷新左侧分组树
      refreshList(true);
      cancelMoveGroup();
      setNewGroupId("");
    } else {
      message.error({ content: "移动分组失败", duration: 2 });
    }
  };
  // 取消移动分组
  const cancelMoveGroup = () => {
    setShowMoveGroupModal(false);
  };

  const getCurrentItem = (data: any,type:any) => {
    setCurrentItem(data);
    if(type === "preview"){
      setIsPreviewVisible(true);
    }
  };

  const changeVisible = (type:any) => {
    setIsPreviewVisible(type);
  };
  let selectList = [];
  if(showMoveGroupModal){
    switch(currentItem.moduleType){
      case "myTemp":
      case "systemTemp":
        selectList = currentItem && currentItem.moduleType === "myTemp" ? resourceCenter.groupList[0].children[0].children : resourceCenter.groupList[0].children[1].children;
        break;
      default:
        selectList = currentItem && currentItem.moduleType === "myresource" ? resourceCenter.groupList[1].children[0].children : resourceCenter.groupList[1].children[1].children;
        break;
    }
  }
  return <> 
    {
      listData.length ?
        <div className="RightContent-wrap">
          {
            listData.map((item: any, index: number) => (
              <MaterialCard
                {...item}
                key={index}
                spaceId={spaceId}
                openMoveGroupModal={openMoveGroupModal}
                getCurrentItem = { getCurrentItem }
                refreshList={refreshList}
              />
            )
            ) 
          }
        </div >: <Empty className="empty" description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
    } 
    {/* 预览功能处理 */}
    {
      isPreviewVisible && 
      <PreviewModal currentItem={currentItem} isPreviewVisible={isPreviewVisible} changeVisible={changeVisible} ></PreviewModal>
    }
    {/* 移入分组弹窗 */}
     <DarkModal
      title='移动分组'
      className="move-right-modal"
      destroyOnClose={true}
      getContainer={false}
      visible={showMoveGroupModal}
      onCancel={cancelmoveGroupModal}
      footer={[
        <div className='custom-btn-wrap'>
          <Button className='my-btn cancel-btn' onClickCapture={cancelMoveGroup}>取消</Button>
          <Button className='my-btn confirm-btn' type="primary" onClickCapture={confirmMoveGroup}>确定</Button>
        </div>
      ]}
      style={{
        top: "25%"
      }}
    >
      <Form
        labelCol={{
          span: 5,
        }}
        layout="horizontal"
        name='releaseForm'
        className="move-from"
      >
        <Form.Item label='可选分类'
          name="group"
          rules={[{ required: true }]}
        >
          <Select onSelect={selectGroup} placeholder="请选择">
            {
              // 将全部应用这一分组剔除
              selectList?.slice(1).map((item: any) =>
              (<Option key={item.groupId} value={item.groupId}>      {item.name}
              </Option>)
              )
            }
          </Select>
        </Form.Item>
      </Form>
    </DarkModal>
  </>;
};

export default memo(connect(
  ({ resourceCenter }: any) => ({ resourceCenter })
)(RightContent));
