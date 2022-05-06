import { useState, useEffect } from 'react'
import { connect } from 'dva'
import './index.less'
import {
  FullscreenOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons'

const BottomBar = ({ bar, dispatch, props }: any) => {
  useEffect(() => {

  }, [])
  const handleFullScreen = () => {

  }
  const handleScreen = (type: boolean) => {
    if(bar.canvasScaleValue < 0.1) {
      return false
    }
    dispatch({
      type: 'bar/save',
      payload: {
        canvasScaleValue: Number((bar.canvasScaleValue + (type ? 0.1 : -0.1)).toFixed(3)),
      },
    })

  }
  const handleMinusScreen = () => {

  }

  return (
    <div className="c-center-bottom-bar">
      <section className="left">
      </section>
      <section className="right">
        <MinusCircleOutlined
          style={ { color: 'white', fontSize: '16px', cursor: 'pointer', marginRight: '16px' } }
          onClick={ () => handleScreen(false) }
        />
        <PlusCircleOutlined
          style={ { color: 'white', fontSize: '16px', cursor: 'pointer', marginRight: '16px' } }
          onClick={ () => handleScreen(true) }
        />
        <FullscreenOutlined
          style={ { color: 'white', fontSize: '16px', cursor: 'pointer' } }
          onClick={ handleFullScreen }
        />
      </section>
    </div>
  )
}
export default connect(({ bar }: any) => ({ bar }))(BottomBar)
