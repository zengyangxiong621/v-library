import React, { memo, useState, useEffect } from "react";
import { connect } from "dva";
import "./index.less";
import { find } from "../../../../../utils/common";
import BackgroundColor from "../color";
import PageSize from "../pageSize";
import UploadImg from "../uploadImg";
import CusInputNumber from "../cusInputNumber";
import RadioGroup from "../radioGroup";
import { deepClone } from "../../../../../utils";
import { Form } from "antd";
import EditTable from "../editTable";
import debounce from "lodash/debounce";
import { http } from "../../../../../services/request";

const PageSetting = ({ bar, dispatch, ...props }) => {
  const formItemLayout = {
    labelAlign: "left"
  };
  const [pageConfig, setPageConfig] = useState(null);
  const [recommendConfig, setRecommendConfig] = useState(null);
  const [styleColorConfig, setStyleColorConfig] = useState(null);
  const [backgroundImg, setBackgroundImg] = useState(null);
  const [gridSpacing, setGridSpacing] = useState(null);
  const [zoomConfig, setZoomConfig] = useState(null);
  const [thumbImg, setThumbImg] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (bar.dashboardConfig) {
      const pageConfigTmp = deepClone(bar.dashboardConfig);
      setPageConfig(pageConfigTmp);
      setRecommendConfig(find(pageConfigTmp, "recommend"));
      setStyleColorConfig(find(pageConfigTmp, "styleColor"));
      setBackgroundImg(find(pageConfigTmp, "backgroundImg"));
      setGridSpacing(find(pageConfigTmp, "gridSpacing"));
      setZoomConfig(find(pageConfigTmp, "zoom"));
      setThumbImg(find(pageConfigTmp, "thumbImg"));
    }
  }, [bar.dashboardConfig]);

  const settingsChange = debounce(() => {
    saveData();
  }, 300);

  const saveData = async () => {
    const params = {
      config: pageConfig,
      thumb: thumbImg.value,
      dashboardId: bar.dashboardId
    };
    const data = await http({
      url: "/visual/application/update",
      method: "post",
      body: params,
    });
    if (data) {
      const { config, id } = data;
      dispatch({
        type: "bar/updateDashboardOrStateConfig",
        payload: {
          id,
          config,
        }
      });
    }

  };

  return (
    <div className="PageSetting-wrap">
      <h3 className="pageset-header">
        页面设置
      </h3>
      <div className="content">
        <Form
          className="custom-form"
          form={form}
          {...formItemLayout}
          colon={false}
        >
          {
            pageConfig ?
              <React.Fragment>
                <PageSize key={JSON.stringify(recommendConfig)} data={recommendConfig} onChange={settingsChange} />
                <BackgroundColor key={JSON.stringify(styleColorConfig)} data={styleColorConfig} onChange={settingsChange} />
                <UploadImg key={JSON.stringify(backgroundImg)} data={backgroundImg} onChange={settingsChange} />
                <CusInputNumber key={JSON.stringify(gridSpacing)} data={gridSpacing} onChange={settingsChange} style={{ width: "100%" }} />
                <RadioGroup key={JSON.stringify(zoomConfig)} data={zoomConfig} onChange={settingsChange} />
                <UploadImg key={JSON.stringify(thumbImg)} data={thumbImg} onChange={settingsChange} />
              </React.Fragment>
              : "暂无数据"
          }

        </Form>
      </div>
    </div>
  );
};

export default connect(({ bar }) => ({
  bar
}))(PageSetting);

