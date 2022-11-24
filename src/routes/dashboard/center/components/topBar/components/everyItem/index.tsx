import { memo, useCallback, useEffect } from "react";
import { connect } from "dva";
import axios from "axios";
import "./index.less";

const EveryItem = (props: any) => {
  const { data, dispatch, bar, type } = props;

  const componentCreate = async () => {
    const { moduleDefaultConfig } = bar;
    const ComponentDefaultConfig = moduleDefaultConfig.find((item: any) => {
      return item.moduleName === data.moduleName;
    });
    if (type === "design") {
      const dataCopy = JSON.parse(JSON.stringify(data));
      dataCopy.moduleType = "assist";
      // 对素材的图片和视频数据做特殊处理
      if (ComponentDefaultConfig.moduleName === "image2") {
        ComponentDefaultConfig.config[2].value = dataCopy.downloadUrl;
        ComponentDefaultConfig.staticData.data[0].imageUrl = dataCopy.downloadUrl;
      } else if (ComponentDefaultConfig.moduleName === "media") {
        ComponentDefaultConfig.staticData.data[0].url = dataCopy.downloadUrl;
        ComponentDefaultConfig.config[1].value = dataCopy.downloadUrl;
      }
      ComponentDefaultConfig.name = dataCopy.name;
      dispatch({
        type: "bar/createComponent",
        payload: ComponentDefaultConfig,
        itemData: data,
      });
    } else {
      dispatch({
        type: "bar/createComponent",
        payload: ComponentDefaultConfig,
        itemData: data,
      });
    }
  };

  const url = type === "design" && data.moduleName === "image2" ? data.downloadUrl : data.photoPath;
  return (
    <div className="EveryItem-wrap" onClickCapture={componentCreate}>
      <div className="db-img">
        <img src={url} alt="" />
      </div>
      <span className="db-text">{data.name}</span>
    </div>
  );
};

export default connect(({ bar }: any) => ({ bar }))(EveryItem);
