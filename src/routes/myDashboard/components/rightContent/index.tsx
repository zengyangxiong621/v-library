import { memo, useState } from "react";
import "./index.less";

import {
  Row, Col, Button, Spin, message, Form,
  Switch, Input, Upload
} from 'antd'

import { IconFont } from '../../../../utils/useIcon'

import AppCard from '../appCard/index'
import DarkModal from '../darkThemeModal/index'
import Preview from '../../../dashboardTemplate/preview/index'

const RightContent = (props: any) => {
  const { listData } = props

  const [showFabuModal, setShowFabuModal] = useState(false)
  // 显示二级发布弹窗
  const [isShared, setIsShared] = useState(false)
  // 是否显示二级发布弹窗的剩余表单项
  const [isShowRest, setIsShowRest] = useState(false)
  const [fabuLoading, setFabuLoading] = useState(false)

  const [curAppId, setCurAppId] = useState('')

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
    console.log('大屏id', curAppId);
    // TODO 发布成功，将弹窗内容替换成发布详情信息
    setIsShared(true)
    // message.success({ content: '发布成功', duration: 2 })
  }
  // 发布开关 事件
  const releaseChange = (isCheck: boolean) => {
    console.log('is', isCheck);
  }
  // 加密分享 开关事件
  const jmfxChange = (isCheck: boolean) => {

  }

  // 开放应用 开关事件
  const kfChange = (isCheck: boolean) => {

  }

  return <div className="RightContent-wrap">
    <Row gutter={[26, 26]}>
      {
        listData.map((item: any, index: number) => (
          <Col span={6}>
            <AppCard changeFabuModal={changeFabuModal} {...item} />
          </Col>
        )
        )
      }
    </Row>
    {/* 发布弹窗 */}
    <DarkModal
      title='发布'
      destroyOnClose={true}
      getContainer={false}
      visible={showFabuModal}
      onCancel={cancelFabuModal}
      footer={null}
      style={{
        top: '30%'
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
              <Spin wrapperClassName='fabu-spin' spinning={fabuLoading}>
                <Button style={{ width: '106px' }} type="primary" onClickCapture={() => fabudaping()
                }>发布大屏</Button>
              </Spin>
            </>
            :
            <>
              <div>
                <Form
                  labelCol={{
                    span: 4,
                  }}
                  name='releaseForm'
                >
                  <Form.Item
                    colon={false}
                    label="发布"
                  ><Switch defaultChecked onChange={releaseChange} /></Form.Item>
                  <Form.Item
                    label="分享链接"
                    colon={false}

                  ><div>
                      <Input />
                      <Button type="primary" >复制</Button>
                    </div></Form.Item>
                  <Form.Item
                    label="加密分享"
                    colon={false}

                  ><div className="jiamifenxiang">
                      <Switch defaultChecked onChange={jmfxChange} />
                      <span>密码: <Input /></span>
                    </div></Form.Item>
                  <Form.Item
                    label="开放应用"
                    colon={false}

                  ><Switch defaultChecked onChange={kfChange} /></Form.Item>
                  <Form.Item
                    label="分享信息"
                    colon={false}

                  ><IconFont type="icon-fanhui" rotate={90} /></Form.Item>
                  {
                    !isShowRest &&
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
                        <Upload {...props}>
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
  </div >;
};

export default memo(RightContent);
