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

const x = 3
const y = 2
const z = 1
const tData = []

const generateData = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0'
  const tns = _tns || tData

  const children = []
  for (let i = 0; i < x; i++) {
    const id = `${ preKey }-${ i }`
    tns.push({ title: id, id, icon: <SmileOutlined/>, scan: true })
    if (i < y) {
      children.push(id)
    }
  }
  if (_level < 0) {
    return tns
  }
  const level = _level - 1
  children.forEach((key, index) => {
    tns[index].children = []
    return generateData(level, key, tns[index].children)
  })
}
generateData(z)

const Left = ({ dispatch, bar }) => {
  const [gData, setGData] = useState(tData)
  const [expandedKeys, setExpandedKeys] = useState(['0-0', '0-0-0', '0-0-0-0'])

  const [isMultipleTree, setIsMultipleTree] = useState(false)

  const [selected, setSelected] = useState([])

  const activeIconRef = useRef()

  const [isCtrlKeyPressing, setIsCtrlKeyPressing] = useState(false)

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
  useEffect(() => {
    document.addEventListener('click', (e) => {
      e.stopPropagation()
      const {
        target: { className },
      } = e
      // 目前这里只有一棵antTree， 如果后续有其他antTree，需要替换方法
      const tree = document.querySelector('.ant-tree')
      // e.target.className 可能不存在或者是一个对象，比如svg的是[object SVGAnimatedString]
      if (className && typeof className === 'string') {
        const res = tree.querySelector(`.${ e.target.className }`)
        if (!res) {
          setSelected([])
          dispatch({
            type: 'bar/selectedNode',
            payload: {
              key: [],
              isFolder: false,
            },
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
  }, [])
  // 确保每次setSelected后selected都更新为最新的值
  useEffect(() => {
    setSelected(selected)
  }, [selected])

  // 获取当前点击的icon
  const getActiveIcon = (icon) => {
    activeIconRef.current = icon
    dispatch({
      type: 'bar/selectOperate',
      payload: {
        icon,
        key: selected,
      },
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
  }
  // 节点展开
  const onExpand = (expandedKeys, { expanded, node }) => {
    console.log('expandedKeys', expandedKeys)
    console.log('expanded', expanded)
    console.log('node', node)
  }
  //
  const onDrop = info => {
    console.log('onDrop', info)
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
    const data = [...gData]

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

    setGData(data)
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
  return (
    <div className="left-wrap">
      <header className="header">图层</header>
      <ToolBar data={ topBarIcons } getActiveIcon={ getActiveIcon }>
      </ToolBar>
      <Tree
        draggable
        blockNode
        multiple={ isMultipleTree }
        className="draggable-tree"
        switcherIcon={ <DownOutlined/> }
        defaultExpandedKeys={ expandedKeys }
        onDrop={ onDrop }
        onSelect={ onSelect }
        onRightClick={ onRightClick }
        treeData={ gData }
        selectedKeys={ selected }
        onExpand={ onExpand }
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
      { isShowRightMenu && <RightClickMenu menuInfo={ menuInfo } menuOptions={ menuOptions }/> }
    </div>
  )
}
const menuOptions = [
  {
    name: '锁定',
    icon: 'BranchesOutlined',
    disabled: false,
  },
  {
    name: '成组6',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '取消成组1',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '复制',
    icon: 'CopyOutlined',
    disabled: false,
  },
  {
    name: '粘贴',
    icon: 'BranchesOutlined',
    disabled: false,
    onClick: function (e) {
      console.log('menu1 粘贴')
    },
  },
  {
    name: '拷贝',
    icon: 'AndroidOutlined',
    disabled: false,
    onClick: function (e) {
      console.log('menu1 拷贝')
    },
  }, {
    name: '成组5',
    icon: 'WifiOutlined',
    disabled: false,
  },
  {
    name: '取消成组1',
    icon: 'WifiOutlined',
    disabled: true,
  },
  {
    name: '复制',
    icon: 'CopyOutlined',
    disabled: true,
  },
  {
    name: '粘贴',
    icon: 'BranchesOutlined',
    disabled: true,
    onClick: function (e) {
      console.log('menu1 粘贴')
    },
  },
  {
    name: '拷贝',
    icon: 'AndroidOutlined',
    disabled: true,
    onClick: function (e) {
      console.log('menu1 拷贝')
    },
  }, {
    name: '成组4',
    icon: 'WifiOutlined',
    disabled: true,
  },
  {
    name: '取消成组1',
    icon: 'WifiOutlined',
    disabled: true,
  },
  {
    name: '复制',
    icon: 'CopyOutlined',
    disabled: true,
  },
  {
    name: '粘贴',
    icon: 'BranchesOutlined',
    disabled: true,
    onClick: function (e) {
      console.log('menu1 粘贴')
    },
  },
  {
    name: '拷贝',
    icon: 'AndroidOutlined',
    disabled: true,
    onClick: function (e) {
    },
  }, {
    name: '成组3',
    icon: 'WifiOutlined',
    disabled: true,
  },
  {
    name: '取消成组1',
    icon: 'WifiOutlined',
    disabled: true,
  },
]

const topBarIcons = [
  {
    title: '置顶',
    icon: UpOutlined,
  },
  {
    title: '置底',
    icon: DownOutlined,
  },
  {
    title: '成组',
    icon: QqOutlined,
  },
  {
    title: '打散',
    icon: BugOutlined,
  },
  {
    title: '展开/收缩',
    icon: PicCenterOutlined,
  },
]

const bottomBarIcons = [
  {
    title: '单独显示图层',
    icon: UpOutlined,
  },
  {
    title: '锁定',
    icon: DownOutlined,
  },
  {
    title: '复制',
    icon: QqOutlined,
  },
  {
    title: '删除',
    icon: BugOutlined,
  },
]

export default connect(
  ({ bar }) => ({ bar }),
)(Left)
