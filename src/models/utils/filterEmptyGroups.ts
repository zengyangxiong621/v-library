export const filterEmptyGroups = (tree) => {
  const recursiveFn = (tree) => {
    for (let i = 0; i < tree.length; i++) {
      const item = tree[i];
      if (item.modules && Array.isArray(item.modules) && item.modules.length) {
        recursiveFn(item.modules);
      }
      if (item.id.startsWith("group") && item.modules.length === 0) {
        tree.splice(i, 1);
        i--;
      }
    }
  };
  recursiveFn(tree);
  return tree;
};
