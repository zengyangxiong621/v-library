export function selectSingleComponent(state, id) {
  state.forEach((item) => {
    if (item.id === id) {
      item.active = true;
    } else {
      item.active = false;
    }
    selectSingleComponent(item.components, id);
  });
}

export function groupComponents(state, ids) {
  let arr = [];
  state.forEach((item) => {});
}

export function findNode(state, id) {
  let temp = false;
  let node = state.find((item) => item.id === id);
  if (node) {
    return node;
  }
  for (let i = 0; i < state.length; i++) {
    if (state[i].components.length > 0) {
      temp = findNode(state[i].components, id);
      if (temp) {
        return temp;
      }
    }
  }
  return temp;
}

export function findParentNode(state, ids) {
  let arr = [];
  let id = ids.shift();
  let node = state.find((item) => item.id === id);
  arr.push(node);
  if (node?.isGroup && node.components.length > 0) {
    return arr.concat(findParentNode(node.components, ids));
  } else {
    return null;
  }
  return arr;
}

// ['1-1', '1-1-1']
export function calculateGroupPosition(state) {
  state.reduce(
    (cur, next) => {
      if (next.parentId === "parent") {
        return [[], []];
      }
      let [xPositionList, yPositionList] = cur;
      next.components.forEach((component) => {
        const { x, y } = component.defaultPosition;
        const { width, height } = component.style;
        xPositionList = xPositionList.concat([x, x + width]);
        yPositionList = yPositionList.concat([y, y + height]);
      });
      xPositionList.sort((a, b) => a - b);
      yPositionList.sort((a, b) => a - b);
      let minX = xPositionList[0];
      let minY = yPositionList[0];
      let maxX = xPositionList[xPositionList.length - 1];
      let maxY = yPositionList[yPositionList.length - 1];
      next.style.width = maxX - minX;
      next.style.height = maxY - minY;
      next.defaultPosition.x = minX;
      next.defaultPosition.y = minY;
      return [
        [minX, maxX],
        [minY, maxY],
      ];
    },
    [[], []]
  );
}

export function moveChildrenComponents(components, xMoveLength, yMoveLength) {
  components.forEach((component) => {
    component.defaultPosition.x = component.defaultPosition.x + xMoveLength;
    component.defaultPosition.y = component.defaultPosition.y + yMoveLength;
    if (component.components?.length > 0) {
      moveChildrenComponents(component.components, xMoveLength, yMoveLength);
    }
  });
}
