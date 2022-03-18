import { useState, useEffect, Props, forwardRef, useImperativeHandle } from 'react'
import { connect } from 'dva'
import './index.css'


let SupportLines: any = ({ bar, dispatch, cRef }: any) => {
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (left: number, top: number, display: string = 'block') => {
      setStyle({ left, top, display })
    },
  }))

  const [ style, setStyle ] = useState({
    left: 0,
    top: 0,
    display: 'none',
  })

  // const handleSetPosition = (x?: number, y?: number) => {
  //   // console.log('supportRef', supportRef)
  //   // setPosition({ x, y })
  // }
  return (
    <div
      className="SupportLines"
      style={ { position: 'absolute', ...style } }
    >
      <div className="v-line"/>
      <div className="h-line"/>
      <div
        className="position-info"
        style={ { position: 'absolute', bottom: 20, right: 20, color: '#b6b2b2', fontSize: 22 } }
      >
        {
          style.left + ',' + style.top
        }
      </div>
    </div>
  )
}

// class SupportLines extends React.Component {
//   constructor(props: any) {
//     super(props)
//     this.state = {
//       position: {
//         x: 0,
//         y: 0,
//       },
//     } as any
//   }
//
//   handleSetPosition(x: number, y: number) {
//     this.setState({ position: { x, y } })
//   }
//
//   render() {
//     const { position }: any = this.state
//     console.log('position', position)
//     return (
//       <div
//         className="SupportLines"
//         style={ { position: 'absolute', left: position.x, top: position.y } }
//       >
//         <div className="v-line"/>
//         <div className="h-line"/>
//         <div className="position-info" style={ { position: 'absolute', bottom: 20, right: 20 } }>
//           位置信息: {
//           position.x + ',' + position.y
//         }
//         </div>
//       </div>
//     )
//   }
// }

export default connect(({ bar }: any) => ({
  bar,
}))(SupportLines)
