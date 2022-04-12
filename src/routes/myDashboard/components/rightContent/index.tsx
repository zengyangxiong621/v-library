import { memo, useState } from "react";
import "./index.less";

import { Row, Col, Button, Spin, message, Form } from 'antd'

import AppCard from '../appCard/index'
import DarkModal from '../darkThemeModal/index'
import Preview from '../../../dashboardTemplate/preview/index'

const RightContent = (props: any) => {
  const { listData } = props

  const [showFabuModal, setShowFabuModal] = useState(false)
  // 显示二级发布弹窗
  const [isShared, setIsShared] = useState(false)
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

  return <div className="RightContent-wrap">
    <Row gutter={[26, 26]}>
      {
        listData.map((item: any, index: number) => (
          <Col span={6}>
            <AppCard changeFabuModal={changeFabuModal} {...item}/>
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
                <Form></Form>
              </div>
            </>
        }
      </div>
    </DarkModal >
  </div >;
};

export default memo(RightContent);
