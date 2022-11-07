import { memo } from "react";
import "./listItem.less";

import { Checkbox } from "antd";

const listItem = ({ itemData, clickCheckbox }: any) => {

  const { createdTime, effectiveTime, detail: { name, moduleName } } = itemData;
  // 点击每一项时， 需要将 复选框当前的状态传出去
  const listItemOnChange = () => {
    itemData.checked = !itemData.checked;
    clickCheckbox(itemData);
  };

  // 当前时间
  const mSecondsOfCurTime: any = new Date().getTime()
  // 后端返回的过期时间
  const mSecondsOfEffectiveTime: any = new Date(effectiveTime)
  const restTime: any = ~~((mSecondsOfEffectiveTime - mSecondsOfCurTime) / 3600000)+1

  return (
    <div className='recycle-list-item-wrap'>
      <div>
        <Checkbox checked={itemData.checked} onChange={() => listItemOnChange()}>
        </Checkbox>
      </div>
      <div className="recycle-list-item">
        <div className="first-item">{name}</div>
        <div className="g-flex g-justify-start" style={{ minWidth: '80px', margin: '0 10px 0 10px' }}>{moduleName || '面板'}</div>
        <div>{createdTime}</div>
        <div style={{ maxWidth: '100px' }}>
          剩余<span style={{ display: 'inline-flex', justifyContent: 'center', color: '#336bd7', margin: '0 4px', minWidth: '16px' }}>{restTime}</span>小时
        </div>
      </div>
    </div>
  );
};

export default memo(listItem);