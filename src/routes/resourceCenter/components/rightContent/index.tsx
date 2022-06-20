/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from 'dva'
import { http, BASEURL } from '@/services/request'
import MaterialCard from '../materialCard/index'
import DarkModal from '../darkThemeModal/index'
import PreviewModal from '../previewModal/index'


import {
  Row, Col, Button, Spin, message, Form,
  Switch, Input, Upload, Select, Typography, Tooltip
} from 'antd'
import { IconFont } from '../../../../utils/useIcon'

const { Option } = Select
const { Paragraph } = Typography


const RightContent = (props: any) => {
  const { listData, resourceCenter, dispatch } = props
  /** **工作空间id  */
  const spaceId = 1
  const [showMoveGroupModal, setShowMoveGroupModal] = useState(false)
  const [newGroupId, setNewGroupId] = useState('')
  const [currentItem, setCurrentItem] = useState({})
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);


  // 发布应用时的参数
  const [curAppId, setCurAppId] = useState('')


  // ************** 可复用方法 ************
  /**  每个appCard 进行复制、删除等操作后都需要刷新内容列表 && 更新左侧分组树  */
  const refreshList = () => {
    const transformId = resourceCenter.curSelectedGroup[0] === '-1' ? null : resourceCenter.curSelectedGroup[0]
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId: transformId
    }
    dispatch({
      type: 'resourceCenter/getRightLists',
      payload: finalBody,
    })
    dispatch({
      type: 'resourceCenter/getGroupTree',
      payload: {
        spaceId
      }
    })
  }

  /**** 移动分组Modal相关代码*** */
  const openMoveGroupModal = (appId: string) => {
    setShowMoveGroupModal(true)
    setCurAppId(appId)
  }
  // 关闭移动分组弹窗
  const cancelmoveGroupModal = () => {
    setShowMoveGroupModal(false)
  }
  // 选择 新的分组
  const selectGroup = (val: any) => {
    setNewGroupId(val)
  }
  // 确认移动分组
  const confirmMoveGroup = async () => {
    const data = await http({
      url: '/visual/resource/changeGroup',
      method: 'post',
      body: {
        spaceId,
        resourceId: curAppId,
        newGroupId: newGroupId,
      }
    })
    if (data) {
      message.success({ content: '移动分组成功', duration: 2 })
      // refreshList()
      // 移入分组成功后，需要刷新当前分组下的模板以及刷新左侧分组树
      refreshList()
      cancelMoveGroup()
      setNewGroupId('')
    } else {
      message.error({ content: '移动分组失败', duration: 2 })
    }
  }
  // 取消移动分组
  const cancelMoveGroup = () => {
    setShowMoveGroupModal(false)
  }

  const getCurrentItem = (data: any) => {
    setCurrentItem(data)
    setIsPreviewVisible(true)
  }

  const changeVisible = (type:any) => {
    setIsPreviewVisible(type)
  } 

  return <div className="RightContent-wrap">
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
    {/* 预览功能处理 */}
    <PreviewModal currentItem={currentItem} isPreviewVisible={isPreviewVisible} changeVisible={changeVisible} ></PreviewModal>
    {/* 移入分组弹窗 */}
    <DarkModal
      title='移动'
      className="move-dark-modal"
      destroyOnClose={true}
      getContainer={false}
      visible={showMoveGroupModal}
      onCancel={cancelmoveGroupModal}
      footer={[
        <div className='custom-btn-wrap'>
          <Button className='my-btn cancel-btn' onClickCapture={cancelMoveGroup}>取消</Button>
          <Button className='my-btn confirm-btn' onClickCapture={confirmMoveGroup}>确定</Button>
        </div>
      ]}
      style={{
        top: '25%'
      }}
    >
      <Form
        labelCol={{
          span: 5,
        }}
        layout="horizontal"
        name='releaseForm'
      >
        <Form.Item label='可选分组'
          name="group"
          rules={[{ required: true }]}
        >
          <Select onSelect={selectGroup}>
            {
              // 将全部应用这一分组剔除
              resourceCenter.groupList[0]?.children[0].children?.slice(1).map((item: any) =>
              (<Option key={item.groupId} value={item.groupId}>      {item.name}
              </Option>)
              )
            }
          </Select>
        </Form.Item>
      </Form>
    </DarkModal>
  </div >;
};

export default memo(connect(
  ({ resourceCenter }: any) => ({ resourceCenter })
)(RightContent));
