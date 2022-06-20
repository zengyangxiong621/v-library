import React, { Component, CSSProperties } from 'react';
import componentDefaultConfig from './config'


export default class ShowDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalDate: '',
      curTime: ''
    }
  }
  dayReflect = {
    0: '日',
    1: '一',
    2: '二',
    3: '三',
    4: '四',
    5: '五',
    6: '六'
  }
  componentDidMount() {
    this.setState({
      finalDate: this.formatterDate()
    })
    this.timeTimer = setInterval(() => this.setState({
      curTime: this.refreshCurtime()
    }), 1000)
    this.dateTimer = setInterval(() => this.setState({
      finalDate: this.formatterDate()
    }), 3600 * 12 * 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timeTimer)
    clearInterval(this.dateTimer)
  }
  // 格式化日期
  formatterDate = () => {
    let date = new Date()
    const dateString = date.toLocaleDateString()
      .split('/').map(item => item.length < 2 ? item.padStart(2, '0') : item)
    const finalDate = dateString.join('.')
    const finalDay = date.getDay()
    return `${finalDate} 星期${this.dayReflect[finalDay]}`
  }
  // 刷新时间
  refreshCurtime = () => {
    let date = new Date()
    const timeString = date.toLocaleTimeString()
    return timeString
  }
  // 获取样式
  getTargetStyle(Arr) {
    // if (!imgUrl) {
    //   const img = require('../../assets' + imgUrl.replace('../../assets', ''))
    //   originStyle.backgroundImage = `url(${img})`
    // }
    const targetStyle = {};
    Arr.forEach(({ name, value }) => {
      if (Array.isArray(value)) {
        value.forEach(({ name, value }) => {
          targetStyle[name] = value
        })
      } else {
        targetStyle[name] = value
      }
    });
    return targetStyle;
  }
  render() {
    const componentConfig = this.props.componentConfig || componentDefaultConfig
    const { config } = componentConfig
    // const { data } = componentConfig.staticData
    // const timeStamp = data[0].date

    const targetStyle = this.getTargetStyle(config)


    return <div style={{
      width: '100%',
      height: '100%',
      ...targetStyle,
    }}>
      <span style={{ marginRight: '20px' }}>{this.state.finalDate}</span>
      <span>{this.state.curTime}</span>
    </div>
  }
}
