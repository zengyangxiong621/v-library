import { memo, useState, useRef } from 'react'
import './index.less'

import { withRouter } from 'dva/router'

const TemplateCard = (props: any) => {

  const { id, name, ratio, fenbianlv, imgUrl, history } = props
  // 没有图片链接，使用自定义的图片
  const finalPicUrl = imgUrl || 'https://image.baidu.com/search/detail?ct=503316480&z=&tn=baiduimagedetail&ipn=d&word=404%20not%20found&step_word=&ie=utf-8&in=&cl=2&lm=-1&st=-1&hd=&latest=&copyright=&cs=465746997,2330201292&os=3422040425,651022936&simid=465746997,2330201292&pn=51&rn=1&di=7060663421280190465&ln=1657&fr=&fmq=1649399350248_R&ic=&s=undefined&se=&sme=&tab=0&width=&height=&face=undefined&is=0,0&istype=2&ist=&jit=&bdtype=0&spn=0&pi=0&gsm=0&objurl=https%3A%2F%2Fgimg2.baidu.com%2Fimage_search%2Fsrc%3Dhttp%253A%252F%252Fwww.m78.co%252Fusr%252Fuploads%252F2020%252F03%252F2888276641.png%26refer%3Dhttp%253A%252F%252Fwww.m78.co%26app%3D2002%26size%3Df9999%2C10000%26q%3Da80%26n%3D0%26g%3D0n%26fmt%3Dauto%3Fsec%3D1651991355%26t%3D5c5eef37bce04da38561016e56bac7e8&rpstart=0&rpnum=0&adpicid=0&nojc=undefined&dyTabStr=MCwzLDQsNiw1LDIsMSw3LDgsOQ%3D%3D'

  const scanDashboard = () => {

  }
  const createProject = () => {
    history.push('/')
  }
  return (
    <div className='TemplateCard-wrap'>
      <header className='head'>
        <div className="hover-on-template">
          <div className='btns-wrap'>
            <span className='div-as-btns scan-btn' onClickCapture={() => scanDashboard()}>预览模板</span>
            <span className='div-as-btns create-btn' onClickCapture={() => createProject()}>创建项目</span>
          </div>
        </div>
        <div className="img-wrap">
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <img className='my-img' src={finalPicUrl} />
        </div>
      </header>
      <div className="foot">
        <div className="name">
          {name}
        </div>
        <div className="info">
          <span>比例：{ratio}</span> /&nbsp;
          <span>分辨率: {fenbianlv}</span>
        </div>
      </div>
    </div>
  )
}

export default memo(withRouter(TemplateCard))