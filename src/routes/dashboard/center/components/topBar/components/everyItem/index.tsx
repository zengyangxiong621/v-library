import { memo, useCallback, useEffect } from "react";
import { connect } from "dva";
import axios from "axios";
import "./index.less";

const EveryItem = (props: any) => {
  const { data, dispatch, bar, type } = props;

  const importComponent = (data: any) => {
    return axios
      .get(
        `${(window as any).CONFIG.COMP_URL}/${data.moduleType}/${data.moduleName}/${
          data.moduleVersion
        }/${data.moduleName}.js`
      )
      .then((res) => res.data);
  };

  const componentCreate = async () => {
    if (type === "design") {
      let dataCopy = JSON.parse(JSON.stringify(data));
      dataCopy.moduleType = "assist";
      window.eval(`${await importComponent(dataCopy)}`);
      const { ComponentDefaultConfig } = (window as any).VComponents;
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
      const { moduleDefaultConfig } = bar;
      const currentDefaultConfig = moduleDefaultConfig.find((item: any) => {
        return item.moduleName === data.moduleName;
      });
      dispatch({
        type: "bar/createComponent",
        payload: currentDefaultConfig,
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
