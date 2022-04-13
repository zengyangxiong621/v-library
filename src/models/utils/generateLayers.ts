
export const generateLayers = (
  layers: any,
  insertId: any,
  newLayer: any = {
    id: '',
    name: "默认一",
    moduleName: "mo-ren-1",
  }
) => {
  // 将新的图层插入到原来的图层树中
  const extendLayer = {
    isLock: false,
    isShow:  false,
    isCollapse: false,
    hover: false,
    selected: false,
    singleShowLayer: false,
    ...newLayer
  }
  insertLayerById(layers, insertId, extendLayer)
};

const insertLayerById = ( target: any[], insertId: string, newLayer: any) => {
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data.unshift(newLayer)
        break
      } else if (item.components && item.components.length) {
        recursiveFn(item.components, id);
      }
    }
  };
  recursiveFn(target, insertId);
};
