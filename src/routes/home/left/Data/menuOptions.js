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
    icon: 'BranchesOutlined',
    disabled: false,
    hasLevel: true,
    children: [
      {
        name: '1',
        key: 'placedTop',
        icon: 'WifiOutlined',
        disabled: false,
        children: [
          {
            name: '1-1',
            key: 'placedTop',
            icon: 'QqOutlined',
            disabled: false,
            children: []
          }
        ]
      },
      {
        name: '置底1',
        key: 'placeBottom',
        icon: 'WifiOutlined',
        disabled: false,
      },
    ]
  },
  {
    name: '锁定',
    key: 'lock',
    icon: 'BranchesOutlined',
    anotherName: '解锁',
    anotherIcon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '移动',
    key: '',
    icon: 'BranchesOutlined',
    disabled: false,
    hasLevel: true,
    children: [
      {
        name: '上移',
        key: 'moveUp',
        icon: 'WifiOutlined',
        disabled: false,
      },
      {
        name: '下移',
        key: 'moveDown',
        icon: 'WifiOutlined',
        disabled: false,
      },
    ]
  },
  {
    name: '置顶',
    key: 'placedTop',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '置底',
    key: 'placeBottom',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '上移',
    key: 'moveUp',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '下移',
    key: 'moveDown',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '成组',
    key: 'group',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '取消成组',
    key: 'cancelGroup',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '复制',
    key: 'copy',
    icon: 'CopyOutlined',
    disabled: false,
  },
  {
    key: 'singleShowLayer',
    name:'单独显示图层',
    icon: 'QqOutlined',
    anotherName: '取消单独显示',
    anotherIcon: 'WifiOutlined',
    disabled: false,
  },
  {
    name:'删除',
    key: 'delete',
    icon: 'PicCenterOutlined',
    disabled: false,
  },
  {
    name:'重命名',
    key: 'reName',
    icon: 'PicCenterOutlined',
    disabled: false,
    mayDisabled: true,
  },
  {
    key: 'hidden',
    name:'隐藏',
    icon: 'PicCenterOutlined',
    anotherName: '显示',
    anotherIcon: 'NotificationOutlined',
    disabled: false,
  },
  // {
  //   name:'展开/收起',
  //   key: 'spreadOrShrink',
  //   icon: 'PicCenterOutlined',
  // },

  // {
  //   name: '粘贴',
  //   key: 'paste',
  //   icon: 'BranchesOutlined',
  //   disabled: false,
  // },
]