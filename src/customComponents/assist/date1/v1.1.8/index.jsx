import React, { Component } from 'react';
import ComponentDefaultConfig from './config'



class ShowDate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      finalDate: '',
      curTime: new Date().toLocaleTimeString()
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
    const timeString = date.toLocaleTimeString('chinese',{ hour12: false })
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
    const componentConfig = this.props.componentConfig || ComponentDefaultConfig
    const { config } = componentConfig
    // const { data } = componentConfig.staticData
    // const timeStamp = data[0].date

    const targetStyle = this.getTargetStyle(config)

    //配置主题色
    const componentThemeConfig = this.props.themeConfig
    const replaceThemeColor = (arr, colorIndex = 0) => {
      arr.forEach((item) => {
        let index = colorIndex || 0
        let { name, value, options, flag, type, key } = item
        if (item.hasOwnProperty('value')) {
          // 对 系列一栏 做特殊处理
          if (flag === 'specialItem') {
            try {
              index = key ? parseInt(key) - 1 : 0
            } catch (e) {
              index = 0
            }
          }
          if (Array.isArray(value)) {
            replaceThemeColor(value, index)
          } else {
            if (type === 'color') {
              switch (name) {
                case 'pureColors':
                  item.value = componentThemeConfig.pureColors[index % 7]
                  break;
                case 'themeGradientColorStart':
                  item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 0).color
                  break;
                case 'themeGradientColorEnd':
                  item.value = componentThemeConfig.gradientColors[index % 7].find(item => item.offset === 100).color
                  break;
                case 'themeTextColor':
                  item.value = componentThemeConfig.textColor
                  break;
                case 'themeAssistColor':
                  item.value = componentThemeConfig.assistColor
                  break;
                case 'themeGridColor':
                  item.value = componentThemeConfig.gridColor
                  break;
                default:
                  break;
              }
            }
          }
        } else if (Array.isArray(options) && options.length) {
          replaceThemeColor(options, index)
        }
      })
    }
    if (componentThemeConfig) {
      const configOfTheme = JSON.parse(JSON.stringify(config))
      replaceThemeColor(configOfTheme)
      this.props.onThemeChange({
        id: componentConfig.id,
        name: componentConfig.name,
        moduleName: componentConfig.moduleName,
        moduleVersion: componentConfig.moduleVersion,
        config: configOfTheme
      })
    }


    return <div style={{
      ...targetStyle,
      width: '100%',
      height: '100%',
      display:"flex",
      flexDirection:"column",
      justifyContent:"top"===targetStyle.textVertical?"flex-start":"vertical"===targetStyle.textVertical?"center":"flex-end",
      alignItems:"left"===targetStyle.textAlign?"flex-start":"center"===targetStyle.textAlign?"center":"right"===targetStyle.textAlign?"flex-end":"flex-start",
      fontWeight:targetStyle.bold ? "bold" : "normal",
      fontStyle:targetStyle.italic?"italic":"normal",
      letterSpacing:targetStyle.letterSpacing+"px",
      lineHeight:targetStyle.lineHeight+'px',
      textShadow:targetStyle.show ? `${targetStyle.shadow.vShadow}px ${targetStyle.shadow.hShadow}px ${targetStyle.shadow.blur}px ${targetStyle.shadow.color}` : '0 0 black',
      color: componentThemeConfig ? componentThemeConfig.textColor:  targetStyle.themeTextColor
    }}>
      <div style={{display:"flex",alignItems:"center",position:"relative",padding:"5px 0"}}>
        <span style={{ marginRight: targetStyle.spacing+'px' }}>{this.state.curTime}</span>
        <span>{this.state.finalDate}</span>
      </div>
    </div>
  }
}

export {
  ComponentDefaultConfig,
}

export default ShowDate
