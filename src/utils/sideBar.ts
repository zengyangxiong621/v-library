/**
 * description: 置顶
 */
type getMoveGroupType<T, U> = (a: T, b: U) => T;
type TPlaceGroup = getMoveGroupType<any[], string[]>;
type TMoveUpOrDown = getMoveGroupType<any[], string>;
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
  // console.log('最终结果', parentNode)
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
const moveUp: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        if (i !== 0) {
          data[i] = data.splice(i - 1, 1, data[i])[0];
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
 * description: 获取每一个被选中节点的锁定状态
 */
const getLockStates: TPlaceGroup = (treeData, selectedNodes) => {
  let res: string[] = []
  const recursiveFn = (data: any, ids: string[]) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (ids.includes(item.id)) {
        res.push(item.lock)
      } else if (item.children) {
        recursiveFn(item.children, ids);
      }
    }
  };
  recursiveFn(treeData, selectedNodes)
  return res;
};
/**
 * description: 锁定
 */
const lock: (a: any[], b: string[], c: boolean) => any[] = (treeData, selectedNodes, targetLockState) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const recursiveFn = (data: any, id: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === id) {
        item.lock = targetLockState
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
  getLockStates,
};
