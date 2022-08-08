import ComponentDefaultConfig from './config'
import * as echarts from 'echarts'
import EC from '../../EC'
import React from 'react'
import 'echarts-gl';
import earth from './earth.jpg'
import bathymetry from './bathymetry.jpg';
import starfield from './starfield.jpg'

const Earth = (props) => {

  const getOption = () => ({
    globe: {
      baseTexture: earth, // 地图图片
      heightTexture: bathymetry, //地球顶点的置换纹理
      // environment: starfield, // 环境贴图
      shading: 'color', //地球中三维图形的着色效果 color lambert realistic
      globeRadius:100, // 地球的半径
      displacementScale:0.03, //地球顶点位移的大小。默认为 0 地表高度细节
      viewControl: {
        autoRotate: true
      },
      atmosphere: {
        show: true
      },
    },
  })

  const onChartClick = (param, echarts) => { }
  const onChartReady = (echarts) => { }
  let onEvents = {
    click: onChartClick,
  }
  return (
    <EC option={getOption()} onChartReady={onChartReady} onEvents={onEvents} />
    // <div>123</div>
  )
}

export { Earth, ComponentDefaultConfig }
export default Earth
