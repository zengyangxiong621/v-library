/**
 * description: 置顶
 */
type getMoveGroupType<T, U> = (a: T, b: U) => T;
type TPlaceGroup = getMoveGroupType<any[], string[]>;

const placeTop: TPlaceGroup = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        // 已经是第一个了就没必要进行置顶操作了
        if (i !== 0) {
          const delItem = data.splice(i, 1);
          data.unshift(delItem[0]);
        }
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 置底
 */
const placeBottom: TPlaceGroup = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        // 已经置底了
        if (i !== len - 1) {
          const delItem = data.splice(i, 1);
          data.push(delItem[0]);
        }
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 上移
 */
type TMoveUpOrDown = getMoveGroupType<any[], string[]>;
const moveUp: TMoveUpOrDown = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, ids: string[]) => {
    for (let i = 0, len = data.length; i < len; i++) {
      if (ids.includes(data[i].id)) {
        // ids.length = 0
        if (i !== 0) {
          data[i] = data.splice(i - 1, 1, data[i])[0];
        }
      } else if (Array.isArray(data[i].modules) && data[i].modules.length) {
        recursiveFn(data[i].modules, selectedNodes);
      }
    }
  };
  recursiveFn(layersCopy, selectedNodes);
  return layersCopy;
};

/**
 * description: 下移
 */
const moveDown: TMoveUpOrDown = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, ids: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === ids) {
        if (i < len - 1) {
          data[i] = data.splice(i + 1, 1, data[i])[0];
          break;
        }
      } else if (item.modules) {
        recursiveFn(item.modules, ids);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 删除
 */
const remove: TMoveUpOrDown = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data.splice(i, 1);
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

type threeParams = (a: any[], b: string[], c: boolean | string) => any[];
type threeParams2 = (a: any[], b: string[], c: string) => any[];
/**
 * description: 获取每一个被选中节点的 锁定/单独显示图层 状态
 * params: {layers} 目标树  {selectedNodes} 当前选中的节点 {field} 要匹配的字段
 *
 * return: boolean[]
 */
const getFieldStates: threeParams2 = (layers, selectedNodes, field) => {
  const res: string[] = [];
  const recursiveFn = (data: any, ids: string[], field: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (ids.includes(item.id)) {
        res.push(item[field]);
      } else if (item.modules) {
        recursiveFn(item.modules, ids, field);
      }
    }
  };
  recursiveFn(layers, selectedNodes, field);
  return res;
};
/**
 * description: 锁定 / 解锁
 */
const lock: threeParams = (layers, selectedNodes, targetLockState) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        targetLockState === "negation"
          ? (item.isLock = !item.isLock)
          : (item.isLock = targetLockState);
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 隐藏 / 显示
 */
const hidden: threeParams = (layers, selectedNodes, targetShowState) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.isShow = targetShowState;
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 单独显示图层
 */
const singleShowLayer: threeParams = (layers, selectedNodes, SingleShowLayerState) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        SingleShowLayerState === "negation"
          ? (item.singleShowLayer = !item.singleShowLayer)
          : (item.singleShowLayer = SingleShowLayerState);
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description:  成组
 */
type groupParams2 = (a: any[], b: string[]) => any;
const group: groupParams2 = (layers, selectedNodes) => {
  const insertId = selectedNodes[0];
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const newGroup: any = {
    name: "分组",
    title: "分组",
    id: `group_${new Date().getTime()}`,
    isShow: true,
    isLock: false,
    singleShowLayer: false,
    modules: [],
  };
  const needPickItem: any = [];
  const recursiveFn = (data: any, id: string, isDone: boolean) => {
    // 成组前先找到将来新组要插入的位置
    const insertIndex = data.findIndex((item: any) => {
      return item.id === insertId;
    });
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data.splice(i, 1);
        needPickItem.push(item);
        // 处理到最后一个节点了
        if (isDone) {
          newGroup.modules.push(...needPickItem);
          data.splice(insertIndex, 0, newGroup);
          // data.push(newGroup)
        }
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id, isDone);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    let isDone = false;
    if (i === len - 1) {
      isDone = true;
    }
    recursiveFn(layersCopy, selectedNodes[i], isDone);
  }
  return { layersCopy, newLayerId: newGroup.id };
};

/**
 * description: 取消成组
 */
const cancelGroup: TMoveUpOrDown = (layers, selectedNodes) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        if (item.modules) {
          data.splice(i, 1);
          // 取消成组需要倒序一下以保证成组前的顺序
          item.modules.reverse().forEach((x: any) => {
            data.splice(i++, 0, x);
          });
        }
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(layersCopy, selectedNodes[i]);
  }
  return layersCopy;
};

/**
 * description: 显示/关闭 重命名输入框
 */
const showInput: (a: any[], b: string[], c: boolean) => any[] = (layers, node, onOrOff) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      // 点击其它地方，会清空已选择的nodeList[]
      if (!id) {
        item.showRenameInput = false;
      } else if (item.id === id) {
        item.showRenameInput = onOrOff;
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  // if(node.length>1) return
  recursiveFn(layersCopy, node[0]);
  return layersCopy;
};
/**
 * description: 重命名
 */
const reName: (a: any[], b: string[], c: string) => any[] = (layers, node, newName) => {
  const layersCopy = JSON.parse(JSON.stringify(layers));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.name = newName;
        break;
      } else if (item.modules) {
        recursiveFn(item.modules, id);
      }
    }
  };
  recursiveFn(layersCopy, node[0]);
  return layersCopy;
};
/**
 * description: mock TreeData
 */
const generateTreeData: () => any = () => {
  const tData: any = [];
  const generateData = (_level: any, isLock: any, _preKey: any, _tns: any) => {
    const preKey = _preKey || "1";
    const tns = _tns || tData;

    const modules: any = [];
    for (let i = 1; i < 4; i++) {
      const key = `${preKey}-${i}`;
      let prefix = "";
      const parentId = +preKey === 0 ? "parent" : preKey;
      if (i < 2) {
        modules.push(key);
        prefix = "group_";
      } else {
        prefix = "components_";
      }
      tns.push({
        name: `${prefix}${key}`,
        id: `${prefix}${key}`,
        parentId,
        collapse: true, // 收缩
        selected: false,
        hover: false,
        isShow: true,
        isLock,
        singleShowLayer: false,
        showRenameInput: false,
      });
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    modules.forEach((key: any, index: string | number) => {
      tns[index].modules = [];
      return generateData(level, isLock, key, tns[index].modules);
    });
  };
  generateData(2, false, "1", tData);
  return tData;
};
//#region
/**
 * description: 复制
 */
// const copy: TMoveUpOrDown = (layers, selectedNodes) => {
//   const layersCopy = JSON.parse(JSON.stringify(layers));
//   const recursiveFn = (data: any, id: string) => {
//     for (let i = 0, len = data.length; i < len; i++) {
//       const item = data[i];
//       if (item.id === id) {
//         data.splice(i, 0, 1);
//         break;
//       } else if (item.modules) {
//         recursiveFn(item.modules, id);
//       }
//     }
//   };
//   for (let i = 0, len = selectedNodes.length; i < len; i++) {
//     recursiveFn(layersCopy, selectedNodes[i]);
//   }
//   return treeDataCopy;
// };
//#endregion
export {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  // copy,
  lock,
  hidden,
  getFieldStates,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
};

// type fnA = (a: any[], b: string[]) => any[]
// type fnB = (a: any[], b: string) => any[]
// type fnC = (a: any[], b: string, c: boolean) => any[]

// function fnA (a: any[], b: string[]) {}
// function fnA (a: any[], b: string) {}
// function fnA (a: any[], b: string, c: boolean) {}
