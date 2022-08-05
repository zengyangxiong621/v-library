import React, { Component, CSSProperties,Fragment } from 'react';
import ComponentDefaultConfig from './config'
import DigitalFlop from '@jiaminghi/data-view-react/es/digitalFlop'
import './index.css'
const formatter = function (number) {
  const numbers = number.toString().split('').reverse()
  const segs = []
  while (numbers.length) segs.push(numbers.splice(0, 3).join(''))
  return segs.join(',').split('').reverse().join('')
}
const randomExtend = function (minNum, maxNum) {
  if (arguments.length === 1) {
    return parseInt(Math.random() * minNum + 1, 10)
  } else {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
  }
}
class Counter extends Component {
  constructor(Props) {
    super(Props)
    this.state = this.getData()
  }

  componentDidMount(){
    // this.timer = setInterval(() => this.updateData(), 8000)
  }
  updateData() {
    // this.setState(() => this.getData())
  }
  componentWillUnmount() {
    // clearInterval(this.timer)
  }
  getData() {
    return {
      config: { number: [0], content: '{nt}', formatter, animationFrame: 20, style: { fontSize: 50, fill: '#FEDB65' } }
    }
  }
  render () {
    return (
      <DigitalFlop config={this.state.config} style={{width: '240px', height: '100px'}} />
    )

  }
}

export { Counter }
export default Counter