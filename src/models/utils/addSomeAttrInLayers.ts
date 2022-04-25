/**
 * description: 向图层树中的每个图层添加相应的属性以完成特定的功能,
 *              singleShowLayer -> 用以判断是否单独显示图层
 * params:  @param Layers
 */

export const addSomeAttrInLayers = (layers: any) => {
  if(!layers.length) return layers
  const data = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (layer: any) => {
    for (let i = 0, len = layer.length; i < len; i++) {
      layer[i].singleShowLayer = false;
      if (Array.isArray(layer[i].modules) && layer[i].modules.length) {
        recursiveFn(layer[i].modules);
      }
    }
  };
  recursiveFn(data);
  return data;
};
