import React, { Component } from 'react';

interface Props {
  config?: any
}

interface State {}

class DashboardManage extends Component<Props, State> {
  constructor(Props: any) {
    super(Props)
    console.log(Props, 'manage------------')
  }
  render () {
    return (
      <div>
        0000000000000
      </div>
    )

  }
}

export default DashboardManage