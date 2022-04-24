/**
 * description:
 *  对于菜单配置项置灰的操作来讲，目前共有如下几种：
 *  1、多选时，重命名选项置灰
 *  2、没有选到分组时，取消成组选项置灰
 */
// 右键菜单配置项
export const menuOptions = [
  {
    name: '图层排序',
    key: '',
    icon: 'sucai',
    disabled: false,
    hasLevel: true,
  },
  {
    name: '锁定',
    key: 'lock',
    icon: 'suoding',
    anotherName: '解锁',
    anotherIcon: 'jiesuo',
    disabled: false,
  },
  {
    name: '置顶',
    key: 'placedTop',
    icon: 'zhiding',
    disabled: false,
  },
  {
    name: '置底',
    key: 'placedBottom',
    icon: 'zhidi',
    disabled: false,
  },
  {
    name: '上移',
    key: 'moveUp',
    icon: 'shangyi',
    disabled: false,
  },
  {
    name: '下移',
    key: 'moveDown',
    icon: 'xiayi',
    disabled: false,
  },
  {
    name: '成组',
    key: 'group',
    icon: 'zuhe',
    disabled: false,
  },
  {
    name: '取消成组',
    key: 'cancelGroup',
    icon: 'quxiaozuhe',
    disabled: false,
  },
  {
    name: '复制',
    key: 'copy',
    icon: 'fuzhi',
    disabled: false,
  },
  {
    key: 'singleShowLayer',
    name:'单独显示图层',
    icon: 'danduxianshi',
    anotherName: '取消单独显示',
    anotherIcon: 'danduxianshi',
    disabled: false,
  },
  {
    name:'删除',
    key: 'delete',
    icon: 'huishouzhan1',
    disabled: false,
  },
  {
    name:'重命名',
    key: 'reName',
    icon: 'bianji',
    disabled: false,
    mayDisabled: true,
  },
  {
    key: 'hidden',
    name:'隐藏',
    icon: 'guanbidanchuang',
    anotherName: '显示',
    anotherIcon: 'guanbidanchuang',
    disabled: false,
  }
]