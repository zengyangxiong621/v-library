import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "dva";

const RemoteBaseComponent = (props: any) => {
  const { componentConfig } = props;
  const { moduleType, moduleName, moduleVersion } = componentConfig;
  const isExit = typeof moduleType === "undefined";

  const [Comp, setComponent] = useState<React.FC | null>(null);

  const importComponent = useCallback(() => {
    return axios
      .get(
        `${
          (window as any).CONFIG.COMP_URL
        }/${moduleType}/${moduleName}/${moduleVersion}/${moduleName}.js`
      )
      .then((res) => res.data);
  }, [moduleType, moduleName, moduleVersion]);

  const loadComp = useCallback(async () => {
    window.eval(`${await importComponent()}`);
    const { default: component } = (window as any).VComponents;
    setComponent(() => component);
  }, [importComponent, setComponent]);

  useEffect(() => {
    if (!isExit) {
      loadComp();
    }
  }, [loadComp]);

  if (Comp) {
    return <Comp {...props} />;
  }

  return null;
};

// class写法
// interface Props {
//   componentConfig?: any
// }

// interface State {
//   component?: any
// }

// class RemoteBaseComponent extends React.Component<Props, State> {
//   constructor(props: any) {
//     super(props);
//     this.state = {
//       component: null,
//     };
//   }

//   importComponent(): any {
//     return axios.get(`${(window as any).CONFIG.COMP_URL}/${this.props.componentConfig.moduleType}/${this.props.componentConfig.moduleName}/${this.props.componentConfig.moduleVersion}/${this.props.componentConfig.moduleName}.js`).then(res => res.data);
//   }

//   async componentDidMount() {
//     window.eval(`${await this.importComponent()}`);
//     const { default: component } = (window as any).VComponents;

//     this.setState({
//       component: component
//     });
//   }

//   render() {
//     const C = this.state.component;

//     return C
//       ? <C {...this.props} />
//       : null;
//   }
// }

export default connect(({ bar }: any) => ({ bar }))(RemoteBaseComponent);
