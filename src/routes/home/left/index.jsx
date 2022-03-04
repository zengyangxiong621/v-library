/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo, useReducer, useRef, useCallback } from 'react'
import './index.css'
import { connect } from 'dva'
// import Bus from '../../utils/events.js'

import { Tree } from 'antd'
import {
  RightOutlined, SmileOutlined, DownOutlined,
  UpOutlined, QqOutlined, BugOutlined, PicCenterOutlined,
} from '@ant-design/icons'

import EveryTreeNode from './components/everyTreeNode'
import ToolBar from './components/toolBar'
import RightClickMenu from './components/rightClickMenu/rightClickMenu'


const Left = ({dispatch, bar, operate}) => {
  const [customExpandKeys, setCustomExpandKeys] = useState([])
  const [isMultipleTree, setIsMultipleTree] = useState(false)
  const [selected, setSelected] = useState([])
  const activeIconRef = useRef()
  const [isCtrlKeyPressing, setIsCtrlKeyPressing] = useState(false)
// 其它组件更改了选中的节点时触发
useEffect(() => {
      setSelected(bar.key)
}, [ bar.key ])
// 监听键盘Ctrl键按下与松开
useEffect(() => {
    onkeydown = (e) => {
      if (e.key === 'Control') {
        setIsMultipleTree(true)
        setIsCtrlKeyPressing(true)
      }
    }
    onkeyup = (e) => {
      if (e.key === 'Control') {
        setIsMultipleTree(false)
        setIsCtrlKeyPressing(false)
      }
    }
    return () => {
      onkeydown = () => {
      }
      onkeyup = () => {
      }
    }
}, [])
// 监听 树区域 以外的点击
useEffect(() => {
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      const {
        target: { className },
      } = e
      // 目前这里只有一棵antTree， 如果后续有其他antTree，需要替换方法
      const tree = document.querySelector('.ant-tree')
      // e.target.className 可能不存在或者是一个对象，比如svg的是[object SVGAnimatedString]
      console.log('e.target', e.target.className);
      if (className && typeof className === 'string') {
        const res = tree.querySelector(`.${ e.target.className }`)
        console.log('res', res);
        if (!res) {
          setSelected([])
          dispatch({
            type: 'bar/selectedNode',
            payload: {
              key: [],
              isFolder: false,
            },
          })
          // 取消选中节点的输入框
          dispatch({
            type: 'bar/reName',
            payload: {
              value: false,
            }
          })
          // 取消右键菜单
          setIsShowRightMenu(false)
          // 将多选树改为单选树
          setIsMultipleTree(false)
        }
      }
    })
    return () => {
      document.removeEventListener('click', (e) => ({}))
    }
}, []);
// 将树的数据放入redux中
// useEffect(() => {
//   dispatch({
//     type: 'bar/initTreeData',
//     payload: gData
//   })
// }, [gData])
  // 获取点击的icon
  const getActiveIcon = (icon) => {
    activeIconRef.current = icon
    console.log('iiiii;,', icon);
    dispatch({
      type: `bar/${icon}`,
      payload: {}
    })
  }
  //选择的树节点
  const onSelect = (curKey, e) => {
    // 和[selected,_]重了
    // const { selected } = e
    const isSelected = e.selected
    const { key } = e.node
    const isFolder = !!e.node.children
    // 多选情况下，点击那个剩哪个
    if (!isSelected) {
      let temp = []
      // 多选情况下，按住ctrl键时，应该是取消选中所点击的那项
      //           没有按住ctrl键时，应该只保留所点击的那项
      isCtrlKeyPressing ? (temp = curKey) : (temp = [key])
      setSelected(temp)
      dispatch({
        type: 'bar/selectedNode',
        payload: {
          key: temp,
          isFolder,
        },
      })
      return
    }
    dispatch({
      type: 'bar/selectedNode',
      payload: {
        key: curKey,
        isFolder,
      },
    })
    setSelected(curKey)
    // 当右键菜单显示时，如果用左键某个图层或者分组，需要隐藏右键菜单
    setIsShowRightMenu(false)
  }
  // 响应右键点击
  const onRightClick = ({ event, node }) => {
    const { children, key } = node
    const isFolder = !!children
    setIsMultipleTree(false)
    // 如果有选中了的节点 并且 此次右击的目标是其中一个，则展开菜单，
    // 否则，重置已选中节点 并 单选中当前节点以及展开右键菜单
    let t = []
    if (selected.length && selected.includes(key)) {
      setIsMultipleTree(true)
      t = selected
    } else {
      t = [key]
    }
    setSelected(t)
    // !用seletced在本次渲染中不能获取到
    dispatch({
      type: 'bar/selectedNode',
      payload: {
        key: t,
        isFolder,
      },
    })
    // 确认分组时点击的是哪个节点
    dispatch({
      type: `bar/saveLastRightClickKey`,
      payload: key
    })
  }
  // 展开 / 收起 全部节点
  const onExpand = (expandedKeys, { expanded, node }) => {
    // console.log('expandedKeys', expandedKeys)
    // console.log('expanded', expanded)
    // console.log('node', node)
  }
  //
  const onDrop = info => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data)
        }
        if (data[i].children) {
          loop(data[i].children, key, callback)
        }
      }
    }
    const data = bar.treeData

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
      })
    } else if (
      (info.node.props.children || []).length > 0 && // Has children
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || []
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj)
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      })
    } else {
      let ar
      let i
      loop(data, dropKey, (item, index, arr) => {
        ar = arr
        i = index
      })
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj)
      } else {
        ar.splice(i + 1, 0, dragObj)
      }
    }
    dispatch({
      type: 'bar/initTreeData',
      payload: data
    })
  }

  // 过去子组件传过来的X，Y值
  const [isShowRightMenu, setIsShowRightMenu] = useState(false)
  const [menuInfo, setMenuInfo] = useState({ x: 0, y: 0, id: null, isFolder: false })
  const getCurrentMenuLocation = useCallback((menuInfo) => {
    setMenuInfo(menuInfo)
    // 点击右键才渲染菜单
    setIsShowRightMenu(true)
    const { id, isFolder } = menuInfo
    // dispatch({
    //   type: ''
    // })
  })
  // 点击右键菜单后，隐藏菜单
  const hideMenu = () => {
    setIsShowRightMenu(false)
  }
  return (
    <div className="left-wrap">
      <header className="header">图层</header>
      <ToolBar data={ topBarIcons } getActiveIcon={ getActiveIcon }>
      </ToolBar>
      <Tree
        draggable
        blockNode
        fieldNames={
          {key : 'id',}
        }
        multiple={ isMultipleTree }
        className="draggable-tree"
        switcherIcon={ <DownOutlined/> }
        defaultExpandedKeys={ customExpandKeys }
        onDrop={ onDrop }
        onSelect={ onSelect }
        onRightClick={ onRightClick }
        treeData={ bar.treeData }
        selectedKeys={ selected }
        onExpand={ onExpand }
        // expandedKeys={customExpandKeys}
        titleRender={ (nodeData) => {
          const { title, ...omitTitle } = nodeData
          return (<EveryTreeNode
            { ...omitTitle }
            text={ title }
            getCurrentMenuLocation={ getCurrentMenuLocation }
          />)
        }
        }
      />
      <div className="footer">
        <ToolBar needBottomBorder={ false } data={ bottomBarIcons } getActiveIcon={ getActiveIcon }>
        </ToolBar>
      </div>
      { isShowRightMenu && <RightClickMenu menuInfo={ menuInfo } menuOptions={ menuOptions } hideMenu={hideMenu}/> }
    </div>
  )
}

const menuOptions = [
  {
    name: '锁定',
    key: 'lock',
    icon: 'BranchesOutlined',
    anotherName: '解锁',
    anotherIcon: 'WifiOutlined',
    disabled: false,
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
  },
  {
    key: 'hidden',
    name:'隐藏',
    icon: 'PicCenterOutlined',
    anotherName: '取消单独显示',
    anotherIcon: 'WifiOutlined',
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
const topBarIcons = [
  {
    key: 'placedTop',
    text:'置顶',
    icon: UpOutlined,
  },
  {
    key: 'placeBottom',
    text:'置底',
    icon: DownOutlined,
  },
  {
    key: 'group',
    text:'成组',
    icon: QqOutlined,
  },
  {
    key: 'spreadOrShrink',
    text:'展开/收起',
    icon: PicCenterOutlined,
  },
]

const bottomBarIcons = [
  {
    key: 'singleShowLayer',
    text:'单独显示图层',
    icon: QqOutlined,
  },
  {
    key: 'lock',
    text:'锁定',
    icon: BugOutlined,
  },
  {
    key: 'copy',
    text: '复制',
    icon: QqOutlined,
  },
  {
    text: '删除',
    key: 'delete',
    icon: BugOutlined,
  },
]

export default connect(
  ({bar, operate}) => ({bar, operate})
)(Left)
