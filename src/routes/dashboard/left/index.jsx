/* eslint-disable no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect, useMemo, useReducer, useRef, useCallback } from 'react'
import './index.less'
import { connect } from 'dva'

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
import { getTargetMenu } from './components/rightClickMenu/getMenuNode'
import { getFieldStates } from '../../../utils/sideBar'

const Left = ({ dispatch, bar, operate }) => {
  //通过右键菜单的配置项生成antD dropDown组件所需要的menu配置
  const finalMenu = getTargetMenu(menuOptions)

  const [isExpand, setIsExpand] = useState([])
  const [customExpandKeys, setCustomExpandKeys] = useState([])
  const [selected, setSelected] = useState([])
  const activeIconRef = useRef()
  const [isCtrlKeyPressing, setIsCtrlKeyPressing] = useState(false)
  const [customMenuOptions, setCustomMenuOptions] = useState(menuOptions)
  const treeRef = useRef(null)
  const topBarRef = useRef(null)
  const bottomBarRef = useRef(null)
  const headerRef = useRef(null)
  // TODO  待删除
  const [single, setSingle] = useState(true)


  const clearStatus = (event) => {
    const dom = event.target || null
    if (!dom || !dom.className || ['ant-layout', 'draggable-wrapper', 'left-wrap'].includes(dom.className)) {
      setSelected([])
      // 将多选树改为单选树
      dispatch({
        type: 'bar/save',
        payload: { isMultipleTree: false },
      })
    }
  }
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
            // disabled: true,
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
        dispatch({
          type: 'bar/save',
          payload: { isMultipleTree: true },
        })
        setIsCtrlKeyPressing(true)
      }
    }
    onkeyup = (e) => {
      if (e.key === 'Control') {
        dispatch({
          type: 'bar/save',
          payload: { isMultipleTree: true },
        })
        setIsCtrlKeyPressing(false)
      }
    }
    document.addEventListener('click', clearStatus)
    return () => {
      onkeydown = () => {
      }
      onkeyup = () => {
      }
      document.removeEventListener('click', clearStatus)
    }
  }, [])

  /**
   * 方法
   * */
  // 收起 / 展开 菜单栏
  const [w, setW] = useState(188)
  const toggle = () => {
    const el = document.querySelector('.left-menu')
    w === 188 ? setW(250) : setW(188)
    el.style.width = `${w}px`
    dispatch({
      type: 'bar/save',
      payload: {
        leftMenuWidth: w,
      },
    })
  }
  // 获取点击的icon
  const getActiveIcon = (icon) => {
    console.log('icon', icon)
    let finalPayload = {
      dashboardId: bar.dashboardId,
    }
    switch (icon) {
      case 'lock':
        const everyNodeLockState = getFieldStates(bar.treeData, bar.key, 'isLock')
        const finalBody = bar.key.map((item, index) => ({
          id: item,
          key: 'isLock',
          value: !everyNodeLockState[index],
        }))
        finalPayload.configs = finalBody
        break
      case 'copy':
        finalPayload = {
          dashboardId: bar.dashboardId,
          children: [],
          targetDashboardId: bar.dashboardId,
          insertId: bar.key[0],
          originLayers: bar.treeData,
          //TODO 改为modules后删除掉这行
          components: [...bar.key],
          // components: [...bar.key],
          panels: [],
          selected: [...bar.key],
        }
      case 'singleShowLayer':
        finalPayload.keys = bar.key
        finalPayload.singleShowLayer = single
        setSingle(!single)
        break
      // case 'singleShowLayer':
      //   finalPayload.singleShowLayer = 'negation'
      //   break
      case 'delete':
        const l = bar.key?.map(item => ({
          id: item,
          children: [],
        }))
        finalPayload.layers = l
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
  const onSelect = (curKey, e) => {
    let temp = curKey
    const isSelected = e.selected
    const { key } = e.node
    // 当右键菜单显示时，如果用左键某个图层或者分组，需要隐藏右键菜单
    dispatch({
      type: 'bar/setIsShowRightMenu',
      payload: false,
    })
    // 多选情况下，点击那个剩哪个
    if (isSelected) {
      dispatch({
        type: 'bar/selectLayers',
        payload: e.selectedNodes,
      })
      dispatch({
        type: 'bar/save',
        payload: {
          key: temp,
        },
      })
      return
    } else {
      // 多选情况下，按住ctrl键时，应该是取消选中所点击的那项
      //           没有按住ctrl键时，应该只保留所点击的那项
      isCtrlKeyPressing ? (temp = curKey) : (temp = [key])
      setSelected(temp)
      dispatch({
        type: 'bar/save',
        payload: {
          key: temp,
        },
      })
    }
    // setSelected(curKey)
  }
  // 响应右键点击
  const onRightClick = ({ event, node }) => {
    event.stopPropagation()
    const { modules, key } = node
    // dispatch({
    //   type: 'bar/save',
    //   payload: { isMultipleTree: true },
    // })
    // 如果有选中了的节点 并且 此次右击的目标是其中一个，则展开菜单，
    // 否则，重置已选中节点 并 单选中当前节点以及展开右键菜单
    let t = []
    if (selected.length && selected.includes(key)) {
      console.log('sssss', selected);
      t = selected
      // dispatch({
      //   type: 'bar/save',
      //   payload: { isMultipleTree: false },
      // })
    } else {
      t = [key]
    }
    setSelected(t)
    // !用seletced在本次渲染中不能获取到
    dispatch({
      type: 'bar/save',
      payload: {
        key: t,
      },
    })
    // 确认分组时点击的是哪个节点
    dispatch({
      type: `bar/saveLastRightClickKey`,
      payload: key,
    })
    dispatch({
      type: 'bar/save',
      payload: { isMultipleTree: false },
    })
  }
  // 展开 / 收起 全部节点
  const myOnExpand = (expandedKeys, { expanded, node }) => {
    setIsExpand(expandedKeys)
  }
  //
  const onDrop = info => {
    console.log('info', info)
    const dropKey = info.node.key
    const dragKey = info.dragNode.key
    const dropPos = info.node.pos.split('-')
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])

    const loop = (data, key, callback) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].id === key) {
          return callback(data[i], i, data)
        }
        if (data[i].modules) {
          loop(data[i].modules, key, callback)
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

    // if (!info.dropToGap) {
    //   // Drop on the content
    //   loop(data, dropKey, item => {
    //     item.children = item.children || [];
    //     // where to insert 示例添加到头部，可以是随意位置
    //     item.children.unshift(dragObj);
    //   });
    // } else

    if (
      (info.node.modules || []).length > 0 &&
      info.node.props.expanded
      // && dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.modules = item.modules || []
        item.modules.unshift(dragObj)
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
      type: 'bar/update',
      payload: data,
    })
  }


  // 获取子组件传过来的X，Y值
  const [menuInfo, setMenuInfo] = useState({ x: 0, y: 0, id: null, isFolder: false })
  const getCurrentMenuLocation = useCallback((menuInfo) => {
    // setMenuInfo(menuInfo)
    dispatch({
      type: 'bar/setRightMenuInfo',
      payload: menuInfo
    })
    // 点击右键才渲染菜单
    dispatch({
      type: 'bar/setIsShowRightMenu',
      payload: true,
    })
  })
  // 点击右键菜单后，隐藏菜单
  const hideMenu = () => {
    dispatch({
      type: 'bar/setIsShowRightMenu',
      payload: false,
    })
  }
  return (
    <div className="left-menu">
      <div className="left-wrap">
        <div className="header" ref={headerRef}>
          <header className="header-text">图层</header>
          <IconFont
            type="icon-tucengshouqi" onClickCapture={() => toggle()}
            style={{ cursor: 'pointer' }} />
        </div>
        <div className="left-wrap-toolbar" ref={topBarRef}>
          <ToolBar data={topBarIcons} iconSize="12px" getActiveIcon={getActiveIcon}>
          </ToolBar>
        </div>
        {/*右键菜单Dropdown */}

        {/* <Dropdown overlay={finalMenu} trigger={['contextMenu']}> */}
        <div className="left-wrap-tree" ref={treeRef}>
          <Tree
            className='layers-tree'
            draggable
            blockNode
            fieldNames={
              { key: 'id', children: 'modules' }
            }
            multiple={bar.isMultipleTree}
            switcherIcon={<DownOutlined />}
            defaultExpandedKeys={customExpandKeys}
            onDrop={onDrop}
            onExpand={myOnExpand}
            onSelect={onSelect}
            onRightClick={onRightClick}
            treeData={bar.treeData}
            selectedKeys={bar.key}
            titleRender={(nodeData) => {
              // title 置为空，覆盖antTree 默认的title
              return (<div title="">
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
        {/* {bar.isShowRightMenu &&
          <RightClickMenu menuInfo={menuInfo} menuOptions={customMenuOptions} hideMenu={hideMenu} />} */}
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

