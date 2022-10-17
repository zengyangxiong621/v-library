import { useState, useEffect, Props, forwardRef, useImperativeHandle, useRef } from "react"
import ReactDOM from "react-dom"
import { connect } from "dva"
import "./index.less"

interface SupportLineProperty {
  bar?: any,
  cRef?: any
}

const SupportLines = ({ bar, cRef }: SupportLineProperty) => {
  const [ style, setStyle ] = useState({
    left: 0,
    top: 0,
    display: "none",
  })
  const [ compBorderStyle, setCompBorderStyle ] = useState({
    width: 0,
    height: 0,
  })
  const borderRef: any = useRef(null)
  const lineRef: any = useRef(null)
  const borderTopRef: any = useRef(null)
  const borderRightRef: any = useRef(null)
  const borderBottomRef: any = useRef(null)
  const borderLeftRef: any = useRef(null)

  useImperativeHandle(cRef, () => ({
    // changeVal 就是暴露给父组件的方法
    handleSetPosition: (left: number, top: number, display = "block") => {
      setStyle({ left, top, display })
      lineRef.current.style.left = left + "px"
      lineRef.current.style.top = top + "px"
      lineRef.current.style.display = display
    },
    handleSetCompBorderStyle: ({ width, height }: { width: number, height: number }) => {
      // setCompBorderStyle({ width, height })
      borderTopRef.current.style.width = width + "px"

      borderRightRef.current.style.left = width + "px"
      borderRightRef.current.style.height = height + "px"

      borderBottomRef.current.style.top = height + "px"
      borderBottomRef.current.style.width = width + "px"

      borderLeftRef.current.style.height = height + "px"
      // borderRef.current.style.width = width + "px"
      // borderRef.current.style.height = height + "px"
    },
  }))


  return (
    <div
      style={ {
        position: "absolute",
        left: 0,
        top: 0,
      } }
    >
      <div className="border"
           ref={ borderRef }
           style={ {
             // ...style,
             position: "absolute",
             border: `${ 1 / bar.canvasScaleValue }px solid #2482FF`,
             ...compBorderStyle,
             ...style,
           } }
      >
        <div className="top"
             ref={ borderTopRef }
             style={ {
               position: "absolute",
               top: 0,
               left: 0,
               width: 100,
               height: 2,
               backgroundColor: "#2482FF"
             } }>

        </div>
        <div className="right"
             ref={ borderRightRef }
             style={ {
               position: "absolute",
               top: 0,
               left: 100,
               width: 2,
               height: 100,
               backgroundColor: "#2482FF"

             } }>

        </div>
        <div className="bottom"
             ref={ borderBottomRef }
             style={ {
               position: "absolute",
               top: 100,
               left: 0,
               width: 100,
               height: 2,
               backgroundColor: "#2482FF"

             } }>

        </div>
        <div className="left"
             ref={ borderLeftRef }
             style={ {
               position: "absolute",
               top: 0,
               left: 0,
               width: 2,
               height: 100,
               backgroundColor: "#2482FF"

             } }>

        </div>
      </div>
      <div
        className="SupportLines"
        ref={ lineRef }
        style={ {
          position: "absolute",
          zIndex: "1000000",
          ...style,
        } }
      >
        <div className="v-line" style={ { borderTop: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
        <div className="h-line" style={ { borderLeft: `${ 1 / bar.canvasScaleValue }px dashed #b6b2b2` } }/>
        <div
          className="position-info"
          style={ {
            position: "absolute",
            bottom: 20,
            right: 20,
            color: "#b6b2b2",
            fontSize: 18 / bar.canvasScaleValue,
          } }
        >
          {
            Math.ceil(style.left) + "," + Math.ceil(style.top)
          }
        </div>
      </div>
    </div>

  )
}

export default connect(({ bar }: any) => ({
  bar,
}))(SupportLines)
