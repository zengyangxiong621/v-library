import { Component } from "react";

interface Props {
  errorComponent?: any
}

class RemoteComponentErrorRender extends Component<Props> {
  constructor(Props: any) {
    super(Props);
  }
  render() {
    const { errorComponent } = this.props;
    return (
      <div style={{ fontSize: "24px" }}>
        组件【{errorComponent}】渲染错误！
      </div>
    );
  }
}

export default RemoteComponentErrorRender;