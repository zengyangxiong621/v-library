import React, { Component } from 'react';
import './index.css'
import ipMapping1 from './ipMapping1.png'
import ipMapping6 from './ipMapping6.png'
import ipMapping7 from './ipMapping7.png'
import ComponentDefaultConfig from './config'


class IpMapping extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div className='ip-mapping1'>
        <img className='bg-one' src={ipMapping6} alt="背景图片" />
        <img className='bg-two' src={ipMapping7} alt="背景图片" />
        {/* <img className='bg-fixed' src={ipMapping1} alt="背景图片" /> */}
      </div>
    )
  }
}
export {ComponentDefaultConfig}
export default IpMapping;