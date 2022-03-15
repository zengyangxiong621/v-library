import { useState, useEffect, Props, forwardRef, useImperativeHandle } from 'react'
import { connect } from 'dva'
import './index.css'


let SupportLines: any = ({ bar, dispatch, cRef }: any) => {
  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (x: number, y: number) => {
      setPosition({ x, y })
    },
  }))

  const [ position, setPosition ] = useState({
    x: 200,
    y: 200,
  })

  // const handleSetPosition = (x?: number, y?: number) => {
  //   // console.log('supportRef', supportRef)
  //   // setPosition({ x, y })
  // }
  return (
    <div
      className="SupportLines"
      style={ { position: 'absolute', left: position.x, top: position.y } }
    >
      <div className="v-line"/>
      <div className="h-line"/>
      <div className="position-info" style={ { position: 'absolute', bottom: 20, right: 20 } }>
        位置信息: {
        position.x + ',' + position.y
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
