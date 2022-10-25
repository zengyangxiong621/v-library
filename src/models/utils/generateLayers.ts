import { deepClone } from "@/utils/index";

export const generateLayers = (
  layers: any,
  insertId: any,
  newLayer: any = {
    id: "",
    name: "默认一",
    moduleName: "mo-ren-1",
  },
  isForced = false
) => {
  // 将新的图层插入到原来的图层树中
  const extendLayer = {
    isLock: false,
    isShow: true,
    isCollapse: false,
    hover: false,
    selected: false,
    singleShowLayer: false,
    ...newLayer,
  };
  return insertLayerById(layers, insertId, extendLayer, isForced);
};

const insertLayerById = (layers: any[], insertId: string, newLayer: any, isForced = false) => {
  if (insertId.length) {
    const recursiveFn = (data: any, id: string) => {
      for (let i = 0, len = data.length; i < len; i++) {
        const item = data[i];
        if (item.id === id) {
          if (isForced) {
            if (item?.modules) {
              item.modules.push(newLayer);
            }
          } else {
            data.splice(i, 0, newLayer);
          }
          break;
        } else if (item.modules && item.modules.length) {
          recursiveFn(item.modules, id);
        }
      }
    };
    recursiveFn(layers, insertId);
  } else {
    // 仅当左侧树中没有任何图层时执行
    layers.push(newLayer);
  }
  return deepClone(layers);
};
