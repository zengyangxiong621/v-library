/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useEffect, useState } from "react";
import "./index.less";
import { connect } from 'dva'
import { http, BASEURL } from '@/services/request'
import AppCard from '../appCard/index'
import DarkModal from '../darkThemeModal/index'


import {
  Row, Col, Button, Spin, message, Form,
  Switch, Input, Upload, Select, Typography, Tooltip
} from 'antd'
import type { UploadProps } from 'antd';
import { IconFont } from '../../../../utils/useIcon'

const { Option } = Select
const { Paragraph } = Typography


const RightContent = (props: any) => {
  const { listData, dashboardManage, dispatch,spaceId } = props
  // 发布弹窗、移动分组 modal状态
  const [showFabuModal, setShowFabuModal] = useState(false)
  const [showMoveGroupModal, setShowMoveGroupModal] = useState(false)
  const [newGroupId, setNewGroupId] = useState('')
  // 显示二级发布弹窗
  const [isShared, setIsShared] = useState(false)
  // 发布开关的值
  const [fabuChecked, setFabuChecked] = useState(false)

  // 是否显示二级发布弹窗的剩余表单项
  const [notShowRest, setNotShowRest] = useState(false)
  const [showRestIconAngle, setShowRestIconAngle] = useState(90)
  const [fabuSpinning, setFabuSpinning] = useState(false)

  // 表单项数据 (此处表单数据不适合用Form校验来获取各个form.item的值)
  // 分享连接
  const [fxljInputValue, setFxljInputValue] = useState<string>('')
  // 加密分享
  const [jmfxValue, setJmfxValue] = useState<string>('')
  // 是否加密分享
  const [isShowJmfxInput, setIsShowJmfxInput] = useState(false)
  const [jmfxSwitchValue, setJmfxSwitchValue] = useState(false)
  // 驾驶舱 相关
  const [toCockpitSwitchValue, setToCockpitSwitchValue] = useState(false)
  // 上传的图片路径
  const [imgUrl, setImgUrl] = useState('')
  // 标题、描述、图片输入框聚焦时获取当前值，发生改变后再发起发布请求
  const [curFocusInputValue, setCurFocusInputValue] = useState<string>('不为空')
  // 发布应用时的参数
  const [curAppId, setCurAppId] = useState('')
  const [fabuBody, setFabuBody] = useState<any>({
    share: false,
    needPassword: false,
    open: false,
    title: '',
    description: '',
    thumb: ''
  })
  const [titleInputValue, setTitleInputValue] = useState<string>('')
  const [descriptionInputValue, setDescriptionInputValue] = useState<string>('')

  useEffect(() => {
    if (showMoveGroupModal) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showMoveGroupModal])

  // ************** 可复用方法 ************
  /**  每个appCard 进行复制、删除等操作后都需要刷新内容列表 && 更新左侧分组树  */
  const refreshList = () => {
    const transformId = dashboardManage.curSelectedGroup[0] === '-1' ? null : dashboardManage.curSelectedGroup[0]
    const finalBody = {
      pageNo: 1,
      pageSize: 1000,
      spaceId,
      groupId: transformId
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
  /** 重置当前弹窗中所有的状态 */
  const resetAllState = () => {
    setFabuBody({
      share: false,
      needPassword: false,
      open: false,
      title: '',
      description: '',
      thumb: ''
    })
    setJmfxValue('')
    setFxljInputValue('')
    setIsShowJmfxInput(false)
    setJmfxSwitchValue(false)
    setToCockpitSwitchValue(false)
    setImgUrl('')
    setTitleInputValue('')
    setDescriptionInputValue('')
    setNotShowRest(false)
    setShowRestIconAngle(90)
    setCurFocusInputValue('')
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
      url: '/visual/application/updateAppGroup',
      method: 'post',
      body: {
        spaceId,
        appId: curAppId,
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


  // TODO 点击发布的时候，怎么判断是否已经发布(easyv上有两个接口)
  // TODO　如果已经发布了，调用应用详情接口获取相关的发布详情
  // 打开发布Modal, 顺便获取当前应用的id 和 发布状态 0-未发布 1-已发布
  const changeFabuModal = async (bool: boolean, id: string, isPublish: number) => {
    if (isPublish) {
      setFabuChecked(true)
      // 此处拿不到最新的id值，就直接传了
      const data = await http({
        url: `/visual/application/share/detail/${id}`,
        method: 'get'
      })
      const { shareUrl, ...filterShareUrl } = data
      setFabuBody(filterShareUrl)
      if (data) {
        let host = window.location.host
        const idInUrl = data.shareUrl.split('/').pop()
        setFxljInputValue(`${host}/publishScreen/${idInUrl}`)
        if (data.needPassword) {
          // setJmfxValue()
          setIsShowJmfxInput(true)
          setJmfxValue(data.sharePassword)
          setJmfxSwitchValue(true)
        }
        // ue改动，后端暂时将 open 对应 ”应用到驾驶舱“
        if (data.open) {
          setToCockpitSwitchValue(true)
        }
        if (data.title) {
          setTitleInputValue(data.title)
        }
        if (data.description) {
          setDescriptionInputValue(data.description)
        }
        if (data.thumb) {
          setImgUrl(data.thumb)
        }
      }
    }
    setShowFabuModal(bool)
    setCurAppId(id)
    setIsShared(!!isPublish)
  }
  // 关闭发布Modal
  const cancelFabuModal = () => {
    setShowFabuModal(false)
    // 关闭弹窗的时候，需要清除上一个应用发布时的缓存数据
    resetAllState()
  }

  // 发布大屏
  const fabudaping = async () => {
    //发布成功，将弹窗内容替换成发布详情信息
    const finalBody = {
      ...fabuBody,
      share: true,
      id: curAppId
    }
    setFabuBody(finalBody)
    const result = await publishByDiffParams(finalBody)
    if (result === null) {
      message.error({ content: '发布失败, 请检查网络后重试', duration: 2 })
      setFabuChecked(false)
      // setIsShared(false)
    } else {
      message.success({ content: '发布成功', duration: 2 })
      // 发布成功，1. 刷新列表获得应用最新的发布状态
      // 2. 设置分享连接地址
      refreshList()
      let host = window.location.host
      const idInUrl = result.shareUrl.split('/').pop()
      setFxljInputValue(`${host}/publishScreen/${idInUrl}`)
      // 打开发布开关
      setFabuChecked(true)
      setIsShared(true)
    }
  }
  /**
   * description: 通过不同的参数发布应用
   * params: 接口参数
   */
  const publishByDiffParams = async (body: object) => {
    setFabuSpinning(true)
    const data = await http({
      url: '/visual/application/share',
      method: 'post',
      body: body
    })
    // {
    //   errHandleFn: (err: any) => {
    //     message.error('发布失败');
    //   },
    // }
    setFabuSpinning(false)
    return data
  }
  // 发布开关 事件
  const releaseChange = async (isCheck: boolean) => {
    setFabuChecked(isCheck)
    if (!isCheck) {
      // 为false时取消发布， 取消发布成功后，切回上一级弹窗
      const finalBody = {
        ...fabuBody,
        share: false,
        id: curAppId
      }
      setFabuBody(finalBody)
      const result = publishByDiffParams(finalBody)
      if (!result) {
        message.error({ content: '取消发布失败', duration: 2 })
        setFabuChecked(true)
      } else {
        message.success({ content: '取消发布成功', duration: 2 })
        // 取消发布成功后，
        // 刷新列表, 清空分享连接等信息
        refreshList()
        setIsShared(isCheck)
        resetAllState()
      }
    }
  }
  // 加密分享 开关事件
  const jmfxChange = async (isCheck: boolean) => {
    const finalBody = {
      ...fabuBody,
      needPassword: isCheck,
      id: curAppId
    }
    setFabuBody(finalBody)
    const result: any = await publishByDiffParams(finalBody)
    if (!result) {
      message.error({ content: '发布失败', duration: 2 })
      setIsShowJmfxInput(!isCheck)
      setJmfxSwitchValue(!isCheck)
    } else {
      message.success({ content: '发布成功', duration: 2 })
      // 显示密码框
      setIsShowJmfxInput(isCheck)
      setJmfxValue(result.sharePassword)
      setJmfxSwitchValue(isCheck)
    }
  }

  // 应用到驾驶舱 开关事件
  const toCockpit = async (isCheck: boolean) => {
    let finalBody = {
      ...fabuBody,
      open: isCheck,
      id: curAppId
    }
    setFabuBody(finalBody)
    const result: any = await publishByDiffParams(finalBody)
    if (!result) {
      message.error({ content: '发布失败', duration: 2 })
      setToCockpitSwitchValue(!isCheck)
    } else {
      message.success({ content: '发布成功', duration: 2 })
      setToCockpitSwitchValue(isCheck)
    }
  }
  // 展示分享信息
  const showRestInfo = () => {
    setNotShowRest(!notShowRest)
    setShowRestIconAngle(notShowRest ? 90 : -90)
  }

  // 标题输入框失焦重新发布
  const rePublishByOnBlur = async (newValue: string, field: string) => {
    // 获取聚焦时 输入框内的值
    // - 如果为 '' , 不发请求； 如果相同，不发请求
    if (newValue === curFocusInputValue || (!curFocusInputValue && !newValue)) {
      return
    }
    const finalBody = {
      ...fabuBody,
      id: curAppId,
      [field]: newValue
    }
    setFabuBody(finalBody)
    const result = await publishByDiffParams(finalBody)
    if (result) {
      message.success({ content: '发布成功', duration: 2 })
      switch (field) {
        case 'title':
          setTitleInputValue(result.title)
          break;
        case 'description':
          setDescriptionInputValue(result.description)
          break;
        case 'thumb':
          setImgUrl(result.thumb)
          break;
        default:
          break;
      }
    } else {
      message.error({ content: '发布失败', duration: 2 })
    }
  }
  // 获取到当前聚焦输入框的内容以比对两次的值是否改变而决定是否发送请求
  const getCurFocusInputValue = (e: any) => {
    setCurFocusInputValue(e.target.value)
  }
  const titleInputOnBlur = (e: any) => {
    rePublishByOnBlur(e.target.value, 'title')
  }
  // 描述输入框失焦重新发布
  const desInputOnBlur = (e: any) => {
    rePublishByOnBlur(e.target.value, 'description')
  }

  // 图片地址输入框失焦 重新发布
  const imgUrlOnBlur = (e: any) => {
    rePublishByOnBlur(e.target.value, 'thumb')
  }

  // 上传图片
  const uploadImgProps:UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    accept: 'image/png, image/jpeg',
    action: `${BASEURL}/visual/file/upload`,
    headers:{
      authorization:localStorage.getItem('token') || ''
    },
    beforeUpload(file: any) {
      const { name }: { name: string } = file
      // 考虑 cdb.la...yer.json 这个文件名
      const lastPointIndex = name.lastIndexOf('.')
      const nameSuffix = name.slice(lastPointIndex)
      if (['png', 'jpg', 'gif', 'jpeg', 'webp', 'svg'].includes(nameSuffix)) {
        message.error({
          content: '请上传符合格式的图片',
          duration: 2
        })
        file.status = 'error'
        return false
      }
    },
    onChange(info: any) {
      const { status, response } = info.file;
      if (status === 'done') {
        message.success(`图片上传成功`);
        // 除了设置输入框的回显值，还要覆盖原本的fabuBody里的thumb字段值
        setImgUrl(response.data)
        rePublishByOnBlur(response.data, 'thumb')
        // setFabuBody({...fabuBody, thumb: response.data})
      } else if (status === 'error') {
        message.error(`图片上传失败`);
      }
    },
    async onRemove(file: any) {
      const finalBody = {
        ...fabuBody,
        id: curAppId,
        thumb: ''
      }
      setFabuBody(finalBody)
      const result = await publishByDiffParams(finalBody)
      if (result) {
        message.success({ content: '发布成功', duration: 2 })
        setImgUrl('')
      } else {
        message.error({ content: '发布失败', duration: 2 })
      }
    }
  };
  return <div className="RightContent-wrap">
    {/* <Row style={{ width: '100%' }} gutter={[26, 26]}> */}
    {
      listData.map((item: any, index: number) => (
        // <Col span={6} key={index}>
        <AppCard
          {...item}
          key={item.id}
          spaceId={spaceId}
          changeFabuModal={changeFabuModal}
          openMoveGroupModal={openMoveGroupModal}
          refreshList={refreshList}
        />
        // </Col>
      )
      )
    }
    {/* </Row> */}
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
      <Spin tip="发布中…"
        style={{ backgroundColor: '#2a2f3d', opacity: 0.8 }}
        spinning={fabuSpinning} size="large">
        <div className='fabu-modal'>
          {
            !isShared ?
              <>
                <div className="img-wrap">
                  <img src={require("../../../../assets/images/发布.png")} alt="图片正在赶来的路上…" />
                </div>
                <p className="text">发布后，获得大屏分享链接</p>
                <Button style={{ width: '106px' }} type="primary" onClickCapture={() => fabudaping()
                }>发布大屏</Button>
              </>
              :
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
                      <Switch checked={fabuChecked} onChange={releaseChange} />
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
                        disabled={true}
                        onChange={(e) => setFxljInputValue(e.target.value)}
                        style={{ width: '310px', height: '32px', lineHeight: '32px', paddingRight: '8px' }}
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
                      <Switch onChange={jmfxChange} checked={jmfxSwitchValue} />
                      {
                        isShowJmfxInput &&
                        <div className="set-flex">
                          <div style={{ width: '28px', margin: '0 20px 0 23px' }}>密码 </div>
                          <Input style={{ width: '159px' }}
                            value={jmfxValue}
                            disabled={true}
                            maxLength={20}
                          />
                        </div>
                      }
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="应用到驾驶舱"
                    colon={false}
                  ><div className="set-flex">
                      <Switch checked={toCockpitSwitchValue} onChange={toCockpit} />
                    </div>
                  </Form.Item>
                  <Form.Item
                    label="分享信息"
                    colon={false}
                  >
                    <div onClickCapture={showRestInfo} className="icon-wrap set-flex">
                      <IconFont type="icon-fanhui" rotate={showRestIconAngle} />
                    </div>
                  </Form.Item>
                  {
                    notShowRest &&
                    <div>
                      <Form.Item
                        label="标题"
                        colon={false}
                      ><Input placeholder="请输入标题(不超过30字)"
                        value={titleInputValue}
                        maxLength={30}
                        onChange={(e) => setTitleInputValue(e.target.value)}
                        onBlur={titleInputOnBlur}
                        onFocus={getCurFocusInputValue}
                        />
                      </Form.Item>
                      <Form.Item label="描述"
                        colon={false}
                      ><Input placeholder="请输入描述(不超过40字)"
                        value={descriptionInputValue}
                        maxLength={40}
                        onChange={(e) => setDescriptionInputValue(e.target.value)}
                        onBlur={desInputOnBlur}
                        onFocus={getCurFocusInputValue}
                        />
                      </Form.Item>
                      <Form.Item label="图片地址"
                        colon={false}
                      >
                        <Input placeholder="请输入图片地址"
                          value={imgUrl}
                          maxLength={1000}
                          onChange={(e) => setImgUrl(e.target.value)}
                          onBlur={imgUrlOnBlur}
                          onFocus={getCurFocusInputValue}
                          style={{ paddingRight: '8px' }}
                        />
                      </Form.Item>
                      <Form.Item label="上传图片"
                        colon={false}
                      >
                        <Upload {...uploadImgProps} className="set-flex"
                          style={{ background: 'red', maxWidth: '100%' }}
                        >
                          <Button type="primary">点击上传</Button>
                        </Upload>
                      </Form.Item>
                    </div>
                  }
                </Form>
              </div>
          }
        </div>
      </Spin>
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
