import React, { Component } from 'react';
import componentDefaultConfig from './config'

interface Props {
  config?: any
}

interface State {}

class Text extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    const { dataStatic } = this.props.config
    const { data } = dataStatic

    return (
      <div>
        { data.map((item:any, i:any) => (
          <span key={item.text}> <img src={require('@/assets/images/avatar.png')}></img> { item.text } </span>
        ))}
      </div>
    )

  }
}

export { Text }
export default Text