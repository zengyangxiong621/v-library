import React from "react";
import { Menu } from "antd";

import { IconFont } from "../../../../../utils/useIcon";

const { SubMenu, Item } = Menu;

const generateSubMenu = (arr) => {
  return arr.map((item) => {
    return item.children ? (
      <SubMenu theme="dark" icon={<IconFont type={`icon-${item.icon}`} />} title={item.name}>
        {generateSubMenu(item.children)}
      </SubMenu>
    ) : (
      <Item icon={<IconFont type={`icon-${item.icon}`} />}>{item.name}</Item>
    );
  });
};

export const getTargetMenu = (menuData) => {
  return <Menu theme="dark">{generateSubMenu(menuData)}</Menu>;
};
