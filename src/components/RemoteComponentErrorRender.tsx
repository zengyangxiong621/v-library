import { Component } from 'react';

interface Props {
  errorComponent?: any
}

interface State {}

class RemoteComponentErrorRender extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
  }
  render () {
    const { errorComponent } = this.props
    return (
      <div style={{fontSize: '24px'}}>
       组件【{ errorComponent }】渲染错误！
      </div>
    )
  }
}

export default RemoteComponentErrorRender