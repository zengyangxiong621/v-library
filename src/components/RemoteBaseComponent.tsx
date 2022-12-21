import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { connect } from "dva";
import { http } from "@/services/request";
import { Spin } from "antd";

const RemoteBaseComponent = (props: any) => {
  const { componentConfig, bar } = props;
  const componentData = bar.componentData;
  const { moduleType, moduleName, moduleVersion } = componentConfig;
  const isExit = typeof moduleType === "undefined";

  const [Comp, setComponent] = useState<React.FC | null>(null);
  const [loading, setLoading] = useState(false);

  const importComponent = useCallback(() => {
    return axios
      .get(
        `${
          (window as any).CONFIG.COMP_URL
        }/${moduleType}/${moduleName}/${moduleVersion}/${moduleName}.js`
      )
      .then((res) => res.data);
  }, [moduleType, moduleName, moduleVersion]);

  const getComponentData = async (component) => {
    try {
      const data = await http({
        url: "/visual/module/getData",
        method: "post",
        body: {
          moduleId: component.id,
          dataType: component.dataType,
          callBackParamValues: bar.callbackArgs,
        },
      });
      if (data) {
        componentData[component.id] = component.dataType !== "static" ? data : data.data;
      } else {
        throw new Error("请求不到数据");
      }
    } catch (err) {
      componentData[component.id] = null;
    }
    return componentData[component.id];
  };

  const loadComp = useCallback(async () => {
    try {
      window.eval(`${await importComponent()}`);
      const { default: component } = (window as any).VComponents;
      await getComponentData(componentConfig);
      setComponent(() => component);
    } catch (e) {
      console.log("3333333333333333333333", e);
      setComponent(() => <></>);
    }

    // setLoading(false);
  }, [importComponent, setComponent]);

  useEffect(() => {
    if (!isExit) {
      loadComp();
    }
  }, [loadComp]);

  if (loading) {
    return (
      <Spin
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
    );
  }

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
