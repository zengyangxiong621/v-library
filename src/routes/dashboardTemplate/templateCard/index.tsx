import { memo, useState, useRef } from "react";
import "./index.less";

import { withRouter } from "dva/router";
import { http } from "@/services/request";
const TemplateCard = (props: any) => {
  const { id, name, ratio, fenbianlv, photoUrl,
    getCurImgIndex, addTemplate, curIndex, history,spaceId } = props;
  // 后端返回的photoUrl为空，则使用默认图片
  const finalPicUrl = photoUrl ?? require("../../../assets/images/模板默认背景图.png");
  const scanDashboard = () => {
    getCurImgIndex(curIndex);
  };
  const createProject = async() => {
    // addTemplate(id)
    const data = await http({
      url: "/visual/appTemplate/createApp",
      method: "post",
      body: {
        id,
        type: 0,
        spaceId
      }
    });
    if(data){
      history.push(`/dashboard/${data.id}`);
    }
  };
  return (
    <div className='TemplateCard-wrap'>
      <header className='head'>
        <div className="hover-on-template">
          <div className='btns-wrap'>
            <span className='div-as-btns scan-btn' onClickCapture={() => scanDashboard()}>预览模板</span>
            <span className='div-as-btns create-btn' onClickCapture={() => createProject()}>创建应用</span>
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
        {/* <div className="info">
          <span>比例：{ratio}</span> /&nbsp;
          <span>分辨率: {fenbianlv}</span>
        </div> */}
      </div>
    </div>
  );
};

export default memo(withRouter(TemplateCard));