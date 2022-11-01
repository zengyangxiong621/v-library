import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import ComponentDefaultConfig from "./config";
import { CaretRightOutlined } from "@ant-design/icons";
import "./index.less";

const Media = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig;
  const { config, staticData } = componentConfig;
  const componentData = props.comData || staticData.data;  // 过滤后的数据
  const _fields = props.fields;
  const [MediaAutoPlaying, setMediaAutoPlaying] = useState(false);
  const getStyle = (config) => {
    const style = {};
    if (Array.isArray(config)) {
      config.forEach(item => {
        if (Array.isArray(item.value)) {
          style[item.name] = getStyle(item.value);
        } else if (item.options && Array.isArray(item.options)) {
          item.options.forEach(item => {
            style[item.key] = getStyle(item.value);
          });
        } else {
          style[item.name] = item.value;
        }
      });
    }
    return style;
  };
  const style = getStyle(config);
  const { dimension: { width, height }, Loop, Muted, controls, hideDefault, autoPlaying, mediaFile } = style;
  const getMediaUrl = () => {
    if (mediaFile) {
      return mediaFile;
    }
    return componentData[0][_fields[0]];
  };

  useEffect(() => {
    autoPlaying && setMediaAutoPlaying(true);
  }, [autoPlaying]);

  const PlayBtn = () => {
    const handleToPlay = () => {
      setMediaAutoPlaying(true);
    };
    return (
      <div className='playBtn' onClick={handleToPlay}>
        <CaretRightOutlined />
      </div>
    );
  };
  return hideDefault ? (<></>) : (
    <div className='videoContainer'>
      <ReactPlayer
        playing={MediaAutoPlaying}
        width={`${width}px`}
        height={`${height}px`}
        loop={Loop}
        muted={Muted}
        controls={controls}
        url={getMediaUrl()}
      />
      {
        !(autoPlaying || controls) && !MediaAutoPlaying ? (<PlayBtn></PlayBtn>) : null
      }
    </div>
  );
};
export {
  ComponentDefaultConfig,
  Media
};
export default Media;
