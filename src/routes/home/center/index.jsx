import { useState, useEffect, useRef, useMemo } from 'react'
import { connect } from 'dva'
import './index.css'
import { message, Button } from 'antd'
import ChooseArea from './components/ChooseArea'
import CustomDraggable from './components/CustomDraggable'
import { DraggableContainer, DraggableChild } from './components/draggable-comp'

const containerStyle = {
  height: '100%',
  position: 'relative',
  zIndex: 1000,
}


function Center ({ bar, dispatch }) {
  // console.log('example', example)
  const draggableItems = bar.draggableItems
  const draggableContainerData = bar.draggableContainer
  const [key, setKey] = useState(100)
  // useMemo(() => {
  //   console.log('example.selectedKeys', example.selectedKeys)
  //   items.forEach(item => {
  //     item.active = false
  //   })
  //   items.forEach(item => {
  //     if (example.selectedKeys.includes(item.id)) {
  //       item.active = true
  //     }
  //   })
  // }, [example.selectedKeys])
  const handleRulerClick = (direction, e) => {
    // const pointCurX = e.layerX // 指针的位置
    // const pointCurY = e.layerY
    // console.log('pointCurX', pointCurX)
    // console.log('pointCurY', pointCurY)
    // const temp = (direction === 'vertical')
    // console.log('temp', temp)
    // setItems([...items, {
    //   id: key.toString(),
    //   parentId: 'parent1',
    //   style: {
    //     width: temp ? '100%' : 1,
    //     height: temp ? 1 : '100%',
    //     cursor: 'move',
    //     background: 'black',
    //   },
    //   className: '',
    //   active: false,
    //   defaultPosition: {
    //     x: !temp ? pointCurX : 0,
    //     y: temp ? pointCurY : 0,
    //   },
    //   position: {},
    // }])
    // setKey(key + 1)
    // console.log('items', items)
  }

  const [borderItems, setBorderItems] = useState([
    {
      id: '10',
      parentId: 'parent1',
      style: {
        width: 1,
        height: 1000,
        cursor: 'move',
        background: 'black',
      },
      className: '',
      active: false,
      defaultPosition: {
        x: 200,
        y: 200,
      },
      position: {},
    },
  ])

  const handleStart = () => {

  }
  const handleDrag = (event, node) => {
    // console.log('node', node)
  }
  const handleStop = () => {

  }
  const click = (e) => {
    // console.log('e', e.target)
  }
  const onScaleEnd = (item, x, y, width, height) => {
    item.defaultPosition = {
      x, y,
    }
    item.style.width = width
    item.style.height = height
    message.info(`width: ${ width },height: ${ height }`)
  }

  const onChooseEnd = (selectedList) => {
    // console.log('selectedList', selectedList.join('、'))
    message.info('已选择的有' + selectedList.join('、'))
  }
  const containerRef = useRef(null)
  // useEffect(() => {
  //   console.log('containerRef', containerRef.current.$.className = 'draggable-container')
  // }, [])
  const handleClick = (item, e) => {
    // setItems()
    // console.log('222222222222222222')
    // dispatch({
    //   type: 'example/selectSingle',
    //   payload: item.id
    // })
    //
    // items.forEach(it => {
    //   it.active = false
    // })
    // item.active = true
    // dispatch({
    //   type: 'example/fetch',
    //   payload: {
    //     selectedKeys: [item.id],
    //   },
    // })
    message.info('抛出')
  }
  // const setSelect = (id) => {
  //   items.forEach(item => {
  //     item.active = false
  //   })
  //   items.find(item => item.id === id).active = true
  //   dispatch({
  //     type: 'bar/fetch',
  //     payload: {
  //       selectedKeys: [id],
  //     },
  //   })
  // }
  const [childItems, setChildItems] = useState([
    {
      id: '100',
      defaultPosition: {
        x: '0',
        y: '0',
      },
    }, {
      id: '101',
      defaultPosition: {
        x: '0',
        y: '0',
      },
    },
  ])
  return (
    <div className="center-wrap">
      {/*<div className="rule-vertical" onClick={ (e) => handleRulerClick('vertical', e) }/>*/ }
      {/*<div className="rule-horizon" onClick={ (e) => handleRulerClick('horizon', e) }/>*/ }
      {/*<ChooseArea/>*/ }
      {/*<DraggableContainer style={ draggableContainerData.style } limit={ draggableContainerData.limit }>*/ }
      {/*  <DraggableChild key={ draggableContainerData.id } defaultPosition={ draggableContainerData.defaultPosition }>*/ }
      {/*    <div style={ draggableContainerData.style }>*/ }
      {/*      <CustomDraggable components={ draggableContainerData.components } style={ containerStyle }/>*/ }
      {/*    </div>*/ }
      {/*  </DraggableChild>*/ }
      {/*</DraggableContainer>*/ }

      <CustomDraggable components={ draggableItems } style={ containerStyle }/>

    </div>


  )
}

export default connect(({ bar }) => ({
  bar,
}))(Center)
