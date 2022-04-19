/**
 * description: 置顶
 */
type getMoveGroupType<T, U> = (a: T, b: U) => T;
type TPlaceGroup = getMoveGroupType<any[], string[]>;

const placeTop: TPlaceGroup = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        // 已经是第一个了就没必要进行置顶操作了
        if(i !== 0) {
          const delItem = data.splice(i, 1)
          data.unshift(delItem[0])
        }
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 置底
 */
const placeBottom: TPlaceGroup = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        // 已经置底了
        if(i !== len - 1) {
          const delItem = data.splice(i, 1)
          data.push(delItem[0])
        }
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 上移
 */
type TMoveUpOrDown = getMoveGroupType<any[], string[]>;
const moveUp: TMoveUpOrDown = (treeData, selectedNodes) => {
  console.log('moveUp执行了几次呢')
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, ids: string[]) => {
    for(let i = 0, len = data.length; i < len; i++) {
      if(ids.includes(data[i].id)) {
        console.log('dataiii', data[i].id)
        // ids.length = 0
        if(i !== 0) {
          data[i] = data.splice(i - 1, 1, data[i])[0];
        }
      } else if(Array.isArray(data[i].modules) && data[i].modules.length) {
        recursiveFn(data[i].modules, selectedNodes)
      }
    }
  }
  recursiveFn(treeDataCopy, selectedNodes)
  return treeDataCopy
}

/**
 * description: 下移
 */
const moveDown: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, ids: string) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const item = data[i];
      if (item.id === ids) {
        if (i < len - 1) {
          data[i] = data.splice(i + 1, 1, data[i])[0];
          break;
        }
      } else if(item.modules) {
        recursiveFn(item.modules, ids)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 删除
 */
const remove: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        data.splice(i, 1)
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 获取每一个被选中节点的 锁定/单独显示图层 状态
 */

type threeParams = (a: any[], b: string[], c: boolean | string) => any[];
type threeParams2 = (a: any[], b: string[], c: string) => any[];
const getFieldStates: threeParams2 = (treeData, selectedNodes, field) => {
  let res: string[] = []
  const recursiveFn = (data: any, ids: string[], field: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(ids.includes(item.id)) {
        res.push(item[field])
      } else if(item.modules) {
        recursiveFn(item.modules, ids, field)
      }
    }
  }
  recursiveFn(treeData, selectedNodes, field)
  return res
}
/**
 * description: 锁定 / 解锁
 */
const lock: threeParams = (treeData, selectedNodes, targetLockState) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  console.log('targetLockState', targetLockState)
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
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 隐藏 / 显示
 */
const hidden: threeParams = (treeData, selectedNodes, targetShowState) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
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
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 单独显示图层
 */
const singleShowLayer: threeParams = (
  treeData,
  selectedNodes,
  SingleShowLayerState,
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        SingleShowLayerState === 'negation'
          ? (item.singleShowLayer = !item.singleShowLayer)
          : (item.singleShowLayer = SingleShowLayerState)
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description:  成组
 */
type groupParams2 = (a: any[], b: string[]) => any;
const group: groupParams2 = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData));
  const newGroup: any = {
    name: '分组',
    title: '分组',
    id: `group_${ new Date().getTime() }`,
    icon: 'SmileOutlined',
    isFolder: true,
    isShow: true,
    isLock: false,
    singleShowLayer: false,
    modules: [],
  }
  let needPickItem: any = []
  const recursiveFn = (data: any, id: string, isDone: boolean) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        data.splice(i, 1)
        needPickItem.push(item)
        // 处理到最后一个节点了
        if(isDone) {
          newGroup.modules.push(...needPickItem)
          data.push(newGroup)
        }
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id, isDone)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    let isDone = false
    if(i === len - 1) {
      isDone = true
    }
    recursiveFn(treeDataCopy, selectedNodes[i], isDone)
  }
  return { treeDataCopy, newLayerId: newGroup.id };
};

/**
 * description: 取消成组
 */
const cancelGroup: TMoveUpOrDown = (treeData, selectedNodes) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        if(item.modules) {
          data.splice(i, 1)
          // 取消成组需要倒序一下以保证成组前的顺序
          item.modules.reverse().forEach((x: any) => {
            data.splice(i++, 0, x)
          })
        }
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  for(let i = 0, len = selectedNodes.length; i < len; i++) {
    recursiveFn(treeDataCopy, selectedNodes[i])
  }
  return treeDataCopy
}

/**
 * description: 显示/关闭 重命名输入框
 */
const showInput: (a: any[], b: string[], c: boolean) => any[] = (
  treeData,
  node,
  onOrOff,
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      // 点击其它地方，会清空已选择的nodeList[]
      if(!id) {
        item.showRenameInput = false
      } else if(item.id === id) {
        item.showRenameInput = onOrOff
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  // if(node.length>1) return
  recursiveFn(treeDataCopy, node[0])
  return treeDataCopy
}
/**
 * description: 重命名
 */
const reName: (a: any[], b: string[], c: string) => any[] = (
  treeData,
  node,
  newName,
) => {
  const treeDataCopy = JSON.parse(JSON.stringify(treeData))
  const recursiveFn = (data: any, id: string) => {
    for(let i = 0, len = data.length; i < len; i++) {
      const item = data[i]
      if(item.id === id) {
        item.name = newName
        break
      } else if(item.modules) {
        recursiveFn(item.modules, id)
      }
    }
  }
  recursiveFn(treeDataCopy, node[0])
  return treeDataCopy
}
/**
 * description: mock TreeData
 */
const generateTreeData: () => any = () => {
  const tData: any = [];
  const generateData = (_level: any, isLock: any, _preKey: any, _tns: any) => {
    const preKey = _preKey || "1";
    const tns = _tns || tData;

    const modules: any = []
    for(let i = 1; i < 4; i++) {
      let key = `${ preKey }-${ i }`
      let prefix = ''
      const parentId = +preKey === 0 ? 'parent' : preKey
      let isFolder: boolean = false
      if(i < 2) {
        modules.push(key)
        isFolder = true
        prefix = `group_`
      } else {
        prefix = `components_`
      }
      tns.push({
        name: `${ prefix }${ key }`,
        id: `${ prefix }${ key }`,
        parentId,
        collapse: true, // 收缩
        selected: false,
        hover: false,
        isShow: true,
        isLock,
        singleShowLayer: false,
        showRenameInput: false,
        isFolder,
      })
    }
    if(_level < 0) {
      return tns
    }
    const level = _level - 1
    modules.forEach((key: any, index: string | number) => {
      tns[index].modules = [];
      return generateData(level, isLock, key, tns[index].modules);
    });
  };
  generateData(2, false, "1", tData);
  console.log("前端树的数据", tData);
  return tData;
};
//#region
/**
 * description: 复制
 */
// const copy: TMoveUpOrDown = (treeData, selectedNodes) => {
//   const treeDataCopy = JSON.parse(JSON.stringify(treeData));
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
//     recursiveFn(treeDataCopy, selectedNodes[i]);
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
}

// type fnA = (a: any[], b: string[]) => any[]
// type fnB = (a: any[], b: string) => any[]
// type fnC = (a: any[], b: string, c: boolean) => any[]

// function fnA (a: any[], b: string[]) {}
// function fnA (a: any[], b: string) {}
// function fnA (a: any[], b: string, c: boolean) {}
