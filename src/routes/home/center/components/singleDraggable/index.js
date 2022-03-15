import { useState, useEffect } from 'react'
import { connect } from 'dva'

const SingleDraggable = ({ bar, dispatch, ...props }) => {
  return (
    <div className="SingleDraggable">
    </div>
  )
}
export default connect(({ bar }) => ({
  bar,
}))(SingleDraggable)
