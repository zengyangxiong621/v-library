/* eslint-disable react/prop-types */
import React, { memo, useState, useEffect } from "react";
import "./index.less";

const OriginSelect = (props) => {
  const [value, setValue] = useState(props.psValue);
  const _type = props.type;

  useEffect(() => {
    setValue(props.psValue);
  }, [props.psValue]);

  const valueChange = (value) => {
    setValue(value);
    props.onChange(value);
  };

  const _enum = [
    "0% 0%",
    "50% 0%",
    "100% 0%",
    "0% 50%",
    "50% 50%",
    "100% 50%",
    "0% 100%",
    "50% 100%",
    "100% 100%",
  ];

  const _directionEnum = [
    "left top",
    "top",
    "right top",
    "left",
    "center",
    "right",
    "left bottom",
    "bottom",
    "right bottom",
  ];

  return (
    <div className="origin-select-container">
      <div className="origin-select-grid">
        {(_type === "direction" ? _directionEnum : _enum).map((item, index) => {
          return (
            <span
              key={index}
              onClick={() => {
                valueChange(item);
              }}
              title={item}
              className={[
                "origin-select-item",
                value === item ? "origin-select-active" : null,
              ].join(" ")}
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default memo(OriginSelect);
