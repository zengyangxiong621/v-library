import React, { Component, CSSProperties } from "react";
import componentDefaultConfig from "./config";

interface Props {
  componentConfig?: any
}

interface State {}

class Text extends Component<Props, State> {
  constructor(Props: any) {
    super(Props);
  }
  render () {
    // const { dataStatic } = this.props.config
    // const { data } = dataStatic

    const componentConfig = this.props.componentConfig || componentDefaultConfig;
    const {config, staticData} = componentConfig;
  
    const style: CSSProperties = config.filter((item: any) => item.name !== "dimension").reduce((pre: any, cur: any) => {
      if(Array.isArray(cur.value)) {
        const obj = cur.value.reduce((p: any, c: any) => {
          p[c.name] = c.value;
          return p;
        }, {});
        pre = {
          ...pre,
          ...obj,
        };
      } else {
        pre[cur.name] = cur.value;
      }
      return pre;
    }, {});

    return (
      <div style={ style } className="text">
        { staticData.data.map((item:any, i:any) => (
          // <span key={item.text}> <img src={require('@/assets/images/avatar.png')}></img> { item.text } </span>
          <span key={item.text}> { item.text } </span>
        ))}
      </div>
    );

  }
}

export { Text };
export default Text;