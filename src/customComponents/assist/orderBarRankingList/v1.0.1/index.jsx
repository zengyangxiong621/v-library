import React, { useRef, useEffect } from 'react';
import ComponentDefaultConfig from './config'
import './index.css'

const ListItem = (props) => {
  const { index, column1, column2, column3, dataLen, isShowProgress, maxData } = props
  const everyColumnHeight = 100 / dataLen
  const ratio = (+column3 / maxData) * 100

  return (
    <div className='list-item' style={{ height: `${everyColumnHeight}%` }}>
      <div>
        <div className={['item-num', index <= 2 ? 'item-num-top3' : null].join(' ')}>
          <span>{index + 1}</span>
        </div>
      </div>
      <div>{column1}</div>
      <div>{column2}</div>
      {
        isShowProgress && <div className='progress-bar'>
          <span className='progress-bar-bg'>
            <span className='progress' style={{ width: `${ratio}%` }}></span>
          </span>
        </div>
      }
      <div>{column3}</div>
    </div >
  )
}

const OrderBarRankingList = (props) => {
  const componentConfig = props.componentConfig || ComponentDefaultConfig
  const { config } = componentConfig
  const { fields, data } = componentConfig.staticData
  // debugger
  // 最新字段
  const finalFields = props.fields || ['column1', 'column2', 'column3']
  // 组件静态或者传入组件的数据
  const originData = props.comData || data
  // 根据传入的fields来映射对应的值
  const fields2ValueMap = {}
  const initColumnsName = ['column1', 'column2', 'column3']
  finalFields.forEach((item, index) => {
    fields2ValueMap[initColumnsName[index]] = item
  })
  // 根据对应的字段来转换data数据
  const finalData = Array.isArray(originData) ? originData.map((item) => {
    let res = {}
    for (let k in fields2ValueMap) {
      res[k] = item[fields2ValueMap[k]]
    }
    return res
  }) : []

  const getTargetStyle = (Arr) => {
    const targetStyle = {};
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetStyle[name] = value
        })
      } else {
        targetStyle[name] = value
      }
    });
    return targetStyle
  }

  const finalStyle = getTargetStyle(config)
  console.log('finalData', finalData)
  const maxData = finalData.reduce((pre, cur) => {
    let temp = pre
    if (typeof cur.column3 === 'number') {
      temp = cur.column3 >= pre ? cur.column3 : pre
    }
    return temp
  }, 0)
  console.log('maxData', maxData)
  return (
    <div
      style={{ ...finalStyle, height: 'inherit', width: '100%' }}
    >
      <div className='ranking-order-list-wrap'>
        {
          finalData.map((item, index) => {
            return <ListItem
              maxData={maxData}
              isShowProgress={finalStyle.isShowProgress}
              key={index}
              index={index}
              {...item}
              dataLen={finalData.length}
            />
          })
        }
      </div>
    </div>
  )

}

export {
  OrderBarRankingList,
  ComponentDefaultConfig
}

export default OrderBarRankingList