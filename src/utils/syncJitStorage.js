// 同步及时的内存管理

// 用来临时存储当前画布上组件主题修改后的配置
let componentThemeConfigs = {};
const setComponentThemeConfigs = (key, value) => {
  componentThemeConfigs[key] = value;
};
const deleteAllComponentThemeConfigs =()=>{
  componentThemeConfigs = {};
};
const getComponentThemeConfigs = ()=>{
  return componentThemeConfigs;
};

// 复制组件样式{moduleName:'xxxx',moduleVersion:"xxxx",config:[...]}
let componentCopyConfig= {} 
const setComponentCopyConfig = param =>{
  componentCopyConfig = param
}
const getComponentCopyConfig = ()=>{
  return componentCopyConfig
}

export {
  setComponentThemeConfigs,
  deleteAllComponentThemeConfigs,
  getComponentThemeConfigs,
  setComponentCopyConfig,
  getComponentCopyConfig
};
