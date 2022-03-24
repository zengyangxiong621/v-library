import { useState, useEffect } from 'react'
import './index.less'
import { ruler } from './dist/ruler'
import './dist/ruler.min.css'

const Ruler = (props) => {

  useEffect(() => {
    var myRuler = new ruler({
      container: document.querySelector('#Ruler'),// reference to DOM element to apply rulers on
      rulerHeight: 30, // thickness of ruler
      fontFamily: 'arial',// font for points
      fontSize: '14px',
      strokeStyle: 'black',
      lineWidth: 1,
      enableMouseTracking: true,
      enableToolTip: true,
    })
  }, [])
  return (
    <div id="Ruler" style={ { position: 'absolute' } }>
      {/*GG*/ }
    </div>
  )
}
export default Ruler
