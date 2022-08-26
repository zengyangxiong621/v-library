import RemoteBaseComponent from "@/components/RemoteBaseComponent";
import {getFields} from "@/utils/data";
import {useState, useRef} from "react";
import TimeSelect from '@/customComponents/interactive/timeSelect'
import ScrollTable from '@/customComponents/table/scrollTable'
import Bar from '@/customComponents/echarts/components/bar/index'
import SelectV2 from '@/customComponents/assist/select/index'
import CusImage from '@/customComponents/assist/image/index'
import BasicBar from '@/customComponents/echarts/components/basicBar/v1.1.0'
import ChinaMap from '@/customComponents/echarts/components/chinaMap'
import WorldMap from '@/customComponents/echarts/components/worldMap'
import ZebraColumn from '@/customComponents/echarts/components/zebraColumn'
import RankingBar from '@/customComponents/echarts/components/rankingBar/v1.1.0'
import Tab from '@/customComponents/interactive/tab'
import ScrollSelect from '@/customComponents/interactive/scrollSelect/index'
import Counter from  '@/customComponents/assist/counter2'
import {connect} from "dva"

// import './index.css'
import {cloneDeep} from 'lodash'
import {debounce} from "@/utils/common";

// import CardFlipper1 from '@/customComponents/assist/CardFlipper_1'
// import CardFlipper2 from '@/customComponents/assist/CardFlipper_2'
import InstrumentPanel3 from '@/customComponents/echarts/components/instrumentPanel_3'
import InstrumentPanel4 from '@/customComponents/echarts/components/instrumentPanel_4'
import Timeline from '@/customComponents/assist/timeline'
import ErrorCatch from 'react-error-catch'
import RemoteComponentErrorRender from '@/components/RemoteComponentErrorRender'

const ComponentEventContainer = ({publishDashboard, dispatch, events = [], id = 0, scale=1, ...props}) => {
  const callbackArgs = publishDashboard.callbackArgs
  const callbackParamsList = publishDashboard.callbackParamsList
  const {componentConfig} = props
  const [animationConfig, setAnimationConfig] = useState({
    transition: 'transform 600ms ease 0s'
  })
  const componentRef = useRef(null)
  const [opacityStyle, setOpacityStyle] = useState({opacity: 1})
  const opacityTimeIds = useRef([])
  const [clickTimes, setClickTimes] = useState(0)
  // 点击
  const handleClick = debounce((e, data) => {
    const clickEvents = events.filter(item => item.trigger === 'click')
    const clickActions = clickEvents.reduce((pre, cur) => pre.concat(cur.actions), [])
    if (clickActions.length === 0) {
      return
    }
    setClickTimes(1)
    console.log('点击事件', data)
    customEventsFunction(clickEvents, data)
  }, 300)
  // 移入
  const handleMouseEnter = debounce((e, data) => {
    const mouseEnterEvents = events.filter(item => item.trigger === 'mouseEnter')
    const mouseEnterActions = mouseEnterEvents.reduce((pre, cur) => pre.concat(cur.actions), [])
    if (mouseEnterActions.length === 0) {
      return
    }
    console.log('鼠标移入', data)
    customEventsFunction(mouseEnterEvents, data)
  })
  // 移出
  const handleMouseLeave = debounce((e, data) => {
    const mouseOutEvents = events.filter(item => item.trigger === 'mouseLeave')
    const mouseOutActions = mouseOutEvents.reduce((pre, cur) => pre.concat(cur.actions), [])
    if (mouseOutActions.length === 0) {
      return
    }
    console.log('鼠标移出', data)
    customEventsFunction(mouseOutEvents, data)
  })

  const customEventsFunction = (events, data) => {
    events.forEach((item) => {
      const conditions = item.conditions
      const conditionType = item.conditionType
      // const callbackArgs = {
      //   startTime: '2022-06-17',
      //   endTime: '2022-06-17'
      // }
      /*        [
              {
                "compare": "==",
                "code": "return data",
                "field": "startTime",
                "expected": "2022-06-17",
                "name": "条件",
                "id": "9346fc0b-8a99-441e-8fa9-7d5628290333",
                "type": "field"
              }
              ]*/
      const conditionJudgeFunc = (condition) => {
        // 条件值
        const field = condition.field
        const type = condition.type
        const code = condition.code
        if (type === 'custom') {
          return new Function('data', code)(data)
        }
        if (condition.compare === '==') {
          return data[field] === condition.expected;
        }
        if (condition.compare === '!=') {
          return data[field] !== condition.expected;
        }
        if (condition.compare === '<') {
          return Number(data[field]) < Number(condition.expected);
        }
        if (condition.compare === '<=') {
          return Number(data[field]) < Number(condition.expected) || data[field] === condition.expected
        }
        if (condition.compare === '>') {
          return Number(data[field]) > Number(condition.expected);
        }
        if (condition.compare === '>=') {
          return Number(data[field]) > Number(condition.expected) || data[field] === condition.expected
        }
        if (condition.compare === 'include') {
          return data[field].indexOf(condition.expected) !== -1
        }
        if (condition.compare === 'exclude') {
          return data[field].indexOf(condition.expected) === -1
        }
        return false
      }
      let isAllowAction = true
      if (conditions.length > 0) {
        isAllowAction = Array.prototype[conditionType === 'all' ? 'every' : 'some'].call(conditions, conditionJudgeFunc)
      }
      console.log('isAllowAction', isAllowAction)
      if (!isAllowAction) {
        return
      }
      console.log('item', item)
      item.actions.forEach(action => {
        const animation = action.animation
        const delay = animation.delay
        setTimeout(() => {
          action.component.forEach(id => {
            const dom = document.querySelector(`.event-id-${id}`)
            dom.style.transition = `transform ${animation.duration}ms ${animation.timingFunction} 0s`
            Object.keys(action).filter(
              (key) => !['id', 'name', 'trigger', 'unmount', 'componentScope', 'component', 'action'].includes(key)
            ).forEach((key) => {
              actionConfigFuncList[key](action[key], action.action, dom, action.id, action, id)
            })
          })
        }, delay)
      })
    })
  }


  // 数组去重，取最后一个
  const duplicateFn = (arr) => {
    let map = new Map();
    for (let item of arr.reverse()) {
      if (!map.has(item.target)) {
        map.set(item.target, item);
      }
    }
    return [...map.values()];
  }

  const handleValueChange = debounce((data) => {
    console.log('-------------')
    console.log('数据变化data', data)
    const componentId = props.componentConfig.id
    const component = publishDashboard.components.find(item => item.id === componentId)
    const compCallbackArgs = duplicateFn(cloneDeep(component.callbackArgs))
    // 回调参数列表
    // 过滤出 callbackParamsList 中的存在 sourceId === component 的 每一项
    const sourceCallbackList = callbackParamsList.filter(item => item.sourceModules.find(jtem => jtem.id === componentId))
    // 需要作用到哪些组件上
    let activeIds = []
    let temp = false
    sourceCallbackList.forEach(item => {
      item.sourceModules.forEach(sourceItem => {
        if (sourceItem.id === componentId) {
          // 回调列表中的当前数据如果有目标组件再进行下一步
          // 循环组件设置的回调参数，获取变量名和字段的对应关系
          if (item.destinationModules.length > 0) {
            compCallbackArgs.forEach(callback => {
              // 判断是否为同一个源
              if (item.callbackParam === callback.target) {
                // 值是否改变
                // data的值存在并且
                if (data[callback.origin] && callbackArgs[callback.target] !== data[callback.origin]) {
                  temp = true
                  callbackArgs[callback.target] = data[callback.origin]
                  activeIds = activeIds.concat(item.destinationModules.map(module => module.id))
                }
                dispatch({
                  type: 'publishDashboard/save',
                  payload: {
                    callbackArgs
                  }
                })
              }
            })
          }
        }
      })
    })
    console.log('activeIds1', activeIds)
    console.log('temp', temp)
    if (temp) {
      activeIds = [...new Set(activeIds)]
      const activeComponents = activeIds.reduce((pre, id) => pre.concat(publishDashboard.components.find(item => item.id === id)), [])
      // 绑定数据容器的组件列表
      const componentsByDataContainer = activeComponents.filter(component => component.dataFrom === 1)
      // 绑定数据源的组件列表
      const componentsByDataSource = activeComponents.filter(component => component.dataFrom === 0)
      // 重新获取部分组件（绑定数据源的组件列表）的数据
      dispatch({
        type: 'publishDashboard/getComponentsData',
        payload: activeComponents
      })
      // 重新获取部分数据容器的数据
      const filterComponentsByDataContainer = []
      // 去重
      activeComponents.forEach(component => {
        component.dataContainers.forEach(container => {
          if (!filterComponentsByDataContainer.find(item => item.id === container.id)) {
            filterComponentsByDataContainer.push(container)
          }
        })
      })
      dispatch({
        type: 'publishDashboard/getContainersData',
        payload: filterComponentsByDataContainer
      })
    }
    // 自定义事件
    const dataChangeEvents = events.filter(item => item.trigger === 'dataChange' || item.trigger === 'statusChange')
    const dataChangeActions = dataChangeEvents.reduce((pre, cur) => pre.concat(cur.actions), [])
    if (dataChangeActions.length === 0) {
      return
    }
    customEventsFunction(dataChangeEvents, data)

  }, 300)


  const animation = ({duration, timingFunction, type}, actionType, dom, actionId, action, componentId) => {
    if (['show', 'hide'].includes(actionType)) {
      // transform = 'translateY(200px)'
      let translate = {
        x: 0,
        y: 0
      }
      switch (type) {
        case 'slideLeft':
          translate.x = -200
          break
        case 'slideRight':
          translate.x = 200
          break
        case 'slideTop':
          translate.y = -200
          break
        case 'slideBottom':
          translate.y = 200
          break;
        default:
          break
      }
      const translateX = /translateX\((.+?)\)/g
      const translateY = /translateY\((.+?)\)/g
      if (translateX.test(dom.style.transform)) {
        let value = dom.style.transform.match(translateX)[0]
        // 取出数字包括 - 和 . 号
        let xLength = Number(value.replace(/[^\d|^\.|^\-]/g, ''))
        xLength = xLength + translate.x
        dom.style.transform = dom.style.transform.replace(translateX, `translateX(${xLength}px)`)
      } else {
        dom.style.transform += `translateX(${translate.x}px)`
      }
      if (translateY.test(dom.style.transform)) {
        let value = dom.style.transform.match(translateY)[0]
        let yLength = Number(value.replace(/[^\d|^\.|^\-]/g, ''))
        yLength = yLength + translate.y
        dom.style.transform = dom.style.transform.replace(translateY, `translateY(${yLength}px)`)
      } else {
        dom.style.transform += `translateY(${translate.y}px)`
      }
      let timer = null
      const index = opacityTimeIds.current.indexOf(componentId)
      // if (index !== -1) {
      //   // 说明存在
      //   clearInterval(timer)
      //   console.log('清除了不')
      //   opacityTimeIds.current.splice(index, 1)
      // } else {
      //   opacityTimeIds.current.push(componentId)
      // }
      timer = setInterval(() => {
        // 在一个时间段内，只存在一种事件
        if (actionType === 'show') {
          if (dom.style.opacity >= 1) {
            dom.style.opacity = 1
            clearInterval(timer)
            const index = opacityTimeIds.current.indexOf(componentId)
            opacityTimeIds.current.splice(index, 1)
          } else {
            dom.style.opacity = Number(dom.style.opacity) + 0.01
          }
        }
        if (actionType === 'hide') {
          if (dom.style.opacity <= 0) {
            dom.style.opacity = 0
            clearInterval(timer)
            const index = opacityTimeIds.current.indexOf(componentId)
            opacityTimeIds.current.splice(index, 1)
          } else {
            dom.style.opacity = Number(dom.style.opacity) - 0.01
          }
        }
      }, duration / 100)

    }

  }

  const rotate = ({perspective, rotateX, rotateY, rotateZ}, action, dom) => {
    if (action === 'rotate') {
      console.log('dom', dom)
      const rotateRegX = /rotateX\((.+?)\)/g
      const rotateRegY = /rotateY\((.+?)\)/g
      const rotateRegZ = /rotateZ\((.+?)\)/g
      if (rotateRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegX, `rotateX(${rotateX}deg)`)
      } else {
        dom.style.transform += `rotateX(${rotateX}deg)`
      }
      if (rotateRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegY, `rotateY(${rotateY}deg)`)
      } else {
        dom.style.transform += `rotateY(${rotateY}deg)`
      }
      if (rotateRegZ.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(rotateRegZ, `rotateZ(${rotateZ}deg)`)
      } else {
        dom.style.transform += `rotateZ(${rotateZ}deg)`
      }
    }
  }

  const showOrHide = (value) => {

  }

  const scaleFunc = ({origin, x, y}, action, dom) => {
    if (action === 'scale') {
      const scaleRegX = /scaleX\((.+?)\)/g
      const scaleRegY = /scaleY\((.+?)\)/g
      if (scaleRegX.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegX, `scaleX(${x})`)
      } else {
        dom.style.transform += `scaleX(${x})`
      }
      if (scaleRegY.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(scaleRegY, `scaleY(${y})`)
      } else {
        dom.style.transform += `scaleY(${y})`
      }
      dom.style['transform-origin'] = origin
    }
  }

  const translate = ({toX, toY}, action, dom) => {
    if (action === 'translate') {
      const translateReg = /translate3d\((.+?)\)/g
      if (translateReg.test(dom.style.transform)) {
        dom.style.transform = dom.style.transform.replace(translateReg, `translate3d(${toX}px, ${toY}px, 0px)`)
      } else {
        dom.style.transform += `translate3d(${toX}px, ${toY}px, 0px)`
      }
    }
  }

  const actionConfigFuncList = {
    animation,
    rotate,
    scale: scaleFunc,
    translate,
  }


  return (
    <div
      key={id}
      ref={componentRef}
      className={`single-component event-id-${id}`}
      // onClick={handleClick}
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      style={{width: '100%', height: '100%', ...animationConfig, ...opacityStyle}}>
      {/*      <RemoteBaseComponent
        {...props}
      ></RemoteBaseComponent>     */}
      {
        props.componentConfig.moduleName === 'counter' ?
        <Counter
          onChange={handleValueChange}
          {...props}
        ></Counter> :
        props.componentConfig.moduleName === 'rankingBar' ?
        <RankingBar
          onChange={handleValueChange}
          {...props}
        >
        </RankingBar>
        :
        props.componentConfig.moduleName === 'image2' ?
        <CusImage
          onChange={handleValueChange}
          {...props}
        >
        </CusImage>
        :
        props.componentConfig.moduleName === 'zebraColumn' ?
        <ZebraColumn
          onChange={handleValueChange}
          {...props}
        >
        </ZebraColumn>
        :
        props.componentConfig.moduleName === 'basicBar' ?
        <BasicBar
          onChange={handleValueChange}
          {...props}
        >
        </BasicBar>
        :
        props.componentConfig.moduleName === 'worldMap' ?
        <WorldMap
          onChange={handleValueChange}
          {...props}
        >
        </WorldMap>
        :
        // props.componentConfig.moduleName === 'chinaMap' ?
        // <ChinaMap
        //   onChange={handleValueChange}
        //   {...props}
        // >
        // </ChinaMap>
        // :
        props.componentConfig.moduleName === 'select2' ?
        <SelectV2
          onChange={handleValueChange}
          {...props}
        >
        </SelectV2>
        :
        props.componentConfig.moduleName === 'bar' ?
        <Bar
          onChange={handleValueChange}
          {...props}
        >
        </Bar>
        :
        props.componentConfig.moduleName === 'scrollTable' ?
          <ScrollTable
            scale={scale}
            onChange={handleValueChange}
            {...props}
          >
          </ScrollTable>
          : props.componentConfig.moduleName === 'tab' ?
          <Tab
            onChange={handleValueChange} // 状态变化，当请求完成/数据变化
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...props}
          >
          </Tab>
          : props.componentConfig.moduleName === 'scrollSelect' ?
          <ScrollSelect
            onChange={handleValueChange}
            {...props}
          >
          </ScrollSelect>
          : props.componentConfig.moduleName === 'timeSelect' ?
          <TimeSelect
            scale={scale}
            onChange={handleValueChange}
            {...props}
          >
          </TimeSelect>
          : props.componentConfig.moduleName === 'worldMap' ?
          <WorldMap
            {...props}
          >
          </WorldMap>
                : props.componentConfig.moduleName === 'timeline' ?
          <Timeline
            {...props}
          >
          </Timeline>
          // : props.componentConfig.moduleName === 'CardFlipper_1' ?
          // <CardFlipper1
          //   scale={scale}
          //   onChange={handleValueChange}
          //   {...props}
          // >
          // </CardFlipper1>
          // : props.componentConfig.moduleName === 'CardFlipper_2' ?
          // <CardFlipper2
          //   scale={scale}
          //   onChange={handleValueChange}
          //   {...props}
          // >
          // </CardFlipper2>
          : props.componentConfig.moduleName === 'instrumentPanel_3' ?
          <InstrumentPanel3
            scale={scale}
            onChange={handleValueChange}
            {...props}
          >
          </InstrumentPanel3>
          : props.componentConfig.moduleName === 'instrumentPanel_4' ?
          <InstrumentPanel4
            scale={scale}
            onChange={handleValueChange}
            {...props}
          >
          </InstrumentPanel4>
          :
          <ErrorCatch
            app={componentConfig.name}
            user=""
            token=""
            max={1}
            errorRender={<RemoteComponentErrorRender errorComponent={componentConfig.name}></RemoteComponentErrorRender>}
            onCatch={(errors) => {
              console.log('组件报错信息：', errors, '组件id', componentConfig.id);
            }}
          >
            <RemoteBaseComponent
              {...props}
              scale={scale}
              onChange={handleValueChange}
            ></RemoteBaseComponent>
          </ErrorCatch>
      }
    </div>
  )
}

export default connect(({publishDashboard}) => ({publishDashboard}))(ComponentEventContainer)
