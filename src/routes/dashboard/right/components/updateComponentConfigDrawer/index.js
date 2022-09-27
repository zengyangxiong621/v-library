import React, { memo, useState, useEffect, useRef } from "react";
import { connect } from "dva";
import "./index.less";
import { Form, Drawer, Select, Button, Input, Modal, message, Spin } from "antd";
import {
  CloseOutlined, LeftOutlined, AudioOutlined, SearchOutlined,
} from "@ant-design/icons";
import ComponentCard from "../componentCard";
import componentLib from "../index";
import { deepClone } from "../../../../../utils";
import debounce from "lodash/debounce";


const UpdateComponentConfigDrawer = ({ bar, dispatch, componentConfig, ...props }) => {
  // 过滤出位置尺寸、默认隐藏
  componentConfig.config = (componentConfig?.config || []).filter(item => !["dimension", "hideDefault"].includes(item.name));
  console.log("componentConfig", componentConfig);
  componentConfig.interaction = componentConfig?.interaction || {
    mountAnimation: bar.treeData.find(item => item.id === componentConfig?.id)?.mountAnimation,
    events: componentConfig?.events,
  } || {};
  const styleConfig = componentConfig?.config || [];
  const drawerRef = useRef(null);
  const onClose = () => {
    props.onClose(false);
  };

  const styleChange = debounce(() => {
    console.log("componentConfig", componentConfig.config);
    props.onStyleChange(componentConfig.config);
    // dispatch({
    //   type: 'bar/setComponentConfigAndCalcDragScaleData',
    //   payload: componentConfig
    // })

  }, 300);
  return (
    <div className="update-component-wrap">
      <Drawer
        title={
          <div className="g-relative g-text-base g-px-2 g-flex g-justify-between g-items-center">
            <span/>
            组件样式配置
            <CloseOutlined onClick={ onClose } className="g-cursor-pointer"/>
          </div>
        }
        placement="right"
        closable={ false }
        onClose={ onClose }
        visible={ props.visible }
        ref={ drawerRef }
        className="update-component-wrapper"
        getContainer={ false }
        style={ { position: "absolute" } }
        width={ 333 }
        maskStyle={ { animation: "unset" } }
      >
        <div className="update-component-body-wrapper">
          <ComponentCard
            data={ componentConfig }
            allModulesConfig={ bar.moduleDefaultConfig }
            bar={ bar }
            dispatch={ dispatch }
          >
            { styleConfig.map((item, index) => {
              if (!(item.type && componentLib[item.type])) {
                return null;
              }
              const TagName = componentLib[item.type];
              return (
                <TagName data={ item } onChange={ styleChange } key={ index }/>
              );
            }) }
          </ComponentCard>
        </div>
      </Drawer>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar,
}))(UpdateComponentConfigDrawer);

