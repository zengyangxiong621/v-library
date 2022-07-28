import React, { Component } from 'react';
import './index.css'
import bc from './bc.png'
import ComponentDefaultConfig from './config'


class IpMapping extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className='ip-mapping2-1'>
        <img className='bg-one' src={bc} alt="背景图片" />
      </div>
    )
  }
}
export {ComponentDefaultConfig}
export default IpMapping;