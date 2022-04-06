/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo, useReducer, useRef, useCallback } from 'react'
import './index.less'
import { connect } from 'dva'
import { useClickAway } from 'ahooks'


/** 组件库相关 **/
import { Tree, Menu, Dropdown, Button } from 'antd'
import {
  RightOutlined, SmileOutlined, DownOutlined,
  UpOutlined, QqOutlined, BugOutlined, PicCenterOutlined,
} from '@ant-design/icons'
import { IconFont } from '../../../utils/useIcon'

/** 自定义组件 **/
import EveryTreeNode from './components/everyTreeNode'
import ToolBar from './components/toolBar'
import RightClickMenu from './components/rightClickMenu/rightClickMenu'

/** 数据 || 方法 */
import { menuOptions } from './Data/menuOptions'
import { getTargetMenu } from '../left/components/rightClickMenu/getMenuNode'

const Left = ({ dispatch, bar, operate }) => {
  //通过右键菜单的配置项生成antD dropDown组件所需要的menu配置
  const finalMenu = getTargetMenu(menuOptions)

  const [isExpand, setIsExpand] = useState([])
  const [customExpandKeys, setCustomExpandKeys] = useState([])
  const [isMultipleTree, setIsMultipleTree] = useState(bar.isMultipleTree)
  const [selected, setSelected] = useState([])
  const activeIconRef = useRef()
  const [isCtrlKeyPressing, setIsCtrlKeyPressing] = useState(false)
  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions)
  const treeRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const headerRef = useRef(null)
  // 监听 树区域 以外的点击
  useClickAway(() => {
    console.log('2222222222222222222222222222')
    console.log('bar', bar.isAreaChoose)
    if(bar.isAreaChoose) {
      return
    }
    setSelected([])
    dispatch({
      type: 'bar/clearAllStatus',
    })
    // 取消选中节点的输入框
    dispatch({
      type: 'bar/reName',
      payload: {
        value: false,
      },
    })
    // 取消右键菜单
    setIsShowRightMenu(false)
    // 将多选树改为单选树
    setIsMultipleTree(false)
  }, [treeRef, topBarRef, headerRef, bottomBarRef, document.getElementById('right-wrap'), document.getElementById('draggable-container')])

  // 1、其它组件更改了选中的节点时触发
  // 2、多选时不能重命名
  // 3、判断选择的节点是否是文件夹
  useEffect(() => {

    //1
    setSelected(bar.key)
    // TODO 这儿使用了一次循环,(只遍历了最外层，如果以后二级甚至三级菜单里也有需要置灰的就只能逐层遍历)，需要找时间用别的办法替换逐层遍历的思路来优化一下
    if (bar.key.length > 1) {
      const newArr = customMenuOptions.map((item) => {
        if (item.key === 'reName') {
          return {
            ...item,
            disabled: true,
          }
        }
        return item
      })
      setCustomMenuOptions(newArr)
    }

  }, [bar.key])
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

  /**
   * 方法
   * */
  // 收起 / 展开 菜单栏
  const [w, setW] = useState(250)
  const toggle = () => {
    const el = document.querySelector('.left-menu')
    w === 188 ? setW(250) : setW(188)
    el.style.width = `${w}px`
  }
  // 获取点击的icon
  const getActiveIcon = (icon) => {
    console.log('iconaaaa', icon)
    const finalPayload = {}
    switch (icon) {
      case 'singleShowLayer':
        finalPayload.singleShowLayer = 'negation'
        break
      case 'lock':
        finalPayload.value = 'negation'
        break
      default:
        break
    }
    activeIconRef.current = icon
    dispatch({
      type: `bar/${icon}`,
      payload: finalPayload,
    })
  }
  //选择的树节点
  const onSelect = (curKey, e, node) => {
    // 和[selected,_]重了
    // const { selected } = e

    const isSelected = e.selected
    const { key } = e.node
    const isFolder = !!e.node.children
    dispatch({
      type: 'bar/setKeys',
      payload: e.selectedNodes,
    })
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
    event.stopPropagation()
    const { components, key } = node
    const isFolder = !!components
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
      payload: key,
    })
  }
  // 展开 / 收起 全部节点
  const myOnExpand = (expandedKeys, { expanded, node }) => {
    setIsExpand(expandedKeys)
  }
  //
  const onDrop = info => {
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data)
        }
        if (data[i].components) {
          loop(data[i].components, key, callback)
        }
      }
    }
    const data = [...bar.treeData]

    // Find dragObject
    let dragObj
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1)
      dragObj = item
    })
    if (
      (info.node.props.components || []).length > 0 && // Has components
      info.node.props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.components = item.components || []
        // where to insert 示例添加到头部，可以是随意位置
        item.components.unshift(dragObj)
        // in previous version, we use item.components.push(dragObj) to insert the
        // item to the tail of the components
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
      payload: data,
    })
  }

  // 获取子组件传过来的X，Y值
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
    // <Menu
    //   mode="inline"
    //   theme="dark"
    //   className="left-menu"
    //   style={{
    //   }}
    //   inlineCollapsed={inlineCollapsed}>
    <div className='left-menu'>
      <div className="left-wrap">
        <div className="header" ref={headerRef}>
          <header className="header-text">图层</header>
          <IconFont
            type="icon-tucengshouqi" onClickCapture={() => toggle()}
            style={{ cursor: 'pointer' }} />
        </div>
        <div className='left-wrap-toolbar' ref={topBarRef}>
          <ToolBar data={topBarIcons} iconSize="12px" getActiveIcon={getActiveIcon}>
          </ToolBar>
        </div>
        {/*右键菜单Dropdown */}

        {/* <Dropdown overlay={finalMenu} trigger={['contextMenu']}> */}
        <div className='left-wrap-tree' ref={treeRef}>
          <Tree
            draggable
            blockNode
            fieldNames={
              { key: 'id', children: 'components' }
            }
            multiple={isMultipleTree}
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={customExpandKeys}
            onDrop={onDrop}
            onExpand={myOnExpand}
            onSelect={onSelect}
            onRightClick={onRightClick}
            treeData={bar.treeData}
            selectedKeys={bar.key}
            titleRender={(nodeData) => {
              return (<div>
                <EveryTreeNode
                  {...nodeData}
                  isExpand={isExpand}
                  getCurrentMenuLocation={getCurrentMenuLocation}
                />
              </div>)
            }
            }
          />
        </div>
        {/* </Dropdown> */}
        {isShowRightMenu &&
          <RightClickMenu menuInfo={menuInfo} menuOptions={customMenuOptions} hideMenu={hideMenu} />}
      </div>
      <div className="footer" ref={bottomBarRef}>
        <ToolBar needBottomBorder={false} iconSize="14px" data={bottomBarIcons} getActiveIcon={getActiveIcon}>
        </ToolBar>
      </div>
    </div>
    // </Menu>
  )
}
/**
 * description:  不可变的配置
 */
const topBarIcons = [
  {
    key: 'moveUp',
    text: '上移',
    icon: 'icon-shangyi',
  },
  {
    key: 'moveDown',
    text: '下移',
    icon: 'icon-xiayi',
  },
  {
    key: 'placedTop',
    text: '置顶',
    icon: 'icon-zhiding',
  },
  {
    key: 'placeBottom',
    text: '置底',
    icon: 'icon-zhidi',
  },
  {
    key: 'group',
    text: '成组',
    icon: 'icon-zuhe',
  },
  {
    key: 'cancelGroup',
    text: '取消成组',
    icon: 'icon-quxiaozuhe',
  },
  // {
  //   key: 'spreadOrShrink',
  //   text: '展开/收起',
  //   icon: PicCenterOutlined,
  // },
]
const bottomBarIcons = [
  {
    key: 'singleShowLayer',
    text: '单独显示图层',
    icon: 'icon-danduxianshi',
  },
  {
    key: 'copy',
    text: '复制',
    icon: 'icon-fuzhi',
  },
  {
    key: 'lock',
    text: '锁定',
    icon: 'icon-suoding',
  },
  {
    text: '删除',
    key: 'delete',
    icon: 'icon-shanchuzu',
  },
]

export default connect(
  ({ bar, operate }) => ({ bar, operate }),
)(Left)

