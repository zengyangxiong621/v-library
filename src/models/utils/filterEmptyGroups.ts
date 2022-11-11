export const filterEmptyGroups = (tree: any) => {
  const recursiveFn = (tree: any, par: any) => {
    tree.forEach((x: any, i: any) => {
      if (x.modules && x.modules.length) {
        recursiveFn(x.modules, x);
      }
      if (x.id.startsWith("group") && x.modules.length === 0) {
        if (par.modules && par.modules.length) {
          par.modules.splice(i, 1);
        }
      }
    });
  };
  recursiveFn(tree, []);
  const finalTree = tree.filter((item: any) =>
    item.id.startsWith("group") ? Array.isArray(item.modules) && item.modules.length : true
  );
  return finalTree;
};
