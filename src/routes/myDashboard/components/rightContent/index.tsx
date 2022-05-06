/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from 'dva'
import { useFetch } from "../../../../utils/useFetch";

import AppCard from '../appCard/index'
import DarkModal from '../darkThemeModal/index'
import Preview from '../../../dashboardTemplate/preview/index'

import {
  Row, Col, Button, Spin, message, Form,
  Switch, Input, Upload, Select, Typography, Tooltip
} from 'antd'
import { IconFont } from '../../../../utils/useIcon'

const { Option } = Select
const { Paragraph } = Typography


const RightContent = (props: any) => {
  const { listData, dashboardManage, dispatch } = props
  /** **工作空间id  */
  const spaceId = 1
  // 发布弹窗、移动分组 modal状态
  const [showFabuModal, setShowFabuModal] = useState(false)
  const [showMoveGroupModal, setShowMoveGroupModal] = useState(false)
  const [newGroupId, setNewGroupId] = useState('')
  // 显示二级发布弹窗
  const [isShared, setIsShared] = useState(false)
  // 是否加密分享
  const [isJMFX, setIsJMFX] = useState(false)
  // 是否显示二级发布弹窗的剩余表单项
  const [notShowRest, setNotShowRest] = useState(false)
  const [showRestIconAngle, setShowRestIconAngle] = useState(90)
  const [fabuBtnLoading, setFabuBtnLoading] = useState(false)

  // 表单项数据 (此处表单数据不适合用Form校验来获取各个form.item的值)
  const [fxljInputValue, setFxljInputValue] = useState<string>('')

  const [curAppId, setCurAppId] = useState('')
  useEffect(() => {
    if (showMoveGroupModal) {
      console.log('每次执行', dashboardManage.groupList);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMoveGroupModal])
  /** ***** 每个appCard 进行复制、删除等操作后都需要刷新内容列表 && 更新左侧分组树 ******* */
  const refreshList = () => {
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
    }
    dispatch({
      type: 'dashboardManage/getTemplateList',
      payload: finalBody,
    })
    dispatch({
      type: 'dashboardManage/getGroupTree',
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
    const [, data] = await useFetch('/visual/application/updateAppGroup', {
      body: JSON.stringify({
        spaceId,
        appId: curAppId,
        newGroupId: newGroupId,
      })
    })
    if (data) {
      message.success({ content: '移动分组成功', duration: 2 })
      // refreshList()
      // 移入分组成功后，需要刷新当前分组下的模板以及刷新左侧分组树
      const finalBody = {
        pageNo: 1,
        pageSize: 1000,
        spaceId,
        groupId: dashboardManage.curSelectedGroup[0]
      }
      dispatch({
        type: 'dashboardManage/getTemplateList',
        payload: finalBody
      })
      dispatch({
        type: 'dashboardManage/getGroupTree',
        payload: {
          spaceId
        }
      })
      cancelMoveGroup()
    } else {
      message.error({ content: '移动分组失败', duration: 2 })
    }
  }
  // 取消移动分组
  const cancelMoveGroup = () => {
    setShowMoveGroupModal(false)
  }


  // TODO 点击发布的时候，怎么判断是否已经发布(easyv上有两个接口)
  // TODO　如果已经发布了，直接就显示　发布详情里的内容
  // 打开发布Modal, 顺便获取当前应用的id
  const changeFabuModal = (bool: boolean, id: string) => {
    setShowFabuModal(bool)
    setCurAppId(id)
  }
  // 关闭发布Modal
  const cancelFabuModal = () => {
    setShowFabuModal(false)
  }

  // 发布大屏
  const fabudaping = () => {
    // TODO 发布成功，将弹窗内容替换成发布详情信息
    setIsShared(true)
    // message.success({ content: '发布成功', duration: 2 })
  }

  /**
   * description: 通过不同的参数发布应用
   * params: 接口参数
   */
  const publishByDiffParams = async (body: object) => {
    const [, data] = await useFetch('/visual/application/share', {
      body: JSON.stringify(body)
    }, {
      errHandleFn: (err: any) => {
        message.error('发布失败');
      },
      onlyNeedWrapData: true
    })
    return data
  }
  // 发布开关 事件
  const releaseChange = async (isCheck: boolean) => {
    // 为true时发布，并获取发布连接
    if(isCheck) {
      const finalBody = {

      }
      const result = await publishByDiffParams(finalBody)
      console.log('result', result);
      if(result.data === null) {
        message.error(result.message)
      }
    } else {
      // 为false时取消发布， 取消发布成功后，切回上一级弹窗
      const finalBody = {}
      publishByDiffParams(finalBody)
      setIsShared(isCheck)
    }
  }
  // 加密分享 开关事件
  const jmfxChange = (isCheck: boolean) => {
    console.log('zzzz', isCheck);
    setIsJMFX(isCheck)
  }

  // 开放应用 开关事件
  const kfChange = (isCheck: boolean) => {

  }
  // 展示分享信息
  const showRestInfo = () => {
    setNotShowRest(!notShowRest)
    setShowRestIconAngle(notShowRest ? 90 : -90)
  }

  return <div className="RightContent-wrap">
    <Row style={{ width: '100%' }} gutter={[26, 26]}>
      {
        listData.map((item: any, index: number) => (
          <Col span={6}>
            <AppCard
              {...item}
              changeFabuModal={changeFabuModal}
              openMoveGroupModal={openMoveGroupModal}
              refreshList={refreshList}
            />
          </Col>
        )
        )
      }
    </Row>
    {/* 发布弹窗 */}
    <DarkModal
      className="fabu-dark-modal"
      title='发布'
      destroyOnClose={true}
      getContainer={false}
      visible={showFabuModal}
      onCancel={cancelFabuModal}
      footer={null}
      style={{
        top: '20%'
      }}
    >
      <div className='fabu-modal'>
        {
          !isShared ?
            <>
              <div className="img-wrap">
                <img src={require("../../../../assets/images/发布.png")} alt="图片正在赶来的路上…" />
              </div>
              <p className="text">发布后，获得大屏分享链接</p>
              <Spin wrapperClassName='fabu-spin' spinning={fabuBtnLoading}>
                <Button style={{ width: '106px' }} type="primary" onClickCapture={() => fabudaping()
                }>发布大屏</Button>
              </Spin>
            </>
            :
            <>
              <div>
                <Form
                  labelCol={{
                    span: 5,
                  }}
                  layout="horizontal"
                  name='releaseForm'
                >
                  <Form.Item
                    colon={false}
                    label="发布"
                    style={{ marginRight: 'auto' }}
                  ><div className="set-flex">
                      <Switch onChange={releaseChange} />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="分享链接"
                    colon={false}
                    className="set-flex"
                  >
                    <div className="set-flex">
                      <Input
                        value={fxljInputValue}
                        onChange={(e) => setFxljInputValue(e.target.value)}
                        style={{ width: '310px', height: '32px', lineHeight: '32px' }}
                      />
                      <Paragraph
                        copyable={{
                          text: `${fxljInputValue}`,
                          onCopy: () => {
                            message.success({ content: '复制链接成功', duration: 1 })
                          },
                          icon: [<Tooltip title="点此复制分享链接" placement="bottom">
                            <Button type="primary" style={{ width: '60px', marginLeft: '16px', height: '30px' }} >复制</Button>
                          </Tooltip>],
                          tooltips: false
                        }}
                        style={{ marginBottom: 0 }}
                      ></Paragraph>
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="加密分享"
                    colon={false}
                  ><div className="jiamifenxiang set-flex ">
                      <Switch onChange={jmfxChange} />
                      {
                        isJMFX &&
                        <div className="set-flex">
                          <div style={{ width: '28px', margin: '0 20px 0 23px' }}>密码 </div><Input style={{ width: '204px' }} />
                        </div>
                      }
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="应用到驾驶舱"
                    colon={false}
                  ><div className="set-flex">
                      <Switch onChange={kfChange} />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="分享信息"
                    colon={false}
                  >
                    <div onClickCapture={showRestInfo} className="set-flex">
                      <IconFont type="icon-fanhui" style={{ cursor: 'pointer' }} rotate={showRestIconAngle} />
                    </div>
                  </Form.Item>
                  {
                    notShowRest &&
                    <div>
                      <Form.Item
                        label="标题"
                        colon={false}
                      ><Input placeholder="请输入标题" /></Form.Item>
                      <Form.Item label="描述"
                        colon={false}
                      ><Input placeholder="请输入描述" /></Form.Item>
                      <Form.Item label="图片地址"
                        colon={false}
                      ><Input placeholder="请输入图片地址" /></Form.Item>
                      <Form.Item label="上传图片"
                        colon={false}
                      >
                        <Upload {...props} className="set-flex">
                          <Button type="primary">点击上传</Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  }
                </Form>
              </div>
            </>
        }
      </div>
    </DarkModal >
    {/* 移入分组弹窗 */}
    <DarkModal
      title='移入分组'
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
          span: 4,
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
              dashboardManage.groupList[0]?.children?.slice(1).map((item: any) =>
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
  ({ dashboardManage }: any) => ({ dashboardManage })
)(RightContent));
