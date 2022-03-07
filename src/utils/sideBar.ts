import { title } from "process";

/**
 * description: 置顶
 */
type getMoveGroupType<T, U> = (a: T, b: U) => T;
type TPlaceGroup = getMoveGroupType<any[], string[]>;
const placeTop: TPlaceGroup = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
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
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 置底
 */
const placeBottom: TPlaceGroup = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
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
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 上移
 */
type TMoveUpOrDown = getMoveGroupType<any[], string[]>;
const moveUp: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data[i] = data.splice(i - 1, 1, data[i])[0];
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 下移
 */
const moveDown: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    // 用for循环方便终止循环
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        if (i < len - 1) {
          data[i] = data.splice(i + 1, 1, data[i])[0];
        }
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 删除
 */
const remove: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data.splice(i, 1);
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 获取每一个被选中节点的 锁定/单独显示图层 状态
 */

type threeParams = (a: any[], b: string[], c: boolean) => any[];
type threeParams2 = (a: any[], b: string[], c: string) => any[];
const getFieldStates: threeParams2 = (treeData, selectedNodes, field) => {
  let res: string[] = [];
  const recursiveFn = (data: any, ids: string[], field: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (ids.includes(item.id)) {
        res.push(item[field]);
      } else if (item.children) {
        recursiveFn(item.children, ids, field);
      }
    }
  };
  recursiveFn(treeData, selectedNodes, field);
  return res;
};
/**
 * description: 锁定 / 解锁
 */
const lock: threeParams = (treeData, selectedNodes, targetLockState) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.lock = targetLockState;
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 隐藏 / 显示
 */
const hidden: threeParams = (treeData, selectedNodes, targetShowState) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.scan = targetShowState;
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description: 单独显示图层
 */
const singleShowLayer: threeParams = (
  treeData,
  selectedNodes,
  SingleShowLayerState
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.singleShowLayer = SingleShowLayerState;
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};

/**
 * description:  成组
 */
const group: threeParams2 = (treeData, selectedNodes, lastRightClickKey) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const newGroup = {
    title: "分组",
    id: `${lastRightClickKey}-temp`,
    icon: "SmileOutlined",
    isFolder: true,
    scan: true,
    lock: false,
    singleShowLayer: false,
    children: [],
  };
  let needPickItem: any = [];
  const recursiveFn = (data: any, id: string, isDone: boolean) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        data.splice(i, 1);
        needPickItem.push(item);
        // 处理到最后一个节点了
        if (isDone) {
          newGroup.children = needPickItem;
          data.push(newGroup);
        }
        break;
      } else if (item.children) {
        recursiveFn(item.children, id, isDone);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    let isDone = false;
    if (i === len - 1) {
      isDone = true;
    }
    recursiveFn(treeDataCopy, selectedNodes[i], isDone);
  }
  return treeDataCopy;
};

/**
 * description: 取消成组
 */
const cancelGroup: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        if (item.children) {
          data.splice(i, 1);
          item.children.forEach((x: any) => {
            data.splice(i++, 0, x);
          });
        }
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  for (let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i]);
  }
  return treeDataCopy;
};
/**
 * description: 显示/关闭 重命名输入框
 */
const showInput: (a: any[], b: string[], c: boolean) => any[] = (
  treeData,
  node,
  onOrOff
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      // 点击其它地方，会清空已选择的nodeList[]
      if (!id) {
        item.showRenameInput = false;
      } else if (item.id === id) {
        item.showRenameInput = onOrOff;
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  // if(node.length>1) return
  recursiveFn(treeDataCopy, node[0]);
  return treeDataCopy;
};
/**
 * description: 重命名
 */
const reName: (a: any[], b: string[], c: string) => any[] = (
  treeData,
  node,
  newName
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.title = newName;
        break;
      } else if (item.children) {
        recursiveFn(item.children, id);
      }
    }
  };
  recursiveFn(treeDataCopy, node[0]);
  return treeDataCopy;
};
/**
 * description: mock TreeData
 */
const generateTreeData: () => any = () => {
  const tData: any = [];

  const generateData = (_level: any, lock: any, _preKey: any, _tns: any) => {
    const preKey = _preKey || "1";
    const tns = _tns || tData;

    const children: any = [];
    for (let i = 1; i < 4; i++) {
      const key = `${preKey}-${i}`;
      const parentId = +preKey === 0 ? "parent" : preKey;
      tns.push({
        title: key,
        id: key,
        parentId,
        icon: "SmileOutlined",
        scan: true,
        lock,
        singleShowLayer: false,
        showRenameInput: false,
      });
      if (i < 2) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const level = _level - 1;
    children.forEach((key: any, index: string | number) => {
      tns[index].children = [];
      return generateData(level, lock, key, tns[index].children);
    });
  };
  generateData(2, false, "1", tData);
  return tData;
};

export {
  generateTreeData,
  placeTop,
  placeBottom,
  moveUp,
  moveDown,
  remove,
  lock,
  hidden,
  getFieldStates,
  singleShowLayer,
  group,
  cancelGroup,
  reName,
  showInput,
};
