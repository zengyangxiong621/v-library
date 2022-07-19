import React, { useMemo, forwardRef } from 'react'

import PropTypes from 'prop-types'

import classnames from 'classnames'

import { deepMerge } from '@jiaminghi/charts/lib/util/index'
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util'

import useAutoResize from '../../use/autoResize'

import './style.less'

const border = ['left-top', 'right-top', 'left-bottom', 'right-bottom']
const defaultColor = ['#4fd2dd', '#235fa7']

const BorderBox = forwardRef(({ children, className, style, color = [], backgroundColor = 'transparent' }, ref) => {
  const { width, height, domRef } = useAutoResize(ref)

  const mergedColor = useMemo(() => deepMerge(deepClone(defaultColor, true), color || []), [color])

  const classNames = useMemo(() => classnames('dv-border-box-1', className), [
    className
  ])

  return (
    <div className={classNames} style={style} ref={domRef}>
      <svg className='border' width={width} height={height}>
        <polygon fill={backgroundColor} points={`10, 27 10, ${height - 27} 13, ${height - 24} 13, ${height - 21} 24, ${height - 11}
        38, ${height - 11} 41, ${height - 8} 73, ${height - 8} 75, ${height - 10} 81, ${height - 10}
        85, ${height - 6} ${width - 85}, ${height - 6} ${width - 81}, ${height - 10} ${width - 75}, ${height - 10}
        ${width - 73}, ${height - 8} ${width - 41}, ${height - 8} ${width - 38}, ${height - 11}
        ${width - 24}, ${height - 11} ${width - 13}, ${height - 21} ${width - 13}, ${height - 24}
        ${width - 10}, ${height - 27} ${width - 10}, 27 ${width - 13}, 25 ${width - 13}, 21
        ${width - 24}, 11 ${width - 38}, 11 ${width - 41}, 8 ${width - 73}, 8 ${width - 75}, 10
        ${width - 81}, 10 ${width - 85}, 6 85, 6 81, 10 75, 10 73, 8 41, 8 38, 11 24, 11 13, 21 13, 24`} />
      </svg>

      {border.map(borderName => (
        <svg
          width='150px'
          height='150px'
          key={borderName}
          className={`${borderName} border`}
        >
          <polygon
            fill={mergedColor[0]}
            points='6,66 6,18 12,12 18,12 24,6 27,6 30,9 36,9 39,6 84,6 81,9 75,9 73.2,7 40.8,7 37.8,10.2 24,10.2 12,21 12,24 9,27 9,51 7.8,54 7.8,63'
          >
            <animate
              attributeName='fill'
              values={`${mergedColor[0]};${mergedColor[1]};${mergedColor[0]}`}
              dur='0.5s'
              begin='0s'
              repeatCount='indefinite'
            />
          </polygon>
          <polygon
            fill={mergedColor[1]}
            points='27.599999999999998,4.8 38.4,4.8 35.4,7.8 30.599999999999998,7.8'
          >
            <animate
              attributeName='fill'
              values={`${mergedColor[1]};${mergedColor[0]};${mergedColor[1]}`}
              dur='0.5s'
              begin='0s'
              repeatCount='indefinite'
            />
          </polygon>
          <polygon
            fill={mergedColor[0]}
            points='9,54 9,63 7.199999999999999,66 7.199999999999999,75 7.8,78 7.8,110 8.4,110 8.4,66 9.6,66 9.6,54'
          >
            <animate
              attributeName='fill'
              values={`${mergedColor[0]};${mergedColor[1]};transparent`}
              dur='1s'
              begin='0s'
              repeatCount='indefinite'
            />
          </polygon>
        </svg>
      ))}

      <div className='border-box-content'>{children}</div>
    </div>
  )
})

BorderBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array,
  backgroundColor: PropTypes.string
}

export default BorderBox
