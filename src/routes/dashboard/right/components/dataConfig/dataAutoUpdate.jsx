/* eslint-disable react/prop-types */
import { Button, Checkbox } from "antd";
import React, { useEffect, useState } from "react";
import CusInputNumber from "../cusInputNumber";
import { http } from "../../../../../services/request";
import "./index.less";

const DataAutoUpdate = (props) => {
  const _data = props.data;
  const [automatic, setAutomatic] = useState(false);
  const [autoTime, setAutoTime] = useState({
    value: 10,
    config: { min: 10, suffix: "" },
  });

  useEffect(() => {
    if (_data?.autoUpdate) {
      setAutomatic(_data.autoUpdate.isAuto);
      if (_data.autoUpdate.isAuto) {
        setAutoTime({
          config: { min: 10, suffix: "" },
          value: _data.autoUpdate.interval,
        });
      }
    }
  }, [_data.autoUpdate]);

  const timeBlur = () => {
    if (!autoTime.value) {
      props.onAutoUpdateChange({
        isAuto: automatic,
        interval: 10,
      });
      setAutoTime({
        config: { min: 10, suffix: "" },
        value: 10,
      });
    }
  };

  const automaticChange = () => {
    setAutomatic(!automatic);
    props.onAutoUpdateChange({
      isAuto: !automatic,
      interval: !automatic ? 10 : null,
    });
  };

  const timeChange = () => {
    if (autoTime.value) {
      props.onAutoUpdateChange({
        isAuto: automatic,
        interval: autoTime.value,
      });
    }
  };

  return (
    <div className="data-filter">
      <Checkbox checked={automatic} onChange={automaticChange}>
        自动更新
      </Checkbox>
      {automatic && (
        <div className="auto-time">
          每
          <CusInputNumber
            data={autoTime}
            onBlur={timeBlur}
            onChange={timeChange}
            formStyle={{
              marginRight: "7px",
              marginLeft: "8px",
              float: "left",
              marginBottom: "-16px",
            }}
            style={{ width: "80px" }}
          />
          秒请求一次
        </div>
      )}
    </div>
  );
};
export default DataAutoUpdate;
