import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { connect } from 'dva';
import { connect } from '../utils/connect';
import { Select, Input } from 'antd';
import { Text } from '../components/charts/custom/text/index'; // TODO: @可用设置

interface Props {
  dispatch?: any,
  dashboard?: any
}

interface State {
  text?: string
}

const mapStateToProps = (state: any) => {
  return state
}

// @connect(mapStateToProps)
class Dashboard extends Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      text: '新数据来源：对接代码编辑器或者SQL编辑器'
    }
  }                                        

  handleChange = (value: any) => {
    console.log(`selected ${value}`);
  }

  textChange = (event: any) => {
    const value = event.target.value
    this.setState({
      text: value
    })

    const { dispatch } = this.props
    dispatch({
      type: 'dashboard/change',
      payload: {
        data: [{
          text: value
        }]
      }
    })

  }

  render() {
    const { Option } = Select;
    const { dashboard } = this.props;
    const { componentConfig } = dashboard;
    const { dataStatic } = componentConfig;
    const { fields } = dataStatic;

    return (
      <div className="">
        <Text config={componentConfig} />
        { fields.map((item: any, i: any) => (
          <div key={item.label}>
            <span>{item.label}</span>
            <Select defaultValue={item.value} style={{ width: 120 }} onChange={this.handleChange}>
              <Option value="content">content</Option>
              <Option value="icon">icon</Option>
            </Select>
            <b> { item.desc } </b>
          </div>
        ))}
        <Input value={this.state.text} onChange={this.textChange}></Input>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Dashboard); 