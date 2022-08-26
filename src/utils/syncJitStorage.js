// 同步及时的内存管理

// 用来临时存储当前画布上组件主题修改后的配置
let componentThemeConfigs = {}

const setComponentThemeConfigs = (key, value) => {
  componentThemeConfigs[key] = value
}

const deleteAllComponentThemeConfigs =()=>{
  componentThemeConfigs = {}
}

const getComponentThemeConfigs = ()=>{
  return componentThemeConfigs
}

export {
  setComponentThemeConfigs,
  deleteAllComponentThemeConfigs,
  getComponentThemeConfigs
}
