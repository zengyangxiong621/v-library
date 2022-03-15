import React, { Component } from 'react';

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
          <span key={item.text}> { item.text } </span>
        ))}
      </div>
    )

  }
}

export { Text }
export default Text