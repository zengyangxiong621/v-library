import React from 'react';
import { Radio } from 'antd';
import './index.css'
import ComponentDefaultConfig from './config'


const ButtonGroup3 = (props) => {
  return (
    <Radio.Group defaultValue="a" buttonStyle="solid">
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
  )
}

export {
  ButtonGroup3,
  ComponentDefaultConfig
}

export default ButtonGroup3